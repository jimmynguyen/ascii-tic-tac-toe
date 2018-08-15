class RenderLinkClick extends RenderLink {
	private element: string;
	private callbackCollection: CallbackCollection;

	// Constructor
	constructor(element: string, callbackCollection: CallbackCollection) {
		super();
		this.element = element;
		this.callbackCollection = callbackCollection;
	}

	// Public methods
	public run(): void {
		let renderLink: RenderLinkClick = this;

		$(this.element).click((event) => {
			renderLink.callbackCollection.fire();
			return false; // Avoid event bubbling
		});
	}
}