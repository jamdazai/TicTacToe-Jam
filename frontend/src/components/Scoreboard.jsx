// Tic Tac Toe v.2.0.0
// Author: Jam Furaque

import React from "react";
import "../styles/Scoreboard.css"; 

const Scoreboard = ({ scores, playerOneName, playerOneSymbol, playerTwoName, playerTwoSymbol }) => {
  const renderScoreBars = (count) => {
    return "| ".repeat(count).trim();
  };

  return (
    <div className="scoreboard">
      <h2>Scores</h2>
      <div className="player-score">
        <span>{playerOneName} ({playerOneSymbol}):</span>
        <div className="score-bars">{renderScoreBars(scores[playerOneSymbol])}</div>
      </div>
      <div className="player-score">
        <span>{playerTwoName} ({playerTwoSymbol}):</span>
        <div className="score-bars">{renderScoreBars(scores[playerTwoSymbol])}</div>
      </div>
    </div>
  );
};

export default Scoreboard;
