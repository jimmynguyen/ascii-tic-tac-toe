class RowSeparator extends RenderArea {
	// Constructor
	constructor(parent: RenderElement = null) {
		super(null, parent);
		this.addElements(
			new RenderElement(null, "---+---+---"),
			RenderArea.getBrTagElement()
		);
	}
}