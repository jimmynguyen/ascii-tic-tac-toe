var squareIds = ["square0", "square1", "square2", "square3", "square4", "square5", "square6", "square7", "square8"];

var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

var huPlayer = "X";
var aiPlayer = "O";

$(document).ready(function() {
	$("#resetButton").click(function () {
		board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		squareIds.forEach(function (id) {
			$("#".concat(id)).html("   ");
			if (!$(id).hasClass("cursorPointer")) {
				$(id).addClass("cursorPointer");
				$(id).removeClass("cursorNotAllowed");
			}
		});
		$("#status").html("&nbsp;");
	});
	
	$(".square").click(function (e) {
		if ($(this).hasClass("cursorNotAllowed")) {
			return false;
		}
		$(this).html(" X ");
		$(this).removeClass("cursorPointer");
		$(this).addClass("cursorNotAllowed");
		setPosition(squareIds.indexOf(e.currentTarget.id), huPlayer);
		var minimaxResult = minimax(board, aiPlayer);
		if (minimaxResult.score == 0) {
			if (minimaxResult.index === undefined) {
				$("#status").html("You tied!");
			} else {
				setPosition(minimaxResult.index, aiPlayer);
				$("#".concat(squareIds[minimaxResult.index])).html(" O ");
			}
		} else if (minimaxResult.score > 0) {
			if (minimaxResult.index !== undefined) {
				setPosition(minimaxResult.index, aiPlayer);
				$("#".concat(squareIds[minimaxResult.index])).html(" O ");
			}
			$("#status").html("You lost!");
		} else {
			// never gonna happen
			$("#status").html("You won!");
		}
		return false;
	});
});

function setPosition(position, player) {
	board[position] = player;
}

function emptyIndices(board) {
	return board.filter(s => s != "X" && s != "O");
}

function winning(board, player) {
	if (
		(board[0] == player && board[1] == player && board[2] == player) ||
		(board[3] == player && board[4] == player && board[5] == player) ||
		(board[6] == player && board[7] == player && board[8] == player) ||
		(board[0] == player && board[3] == player && board[6] == player) ||
		(board[1] == player && board[4] == player && board[7] == player) ||
		(board[2] == player && board[5] == player && board[8] == player) ||
		(board[0] == player && board[4] == player && board[8] == player) ||
		(board[2] == player && board[4] == player && board[6] == player)
	) {
		return true;
	} else {
		return false;
	}
}

// src: https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
function minimax(newBoard, player) {

	//available spots
	var availSpots = emptyIndices(newBoard);

	// checks for the terminal states such as win, lose, and tie 
	//and returning a value accordingly
	if (winning(newBoard, huPlayer)) {
		return {
			score: -10
		};
	} else if (winning(newBoard, aiPlayer)) {
		return {
			score: 10
		};
	} else if (availSpots.length === 0) {
		return {
			score: 0
		};
	}

	// an array to collect all the objects
	var moves = [];

	// loop through available spots
	for (var i = 0; i < availSpots.length; i++) {
		//create an object for each and store the index of that spot 
		var move = {};
		move.index = newBoard[availSpots[i]];

		// set the empty spot to the current player
		newBoard[availSpots[i]] = player;

		/*collect the score resulted from calling minimax 
		  on the opponent of the current player*/
		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		// reset the spot to empty
		newBoard[availSpots[i]] = move.index;

		// push the object to the array
		moves.push(move);
	}

	// if it is the computer's turn loop over the moves and choose the move with the highest score
	var bestMove;
	if (player === aiPlayer) {
		var bestScore = -10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {

		// else loop over the moves and choose the move with the lowest score
		var bestScore = 10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	// return the chosen move (object) from the moves array
	return moves[bestMove];
}
