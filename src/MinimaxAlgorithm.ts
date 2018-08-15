// source: https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
class MinimaxAlgorithm {
	// Public methods
	public static run(board: any[], sign: TicTacToeSign): MinimaxAlgorithmReturnValue {
		let availableSpots = this.emptyIndices(board);

		// checks for the terminal states such as win, lose, and tie and returning a value accordingly
		if (this.winning(board, TicTacToeSign.X)) {
			return new MinimaxAlgorithmReturnValue(null, -10);
		} else if (this.winning(board, TicTacToeSign.O)) {
			return new MinimaxAlgorithmReturnValue(null, 10);
		} else if (availableSpots.length === 0) {
			return new MinimaxAlgorithmReturnValue(null, 0);
		}

		// an board to collect all the objects
		let moves: MinimaxAlgorithmReturnValue[] = [];

		// loop through available spots
		for (let i: number = 0; i < availableSpots.length; i++) {
			// create an object for each and store the index of that spot 
			let move: MinimaxAlgorithmReturnValue = new MinimaxAlgorithmReturnValue(board[availableSpots[i]]);

			// set the empty spot to the current player
			board[availableSpots[i]] = sign;

			// collect the score resulted from calling minimax on the opponent of the current player
			let result: MinimaxAlgorithmReturnValue = this.run(board, sign == TicTacToeSign.O ? TicTacToeSign.X : TicTacToeSign.O);
			move.score = result.score;

			// reset the spot to empty
			board[availableSpots[i]] = move.index;

			// push the object to the board
			moves.push(move);
		}

		// if it is the computer's turn loop over the moves and choose the move with the highest score
		let bestMoveIndex: number;
		let bestScore: number;
		if (sign === TicTacToeSign.O) {
			bestScore = -10000;
			for (let i: number = 0; i < moves.length; i++) {
				if (moves[i].score > bestScore) {
					bestScore = moves[i].score;
					bestMoveIndex = i;
				}
			}
		} else {
			// else loop over the moves and choose the move with the lowest score
			bestScore = 10000;
			for (let i: number = 0; i < moves.length; i++) {
				if (moves[i].score < bestScore) {
					bestScore = moves[i].score;
					bestMoveIndex = i;
				}
			}
		}

		// return the chosen move (object) from the moves board
		return moves[bestMoveIndex];
	}

	public static winning(board: any[], sign: TicTacToeSign) {
		return ((board[0] == sign) && (board[1] == sign) && (board[2] == sign))
			|| ((board[3] == sign) && (board[4] == sign) && (board[5] == sign))
			|| ((board[6] == sign) && (board[7] == sign) && (board[8] == sign))
			|| ((board[0] == sign) && (board[3] == sign) && (board[6] == sign))
			|| ((board[1] == sign) && (board[4] == sign) && (board[7] == sign))
			|| ((board[2] == sign) && (board[5] == sign) && (board[8] == sign))
			|| ((board[0] == sign) && (board[4] == sign) && (board[8] == sign))
			|| ((board[2] == sign) && (board[4] == sign) && (board[6] == sign));
	}

	// Private methods
	private static emptyIndices(board: any[]): number[] {
		return board.filter(s => (s != TicTacToeSign.X) && (s != TicTacToeSign.O));
	}
}