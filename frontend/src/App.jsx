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
  const [loadingText, setLoadingText] = useState("Analyzing...");
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

    const loadingMessages = [
      "Reading your resume...",
      "Matching skills with the job...",
      "Generating roast...",
      "Building feedback cards...",
    ];

    let messageIndex = 0;
    setLoadingText(loadingMessages[0]);

    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[messageIndex]);
    }, 1500);

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
      console.error("Upload error:", err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          err.message ||
          "Something went wrong."
      );
    } finally {
      clearInterval(interval);
      setLoading(false);
      setLoadingText("Analyzing...");
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

  const toList = (text) =>
    text
      .split("\n")
      .map((item) => item.replace(/^-/, "").trim())
      .filter(Boolean);

  const resumeScoreText = getSection("Resume Score") || "0";
  const jobMatchScoreText = getSection("Job Match Score") || "0";
  const matchSummary = getSection("Match Summary") || "";
  const matchedSkills = getSection("Matched Skills") || "";
  const missingSkills = getSection("Missing Skills") || "";
  const roast = getSection("Roast") || "";
  const keyImprovements = getSection("Key Improvements") || "";
  const weakAreas = getSection("Weak Areas") || "";
  const strengths = getSection("Top Strengths") || "";

  const resumeScore = Math.min(
    Math.max(parseInt(resumeScoreText, 10) || 0, 0),
    100
  );

  const parsedJobScore = parseInt(jobMatchScoreText, 10);
  const jobMatchScore = isNaN(parsedJobScore)
    ? 0
    : Math.min(Math.max(parsedJobScore, 0), 100);

  const hasJobScore = !isNaN(parsedJobScore);

  const copyResults = async () => {
    try {
      await navigator.clipboard.writeText(analysis);
      alert("Analysis copied to clipboard");
    } catch {
      alert("Could not copy analysis");
    }
  };

  const clearAll = () => {
    setFile(null);
    setJobDescription("");
    setAnalysis("");
    setError("");
    const fileInput = document.getElementById("resume-upload");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>🔥 AI Resume Roaster</h1>
          <p className="subtitle">
            Actionable insights. Smart feedback. Real career impact.
          </p>
        </div>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />

        <textarea
          placeholder="Paste the job description here for match analysis..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={8}
        />

        <div className="action-row">
          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>

          {analysis && (
            <>
              <button className="secondary-btn" onClick={copyResults}>
                Copy Results
              </button>
              <button className="secondary-btn" onClick={clearAll}>
                Clear
              </button>
            </>
          )}
        </div>

        {loading && (
          <div className="loading-box">
            <div className="spinner"></div>
            <p className="loading-text">{loadingText}</p>
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
                  <span>{hasJobScore ? jobMatchScore : "N/A"}</span>
                </div>
                <div className="score-bar">
                  <div
                    className="score-fill"
                    style={{ width: `${hasJobScore ? jobMatchScore : 0}%` }}
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

            <div className="skill-grid">
              {matchedSkills && (
                <div className="card skills-card matched-card">
                  <h2>✅ Matched Skills</h2>
                  <div className="tag-wrap">
                    {toList(matchedSkills).map((item, index) => (
                      <span className="tag matched-tag" key={index}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {missingSkills && (
                <div className="card skills-card missing-card">
                  <h2>❌ Missing Skills</h2>
                  <div className="tag-wrap">
                    {toList(missingSkills).map((item, index) => (
                      <span className="tag missing-tag" key={index}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {roast && (
              <div className="card roast">
                <h2>🔥 Roast</h2>
                <p>{roast}</p>
              </div>
            )}

            <div className="insight-grid">
              {keyImprovements && (
                <div className="card feedback">
                  <h2>📌 Key Improvements</h2>
                  <ul>
                    {toList(keyImprovements).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {weakAreas && (
                <div className="card weak-card">
                  <h2>⚠️ Weak Areas</h2>
                  <ul>
                    {toList(weakAreas).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

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
          </div>
        )}
      </div>
    </div>
  );
}

export default App;