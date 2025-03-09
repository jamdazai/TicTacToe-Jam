// Tic Tac Toe v.2.0.0
// Author: Jam Furaque

import React from "react";

const ModeSelection = ({ startGame }) => {
  return (
    <div className="mode-selection">
      <h2>Select Game Mode</h2>
      <button onClick={() => startGame(3)}>Best of 3</button>
      <button onClick={() => startGame(5)}>Best of 5</button>
    </div>
  );
};

export default ModeSelection;
