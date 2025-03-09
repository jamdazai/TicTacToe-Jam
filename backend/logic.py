class TicTacToe:
    def __init__(self):
        self.board = [["" for _ in range(3)] for _ in range(3)]
        self.current_player = "X"
        self.scores = {"X": 0, "O": 0}
        self.rounds_played = 0
        self.mode = 3                                                                       # Default Best of 3

    def new_game(self, mode=3):
        self.board = [["" for _ in range(3)] for _ in range(3)]
        self.current_player = "X"
        self.rounds_played = 0
        self.mode = mode

        if self.rounds_played == 0:
            self.scores = {"X": 0, "O": 0}


    def make_move(self, row, col):
        if self.board[row][col] != "":
            return {"error": "Invalid move, cell already occupied."}

        self.board[row][col] = self.current_player
        winner = self.check_winner()

        if winner:
            self.scores[winner] += 1
            self.rounds_played += 1
            if self.scores[winner] >= (self.mode // 2) + 1:
                return {"winner": winner, "final_winner": True, "scores": self.scores}

            return {"winner": winner, "board": self.board, "scores": self.scores}

        self.current_player = "O" if self.current_player == "X" else "X"
        return {"board": self.board, "current_player": self.current_player, "scores": self.scores}


    def check_winner(self):
        for row in self.board:
            if row[0] == row[1] == row[2] and row[0] != "":
                return row[0]
        for col in range(3):
            if self.board[0][col] == self.board[1][col] == self.board[2][col] and self.board[0][col] != "":
                return self.board[0][col]
        if self.board[0][0] == self.board[1][1] == self.board[2][2] and self.board[0][0] != "":
            return self.board[0][0]
        if self.board[0][2] == self.board[1][1] == self.board[2][0] and self.board[0][2] != "":
            return self.board[0][2]
        return None
