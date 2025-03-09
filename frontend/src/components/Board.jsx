// Tic Tac Toe v.2.0.0
// Author: Jam Furaque

const Board = ({ board, setBoard, setCurrentPlayer, setScores, gameOver, setGameOver, handleClick, handleNextRound }) => {
  return (
    <div className="board-container">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <button key={colIndex} className="cell" onClick={() => handleClick(rowIndex, colIndex)}>
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
      
      {gameOver && (
        <button className="next-round-btn" onClick={handleNextRound}>Next Round</button>
      )}
    </div>
  );
};

export default Board;
