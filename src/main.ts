module Main {
	let game: Game = null;

	export function documentIsReady(): void {
		game = new Game();
	}
}

$(document).ready(() => {
	Main.documentIsReady();
});