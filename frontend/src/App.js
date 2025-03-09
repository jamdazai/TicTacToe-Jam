// Tic Tac Toe v.2.0.0
// Author: Jam Furaque

import React, { useState, useEffect } from "react";
import { startGame, resetGame } from "./api";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";
import TurnIndicator from "./components/TurnIndicator";
import "./styles/app.css";
import "./styles/board.css";
import "./styles/modeSelection.css";
import "./styles/loading.css";
import "./styles/Scoreboard.css";
import "./styles/winner.css";
import "./styles/exit.css";
import "./styles/playerSetup.css";
import "./styles/symbolSelection.css";
import "./styles/turnIndicator.css";
import "./styles/gameContainer.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [gamePhase, setGamePhase] = useState("modeSelection");
  const [gameMode, setGameMode] = useState(null);
  const [board, setBoard] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const [playerOneSymbol, setPlayerOneSymbol] = useState(null);
  const [playerTwoSymbol, setPlayerTwoSymbol] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("X");


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleSelectGameMode = (mode) => {                              // AFTER LOADING SCREEN,
    setGameMode(mode);                                                  // PLAYERS WILL GO DIRECTLY IN SLECTING GAME MODE 
    setGamePhase("playerSetup");
  };

  const handlePlayerSetup = () => {                                     // WE WOULD ALSO WANT TO ASK FOR PLAYERS NAME OFC.
    if (!playerOneName || !playerTwoName) {
      alert("Both players must enter names!");
      return;
    }
    setGamePhase("symbolSelection"); 
  };

  const handleSymbolSelection = (symbol) => {                           // AND THEN, LET THE CHOOSE THEIR SYMBOLS
    setPlayerOneSymbol(symbol);                                         // THIS IS DEMOCRACY HAHAHAHA
    setPlayerTwoSymbol(symbol === "X" ? "O" : "X");
    setGamePhase("game");
  };

  const handleStartGame = async () => {                                 // START THE GAME HERE
    setScores({ X: 0, O: 0 });
    setWinner(null);
    const response = await startGame(gameMode);
    setBoard(response.data.board);
    setGameOver(false);
  };

  const handleNextRound = async () => {
    if (winner) return;
    const response = await resetGame();
    setBoard(response.data.board);
    setGameOver(false);
    document.querySelectorAll(".cell").forEach((cell) => cell.classList.remove("winning-cell"));
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]], 
      [[0, 2], [1, 1], [2, 0]]
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a[0]][a[1]] && 
          board[a[0]][a[1]] === board[b[0]][b[1]] && 
          board[a[0]][a[1]] === board[c[0]][c[1]]) {
        return board[a[0]][a[1]]; 
      }
    }

    if (board.flat().every(cell => cell !== "")) {
      return "TIE";
    }

    return null;
  };

  
  
  const handleClick = (row, col) => {
    if (board[row][col] !== "" || gameOver || winner) return;
    const newBoard = board.map((rowArr, i) =>
      rowArr.map((cell, j) => (i === row && j === col ? currentPlayer : cell))
    );
    setBoard(newBoard);
  
    const result = checkWinner(newBoard);
    if (result === "TIE") {
      setTimeout(() => {
        alert("The game is tied! Restarting...");
        handleNextRound();
      }, 1000);
      return;
    }
  
    if (result) {
      setScores(prevScores => ({
        ...prevScores,
        [result]: prevScores[result] + 1,
      }));
      setGameOver(true);
      return;
    }
    setCurrentPlayer(prev => (prev === "X" ? "O" : "X"));
  };
  
  useEffect(() => {
    if (scores.X >= Math.ceil(gameMode / 2)) {
      setWinner(playerOneSymbol === "X" ? playerOneName : playerTwoName);
    }
    if (scores.O >= Math.ceil(gameMode / 2)) {
      setWinner(playerOneSymbol === "O" ? playerOneName : playerTwoName);
    }
  }, [scores, gameMode, playerOneName, playerOneSymbol, playerTwoName]);

  if (loading) {
    return (
      <div className="loading-screen">
        <h1>Welcome to TicTacToe 2.0</h1>
        <h2>by: Jam Furaque</h2>
      </div>
    );
  }

  if (gamePhase === "modeSelection") {
    return (
      <div className="mode-selection-screen">
        <h1>Select Game Mode</h1>
        <button onClick={() => handleSelectGameMode(3)}>Best of 3</button>
        <button onClick={() => handleSelectGameMode(5)}>Best of 5</button>
      </div>
    );
  }

  if (gamePhase === "playerSetup") {
    return (
      <div className="player-setup-screen">
        <h1>Enter Player Names</h1>
        <div className="player-name-form">
          <div className="player-input">
            <label htmlFor="playerOne">Player 1 Name:</label>
            <input id="playerOne" type="text" placeholder="First Name" value={playerOneName} onChange={(e) => setPlayerOneName(e.target.value)} />
          </div>

          <div className="player-input">
            <label htmlFor="playerTwo">Player 2 Name:</label>
            <input id="playerTwo" type="text" placeholder="First Name" value={playerTwoName} onChange={(e) => setPlayerTwoName(e.target.value)} />
          </div>
        </div>

        <button className="start-game-btn" onClick={handlePlayerSetup}>Next</button>
      </div>
    );
  }

  if (gamePhase === "symbolSelection") {
    return (
      <div className="symbol-selection-screen">
        <h1>{playerOneName}, choose your symbol:</h1>
        <div className="symbol-selection-buttons">
          <button onClick={() => handleSymbolSelection("X")}>Play as X</button>
          <button onClick={() => handleSymbolSelection("O")}>Play as O</button>
        </div>
      </div>
    );
  }

  if (gamePhase === "exit") {
    return (
      <div className="exit-screen">
        <h1>Thank you for playing Tic Tac Toe 2.0!</h1>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="score-section">
        <Scoreboard 
          scores={scores} 
          playerOneName={playerOneName} 
          playerOneSymbol={playerOneSymbol} 
          playerTwoName={playerTwoName} 
          playerTwoSymbol={playerTwoSymbol} 
        />
      </div>

      <div className="board-section">
        {winner ? (
          <div className="winner-screen">
            <h2 className="winner-message">🏆 {winner} wins the series! 🏆</h2>
            <button className="rematch-btn" onClick={() => setGamePhase("modeSelection")}>Rematch</button>
            <button className="exit-btn" onClick={() => setGamePhase("exit")}>Exit</button>
          </div>
        ) : (
          <Board 
            board={board} 
            setBoard={setBoard} 
            setScores={setScores} 
            gameOver={gameOver} 
            setGameOver={setGameOver}  
            handleClick={handleClick} 
            handleNextRound={handleNextRound} 
            handleStartGame={handleStartGame} 
          />
        )}
      </div>
  
      <div className="turn-section">
        <div className="turn-indicator-container">
          <TurnIndicator 
            currentPlayer={currentPlayer}
            playerOneName={playerOneName}
            playerOneSymbol={playerOneSymbol}
            playerTwoName={playerTwoName}
            playerTwoSymbol={playerTwoSymbol}
          />
        </div>
</div>
    </div>
  );
};

export default App;
