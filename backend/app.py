# TIC-TAC-TOE v.2.0.0 (WEB APP BASED)
# @author: Jam Furaque

from flask import Flask, jsonify, request
from flask_cors import CORS
from logic import TicTacToe

app = Flask(__name__)
CORS(app)

game = TicTacToe()                                                                          # Initializing the game.

@app.route("/start", methods=["POST"])                                                      # In this tic tac toe, there will be 2 modes: Best of 3 or Best of 5
def start_game():                                                                           # The default value for our mode will be 3.
    data = request.json
    mode = data.get("mode", 3) 
    game.new_game(mode)
    return jsonify({"message": "Game started", "mode": mode, "board": game.board})

@app.route("/move", methods=["POST"])
def make_move():
    data = request.json
    row, col = data["row"], data["col"]
    result = game.make_move(row, col)
    return jsonify(result)

@app.route("/reset", methods=["GET"])
def reset_game():
    game.new_game(game.mode)
    return jsonify({"message": "Game reset", "board": game.board})

if __name__ == "__main__":
    app.run(debug=True)
