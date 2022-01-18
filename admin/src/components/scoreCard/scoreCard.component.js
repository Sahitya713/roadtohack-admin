import React from "react";
import "./scoreCard.styles.css";

const ScoreCard = ({ group, score, rank }) => {
  return (
    <div className="scorecard-container">
      <span className="ranking">{rank}</span>

      <div className="scorecard-overlay">
        <img src={group.image} alt="suppImage" className="scorecard-img" />
        <span className="scorecard-name">{group.name}</span>
        <span className="scorecard-score">{score}</span>
      </div>
    </div>
  );
};

export default ScoreCard;
