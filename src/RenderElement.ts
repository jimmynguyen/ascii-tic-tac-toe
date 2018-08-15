class RenderElement {
	protected id: string;
	protected content: string;
	protected str: string;
	protected parent: RenderElement;

	// Constructor
	constructor(id: string = null, content: string = null, parent: RenderElement = null) {
		this.id = id;
		this.content = content;
		this.parent = parent;
	}

	// Public methods
	public update(): void {
		if (this.id) {
			$("#".concat(this.id)).html(this.render());
		}
		if (this.parent) {
			this.parent.update();
		}
	}

	public render(): string {
		this.str = "";
		let content: string = this.getContent();
		if (content) {
			this.str += content;
		}
		return this.str;
	}

	public getContent(): string {
		return this.content;
	}

	public setContent(content: string): void {
		this.content = content;
	}

	public getId(): string {
		return this.id;
	}

	public getParent(): RenderElement {
		return this.parent;
	}
}