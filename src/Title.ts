class Title extends RenderArea {
	// Constructor
	constructor(parent: RenderElement = null) {
		super("title", parent);
		this.addElements(
			this.getHorizontalBoundary(),
			RenderArea.getBrTagElement(),
			this.getVerticalBoundary(),
			new RenderElement(null, "ASCII Tic-Tac-Toe"),
			this.getVerticalBoundary(),
			RenderArea.getBrTagElement(),
			this.getHorizontalBoundary()
		);
		this.update();
	}

	// Private methods
	private getHorizontalBoundary(): RenderElement {
		return new RenderElement(null, " +-------------------+ ");
	}

	private getVerticalBoundary(): RenderElement {
		return new RenderElement(null, " | ");
	}
}