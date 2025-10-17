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
  const scorePercent = typeof location.state?.score === 'number' ? location.state.score : 0;
  const rawScore = typeof location.state?.rawScore === 'number' ? location.state.rawScore : 0;
  const result = getResultLevel(rawScore);

  return (
    <div className="page">
      <section className={`hero hero--result ${result.id}`}>
        <div className="hero__inner">
          <div className="result-gem">
            {result.gemSvg && result.gemSvg.trim().length > 0 ? (
              <div
                className="gem-svg"
                role="img"
                aria-label={`${result.title} level`}
                dangerouslySetInnerHTML={{ __html: result.gemSvg }}
              />
            ) : (
              <img src={result.gemImage} alt={`${result.title} level`} />
            )}
          </div>

          <div className="result-content">
            <div className="score-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              <p className="result-intro">Your score:</p>
              <p className="result-intro">{scorePercent}%</p>
            </div>
            <h1 className="result-title">{result.title}</h1>
          </div>

          <div className="result-bottom-container">
            <div className="result-section">
              <div className="line"></div>
              <p className="result-subtitle">{result.subtitle}</p>
              <p className="result-text">{result.content}</p>
              <a
                className="cta-button result-cta"
                href="https://bangid.com/start-for-free/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {result.buttonText}
              </a>
            </div>
            <div className="result-logo">
              <a 
                href="https://bangid.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <img src="/assets/bang-lm.svg" alt="Bang Logo" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
