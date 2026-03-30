import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnalysis("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
      setError("");
      setAnalysis("");

      const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAnalysis(response.data.analysis);
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getSection = (title) => {
    if (!analysis) return "";
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(
      `${escapedTitle}:([\\s\\S]*?)(?=\\n[A-Za-z ]+:|$)`,
      "i"
    );
    const match = analysis.match(regex);
    return match ? match[1].trim() : "";
  };

  const resumeScoreText = getSection("Resume Score") || "0";
  const jobMatchScoreText = getSection("Job Match Score") || "0";
  const roast = getSection("Roast") || "";
  const feedback = getSection("Professional Feedback") || "";
  const strengths = getSection("Top Strengths") || "";
  const missingSkills = getSection("Missing Skills") || "";
  const matchSummary = getSection("Match Summary") || "";

  const resumeScore = Math.min(
    Math.max(parseInt(resumeScoreText, 10) || 0, 0),
    100
  );
  const jobMatchScore = Math.min(
    Math.max(parseInt(jobMatchScoreText, 10) || 0, 0),
    100
  );

  const toList = (text) =>
    text
      .split("\n")
      .map((item) => item.replace(/^-/, "").trim())
      .filter(Boolean);

  return (
    <div className="app">
      <div className="container">
        <h1>🔥 AI Resume Roaster</h1>
        <p className="subtitle">
          Brutally honest. Slightly funny. Actually helpful.
        </p>

        <input type="file" accept=".pdf" onChange={handleFileChange} />

        <textarea
          placeholder="Paste the job description here for match analysis..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={8}
        />

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>

        {loading && (
          <div className="loading-box">
            <div className="spinner"></div>
            <p className="loading-text">Comparing your resume to the job...</p>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        {analysis && !loading && (
          <div className="result">
            <div className="score-grid">
              <div className="card score-card">
                <h2>📊 Resume Score</h2>
                <div className="score-circle">
                  <span>{resumeScore}</span>
                </div>
                <div className="score-bar">
                  <div
                    className="score-fill"
                    style={{ width: `${resumeScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="card score-card">
                <h2>🎯 Job Match</h2>
                <div className="score-circle match-circle">
                  <span>{jobMatchScore}</span>
                </div>
                <div className="score-bar">
                  <div
                    className="score-fill"
                    style={{ width: `${jobMatchScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {matchSummary && (
              <div className="card summary-card">
                <h2>🧠 Match Summary</h2>
                <p>{matchSummary}</p>
              </div>
            )}

            {roast && (
              <div className="card roast">
                <h2>🔥 Roast</h2>
                <p>{roast}</p>
              </div>
            )}

            {feedback && (
              <div className="card feedback">
                <h2>📈 Professional Feedback</h2>
                <ul>
                  {toList(feedback).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {strengths && (
              <div className="card strengths">
                <h2>💪 Top Strengths</h2>
                <ul>
                  {toList(strengths).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {missingSkills && (
              <div className="card missing">
                <h2>🧩 Missing Skills</h2>
                <ul>
                  {toList(missingSkills).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;