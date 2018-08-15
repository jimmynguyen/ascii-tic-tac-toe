/// <reference path="RenderElement.ts" />

class RenderArea extends RenderElement {
	protected elements: RenderElement[] = [];
	protected links: RenderLink[] = [];

	// Constructor
	constructor(id: string = null, parent: RenderElement = null) {
		super(id, null, parent);
	}

	// Public methods
	public static getBrTagElement(parent: RenderElement = null): RenderElement {
		return new RenderTagElement(null, null, parent, RenderTagElementType.BR);
	}

	public render(): string {
		this.str = "";
		this.elements.forEach(t => {
			this.str += t.render();
		});
		return this.str;
	}

	public addElements(...elements: RenderElement[]) {
		elements.forEach(e => this.elements.push(e));
	}

	public removeAllElements(): void {
		this.elements = [];
	}

	public addLinks(...links: RenderLink[]) {
		links.forEach(l => this.links.push(l));
	}

	public removeAllLinks(): void {
		this.links = [];
	}

	public runLinks(): void{
		for(let i: number = 0; i < this.links.length; i++){
			this.links[i].run();
		}
		for (let i: number = 0; i < this.elements.length; i++) {
			if (this.elements[i] instanceof RenderArea) {
				let renderArea: RenderArea = this.elements[i] as RenderArea;
				renderArea.runLinks();
			}
		}
	}
}