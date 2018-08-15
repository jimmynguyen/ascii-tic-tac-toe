/// <reference path="RenderArea.ts" />

class Board extends RenderArea {
	public static readonly NUM_ROWS: number = 3;
	public static readonly NUM_COLS: number = 3;
	public squares: Square[];

	// Constructor
	constructor(parent: RenderElement = null) {
		super(null, parent);
		this.reset();
	}

	// Public methods
	public toArray(): any[] {
		return this.squares.map(s => s.sign == TicTacToeSign.NO_SIGN ? s.index : s.sign);
	}

	public reset(): void {
		this.removeAllElements();
		this.removeAllLinks();
		this.squares = [];

		for (let rowIndex: number = 0; rowIndex < Board.NUM_ROWS; rowIndex++) {
			let row: Row = new Row(this);
			for (let colIndex: number = 0; colIndex < Board.NUM_COLS; colIndex++) {
				let index: number = (rowIndex * Board.NUM_COLS) + colIndex;
				let square: Square = new Square(row, index);
				row.addSquare(square);
				this.squares.push(square);
			}
			this.addElements(row);
			if (rowIndex != Board.NUM_ROWS - 1) {
				this.addElements(new RowSeparator());
			}
		}
		this.update();
	}
}