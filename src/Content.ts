class Content extends RenderArea {
	private board: Board;
	private resetButton: ResetButton;
	private status: Status;

	// Constructor
	constructor() {
		super("content");
		this.board = new Board(this);
		this.resetButton = new ResetButton(this);
		this.status = new Status(this);

		this.addElements(
			this.status,
			RenderArea.getBrTagElement(),
			RenderArea.getBrTagElement(),
			this.board,
			RenderArea.getBrTagElement(),
			RenderArea.getBrTagElement(),
			this.resetButton
		);
		this.addLinks(new RenderLinkClick("#".concat(this.resetButton.getId()), new CallbackCollection(this.reset.bind(this))));
		this.update();
	}

	// Public methods
	public update(): void {
		super.update();
		this.runLinks();
	}

	public getStatus(): Status {
		return this.status;
	}

	// Private methods
	private reset(): void {
		this.board.reset();
		this.status.reset();
	}
}