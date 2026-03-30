# 🔥 AI Resume Roaster

An AI-powered web application that analyzes resumes, gives a humorous roast, provides professional feedback, and matches resumes against job descriptions.

---

## 🚀 Features

* 📄 Upload PDF resume
* 🔥 Funny but intelligent AI roast
* 📈 Professional feedback for improvement
* 📊 Resume score (0–100)
* 🎯 Job match score based on job description
* 🧩 Missing skills detection
* 🧠 Match summary explanation

---

## 🧠 How It Works

1. User uploads a resume (PDF)
2. (Optional) Adds a job description
3. Backend extracts resume text
4. AI analyzes:

   * Resume quality
   * Job fit
   * Missing skills
5. Frontend displays structured results

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Axios
* CSS

### Backend

* FastAPI
* Python
* PyMuPDF (PDF parsing)

### AI

* Groq API (LLaMA 3)

---

## 📂 Project Structure

```
ai-resume-roaster/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Run Locally

### 1️⃣ Clone the repository

```
git clone https://github.com/Vilas2809/ai-resume-roaster.git
cd ai-resume-roaster
```

---

### 2️⃣ Backend setup

```
cd backend
python3 -m pip install -r requirements.txt
```

Create `.env` file:

```
GROQ_API_KEY=your_api_key_here
```

Run backend:

```
python3 -m uvicorn main:app --reload
```

---

### 3️⃣ Frontend setup

```
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoint

```
POST /analyze
```

Form data:

* `file`: PDF resume
* `job_description`: (optional)

---

## 💡 Example Output

* Resume Score: 78
* Job Match Score: 65
* Roast: “Your resume says ‘hardworking’ so often it’s basically your job title.”
* Feedback: actionable bullet points
* Missing Skills: list
* Match Summary: explanation

---

## 📸 Future Improvements

* 🎤 Voice-based roast (text-to-speech)
* 😂 Meme generator
* 📊 Advanced analytics dashboard
* 🔍 ATS-style keyword matching
* 🌍 Live deployment

---

## 👨‍💻 Author

**Vilas Reddy**

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub!
