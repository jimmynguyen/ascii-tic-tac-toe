class ResetButton extends RenderTagElement {
	// Constructor
	constructor(parent: RenderElement = null) {
		super("resetButton", "Reset", parent, RenderTagElementType.SPAN, true, RenderClassType.ASCII_REAL_BUTTON);
	}
}