class Square extends RenderArea {
	public index: number;
	public sign: TicTacToeSign;

	// Constructor
	constructor(parent: Row = null, index: number, sign: TicTacToeSign = TicTacToeSign.NO_SIGN) {
		super(null, parent);
		this.index = index;
		this.sign = sign;
		let id: string = "square".concat(index.toString());
		this.addElements(
			new RenderTagElement(id, " ".concat(this.sign).concat(" "), this, RenderTagElementType.SPAN, true, RenderClassType.SQUARE, RenderClassType.CURSOR_POINTER)
		);
		this.addLinks(new RenderLinkClick("#".concat(id), new CallbackCollection(this.markSquare.bind(this))));
	}

	// Public method
	private markSquare(): void {
		if (this.sign == TicTacToeSign.NO_SIGN) {
			this.setSign(TicTacToeSign.X);
			let board: Board = this.parent.getParent() as Board;
			let result: MinimaxAlgorithmReturnValue = MinimaxAlgorithm.run(board.toArray(), TicTacToeSign.O);
			if (result.score == 0) {
				if (result.index != null) {
					board.squares[result.index].setSign(TicTacToeSign.O);
				} else {
					this.setStatus(board, "You tied... (._.)")
				}
			} else if (result.score > 0) {
				if (result.index != null) {
					board.squares[result.index].setSign(TicTacToeSign.O);
				}
				if (MinimaxAlgorithm.winning(board.toArray(), TicTacToeSign.O)) {
					this.setStatus(board, "You lost... (;_;)");
				}
			} else {
				// never gonna happen
			}
		}
	}

	private setSign(sign: TicTacToeSign): void {
		this.sign = sign;
		this.disable();
	}

	private setStatus(board: Board, message: string) {
		let content: Content = board.getParent() as Content;
		let status: Status = content.getStatus();
		status.setContent(message);
		status.update();
		board.squares.forEach(s => s.disable());
	}

	private disable(): void {
		let renderTagElement: RenderTagElement = this.elements[0] as RenderTagElement;
		renderTagElement.setContent(" ".concat(this.sign).concat(" "));
		renderTagElement.addClass(RenderClassType.CURSOR_NOT_ALLOWED);
		renderTagElement.removeClass(RenderClassType.CURSOR_POINTER);
		this.removeAllLinks();
		this.update();
	}
}