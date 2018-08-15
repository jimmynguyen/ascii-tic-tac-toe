class CallbackCollection {
	private callbacks: {(): void}[] = [];

	// Constructor
	constructor(... callbacks: {(): void}[]) {
		this.callbacks = callbacks;
	}

	// Public methods
	public addCallback(callback: {(): void;}): CallbackCollection {
		this.callbacks.push(callback);
		return this;
	}

	public fire(): void {
		for (let i: number = 0; i < this.callbacks.length; i++) {
			this.callbacks[i]();
		}
	}

	public reset(): void {
		this.callbacks = [];
	}
}