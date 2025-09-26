import React from "react";
import { useLocation } from "react-router-dom";
import { getResultLevel } from "../config/resultsConfig";
import { useIframeHeight } from "../hooks/useIframeHeight.js";

// Helper functions to extract gradient colors
function getGradientColor1(levelId) {
  const colors = {
    starter: "rgba(132, 94, 24, 0.32)",
    explorer: "#4169E1", 
    strategist: "#32CD32",
    innovator: "#FF6347",
    visionary: "#9932CC"
  };
  return colors[levelId] || "#845E18";
}

function getGradientColor2(levelId) {
  const colors = {
    starter: "rgba(132, 94, 24, 0.00)",
    explorer: "#1B2951",
    strategist: "#1B4D1B", 
    innovator: "#4D1F1A",
    visionary: "#2D1B4D"
  };
  return colors[levelId] || "#845E18";
}

export default function DMIResult() {
  useIframeHeight();
  
  const location = useLocation();
  const score = location.state?.score || 0;
  const result = getResultLevel(score);

  return (
    <div className="page">
      <section className={`hero hero--result ${result.id}`}>
        <div className="hero__inner">
          <div className="result-gem">
            <img src={result.gemImage} alt={`${result.title} level`} />
          </div>

          <div className="result-content">
            <p className="result-intro">You're a</p>
            <h1 className="result-title">{result.title}</h1>
            <p className="result-subtitle">{result.subtitle}</p>
          </div>

          <div className="result-section">
            <div className="line"></div>
            <h2 className="result-description">{result.description}</h2>
            <p className="result-text">{result.content}</p>
            <button className="cta-button result-cta">
              {result.buttonText}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
