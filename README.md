# 🔥 AI Resume Roaster

An AI-powered resume analysis platform that scores resumes, matches them against job descriptions, identifies strengths and gaps, and delivers actionable feedback with a touch of humor.

## 🌐 Live Demo

**Frontend:** http://talentmatchai-vilas2809s-projects.vercel.app

## ✨ Features

- Upload a resume in PDF format
- Paste a job description for role-specific analysis
- Get a **Resume Score**
- Get a **Job Match Score**
- View a concise **Match Summary**
- See **Matched Skills**
- See **Missing Skills**
- Get **Key Improvements**
- Identify **Weak Areas**
- Highlight **Top Strengths**
- Receive a light, non-offensive **AI Roast**
- Copy results instantly
- Clear and re-run analysis easily
- Fully deployed frontend and backend

## 🧠 Why This Project Stands Out

Most resume tools only provide generic suggestions. This project turns resume review into an interactive product experience by combining:

- AI-generated professional feedback
- job-description matching
- skills gap analysis
- production deployment
- clean, user-friendly UI

It demonstrates both **software engineering** and **product thinking**.

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Axios
- CSS

### Backend
- FastAPI
- Python
- PyMuPDF

### AI
- Groq API
- LLaMA 3.3 70B Versatile

### Deployment
- Vercel for frontend
- Render for backend

## 📂 Project Structure

```text
ai-resume-roaster/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── .env.local
│
├── .gitignore
└── README.md
```

## ⚙️ How It Works

1. User uploads a PDF resume
2. User optionally pastes a job description
3. Backend extracts resume text from the PDF
4. Groq analyzes the resume and job fit
5. Frontend displays:
   - Resume Score
   - Job Match Score
   - Match Summary
   - Matched Skills
   - Missing Skills
   - Roast
   - Key Improvements
   - Weak Areas
   - Top Strengths

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Vilas2809/ai-resume-roaster.git
cd ai-resume-roaster
```

### 2. Backend setup

```bash
cd backend
python3 -m pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Run the backend:

```bash
python3 -m uvicorn main:app --reload
```

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Create a `.env.local` file inside `frontend/`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## 🌍 Deployment

### Frontend
Deployed on Vercel:
- https://talentmatch.ai-iota.vercel.app

### Backend
Deployed on Render.

## 🔐 Environment Variables

### Backend
```env
GROQ_API_KEY=your_groq_api_key_here
```

### Frontend
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

For production, set:

```env
VITE_API_BASE_URL=https://your-render-backend-url.onrender.com
```

## 📸 Example Output

- **Resume Score:** 85
- **Job Match Score:** 70
- **Match Summary:** A concise explanation of overall fit
- **Matched Skills:** Java, SQL, Data Structures
- **Missing Skills:** Spring Boot, Angular, JDBC
- **Roast:** Funny but non-offensive feedback
- **Key Improvements:** Practical suggestions to improve the resume
- **Weak Areas:** Important gaps in the profile
- **Top Strengths:** Strongest areas of the candidate

## 🧪 Challenges Solved

- Handling PDF uploads in a web app
- Extracting readable text from resumes
- Managing frontend-backend communication
- Fixing production CORS issues between Vercel and Render
- Debugging environment variable issues in deployment
- Designing a clean UI for structured AI results

## 📈 Future Improvements

- Downloadable PDF report
- Authentication and user history
- Resume comparison dashboard
- ATS keyword scoring
- Tone selector for roast style
- More detailed analytics and charts

## 👨‍💻 Author

**Vilas Srirama Reddy**

GitHub: https://github.com/Vilas2809

## 💼 Resume-Ready Project Summary

Built and deployed a full-stack AI-powered resume analysis platform using React, FastAPI, and Groq API, featuring resume scoring, job-description matching, skill-gap detection, and actionable feedback in a production-ready web application.

## ⭐ Support

If you like this project, consider giving it a star on GitHub.
