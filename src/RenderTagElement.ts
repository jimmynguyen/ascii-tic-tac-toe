class RenderTagElement extends RenderElement {
	protected tagType: RenderTagElementType;
	protected classes: RenderClass[];
	private hasClosingTag: boolean;

	// Constructor
	constructor(id: string = null, content: string = null, parent: RenderElement = null, tagType: RenderTagElementType, hasClosingTag: boolean = false, ...classTypes: RenderClassType[]) {
		super(id, content, parent);
		this.tagType = tagType;
		this.hasClosingTag = hasClosingTag;
		this.classes = classTypes.map(t => new RenderClass(t));
	}

	//Public methods
	public render(): string {
		return this.openTag()
			.appendId()
			.appendClasses()
			.closeTag()
			.appendContent()
			.appendClosingTag()
			.toString();
	}

	public getTagType(): RenderTagElementType {
		return this.tagType;
	}

	public addClass(classType: RenderClassType): boolean {
		if (this.hasClass(classType)) {
			return false;
		}
		this.classes.push(new RenderClass(classType));
		return true;
	}

	public removeClass(classType: RenderClassType): boolean {
		if (!this.hasClass(classType)) {
			return false;
		}
		this.classes = this.classes.filter(c => c.getClassType() != classType);
		return true;
	}

	private hasClass(classType: RenderClassType): boolean {
		return this.classes.filter(c => c.getClassType() == classType).length > 0;
	}

	// Private methods
	private openTag(): RenderTagElement {
		this.str = "";
		let tagType: RenderTagElementType = this.getTagType();
		if (tagType) {
			this.str += "<".concat(tagType);
		}
		return this;
	}

	private appendId(): RenderTagElement {
		if (this.id) {
			this.str += " id=\"".concat(this.id.toString()).concat("\"");
		}
		return this;
	}

	private appendClasses(): RenderTagElement {
		if (this.classes.length > 0) {
			this.str += " class=\"";
			for (let i: number = 0; i < this.classes.length; i++) {
				this.str += this.classes[i].toString();
				if (i != this.classes.length - 1) {
					this.str += " ";
				}
			}
			this.str += "\"";
		}
		return this;
	}

	private closeTag(): RenderTagElement {
		this.str += ">";
		return this;
	}

	private appendContent(): RenderTagElement {
		let content: string = this.getContent();
		if (content) {
			this.str += content;
		}
		return this;
	}

	private appendClosingTag(): RenderTagElement {
		if (this.hasClosingTag) {
			this.str += "</".concat(this.tagType).concat(">");
		}
		return this;
	}

	private toString(): string {
		return this.str;
	}
}