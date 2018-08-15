class Status extends RenderTagElement {
	// Constructor
	constructor(parent: RenderElement = null) {
		super("status", null, parent, RenderTagElementType.SPAN, true);
	}

	// Public methods
	public reset() {
		this.setContent(null);
		this.update();
	}
}