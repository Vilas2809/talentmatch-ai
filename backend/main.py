import os
import fitz
from dotenv import load_dotenv
from groq import Groq
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(title="AI Resume Roaster")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY is missing in your .env file")

client = Groq(api_key=api_key)

MAX_FILE_SIZE = 5 * 1024 * 1024
MAX_TEXT_LENGTH = 12000


def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        pdf = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        for page in pdf:
            text += page.get_text()
        pdf.close()
        return text.strip()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not read PDF: {str(e)}")


@app.get("/")
def home():
    return {"message": "Groq Resume Roaster backend is running"}


@app.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form("")
):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Please upload a valid PDF resume")

    file_bytes = await file.read()

    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File is too large. Max size is 5 MB.")

    resume_text = extract_text_from_pdf(file_bytes)

    if not resume_text:
        raise HTTPException(status_code=400, detail="No text found in the uploaded PDF")

    resume_text = resume_text[:MAX_TEXT_LENGTH]
    job_description = (job_description or "").strip()[:MAX_TEXT_LENGTH]

    if job_description:
        prompt = f"""
You are an AI resume reviewer and job match analyzer.

Analyze the resume against the job description and respond in exactly this format:

Resume Score:
<number out of 100>

Job Match Score:
<number out of 100>

Roast:
<funny but light roast>

Professional Feedback:
- <point 1>
- <point 2>
- <point 3>

Top Strengths:
- <strength 1>
- <strength 2>

Missing Skills:
- <missing skill 1>
- <missing skill 2>
- <missing skill 3>

Match Summary:
<2-3 sentence realistic summary of how well the resume fits the job>

Rules:
- Keep the roast playful, clever, and non-offensive.
- Do not insult the person personally.
- Focus only on the resume content and job fit.
- Feedback must be practical and specific.
- Scores must be realistic.
- Do not add any extra headings.
- Do not add introductory or closing text.

Resume:
{resume_text}

Job Description:
{job_description}
"""
    else:
        prompt = f"""
You are an AI resume reviewer.

Analyze the following resume and respond in exactly this format:

Resume Score:
<number out of 100>

Roast:
<funny but light roast>

Professional Feedback:
- <point 1>
- <point 2>
- <point 3>

Top Strengths:
- <strength 1>
- <strength 2>

Rules:
- Keep the roast playful, clever, and non-offensive.
- Do not insult the person personally.
- Focus only on the resume content.
- Feedback must be practical and specific.
- Score must be realistic and based on clarity, impact, structure, and relevance.
- Do not add any extra headings.
- Do not add introductory or closing text.

Resume:
{resume_text}
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are witty, professional, and helpful."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
        )

        result = response.choices[0].message.content

        return {
            "filename": file.filename,
            "analysis": result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")