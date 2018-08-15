class RenderClass {
	private classType: RenderClassType;

	// Constructor
	constructor(classType: RenderClassType) {
		this.classType = classType;
	}

	// Public methods
	public toString(): string {
		return this.classType;
	}

	public getClassType(): RenderClassType {
		return this.classType;
	}
}