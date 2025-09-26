import React, { useState } from "react";
import { RESULT_LEVELS } from "../config/resultsConfig";

// Helper functions to extract gradient colors
function getGradientColor1(levelId) {
  const colors = {
    starter: "#845E18",
    explorer: "#4169E1", 
    strategist: "#32CD32",
    innovator: "#FF6347",
    visionary: "#9932CC"
  };
  return colors[levelId] || "#845E18";
}

function getGradientColor2(levelId) {
  const colors = {
    starter: "#845E18",
    explorer: "#1B2951",
    strategist: "#1B4D1B", 
    innovator: "#4D1F1A",
    visionary: "#2D1B4D"
  };
  return colors[levelId] || "#845E18";
}

export default function DMIResultPreview() {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const result = RESULT_LEVELS[selectedLevel];

  return (
    <div className="page">
      {/* Level selector for preview */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        zIndex: 1000,
        background: 'rgba(0,0,0,0.8)',
        padding: '10px',
        borderRadius: '8px'
      }}>
        <label style={{ color: 'white', marginRight: '10px' }}>Preview Level:</label>
        <select 
          value={selectedLevel} 
          onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
          style={{ padding: '5px' }}
        >
          {RESULT_LEVELS.map((level, index) => (
            <option key={level.id} value={index}>
              {level.title} ({level.scoreRange[0]}-{level.scoreRange[1]})
            </option>
          ))}
        </select>
      </div>

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
            <h2 className="result-description">{result.description}</h2>
            <p className="result-text">{result.content}</p>
          </div>

          <button className="cta-button result-cta">
            {result.buttonText}
          </button>
        </div>
      </section>
    </div>
  );
}
