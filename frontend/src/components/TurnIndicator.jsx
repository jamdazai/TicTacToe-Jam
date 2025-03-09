// Tic Tac Toe v.2.0.0
// Author: Jam Furaque

import React from "react";
import "../styles/turnIndicator.css";

const TurnIndicator = ({ 
  currentPlayer, 
  playerOneName, 
  playerOneSymbol, 
  playerTwoName, 
  playerTwoSymbol }) => {
    return (
      <div className="turn-indicator">
        <h2>Current Turn:</h2>
        <p>{currentPlayer === playerOneSymbol ? `${playerOneName} (${playerOneSymbol})` : `${playerTwoName} (${playerTwoSymbol})`}</p>
      </div>
    );
  };
  
  export default TurnIndicator;
  