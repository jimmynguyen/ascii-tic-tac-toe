class Row extends RenderArea {
	private static readonly CAPACITY: number = 3;
	private size: number;

	// Constructor
	constructor(parent: RenderElement = null) {
		super(null, parent);
		this.size = 0;
	}

	public addSquare(square: Square): void {
		if (this.size < Row.CAPACITY) {
			this.size++;
			this.addElements(square, this.size == Row.CAPACITY ? RenderArea.getBrTagElement() : new SquareSeparator());
		}
	}

	private addSquareSeparator(): void {
		this.addElements(new SquareSeparator());
	}
}