// slider
const slider = document.getElementById("playerRange");

// przycisk następnego gracza
const nextPlayerButton = document.querySelector(".btn-next");
const additionalNextButton = document.querySelector(".btn-success");
if (nextPlayerButton) {
	nextPlayerButton.addEventListener("click", nextPlayer);
}
if (additionalNextButton){
    additionalNextButton.addEventListener("click", nextPlayer);
}

// przycisk rozpoczęcia gry
const startButton = document.querySelector(".btn-start");
if (startButton) {
	startButton.addEventListener("click", startGame);
}



// funkcja inicjująca obsługę suwaka
function initializeSlider() {
	if (slider) {
		slider.addEventListener("input", updatePlayerInputs);
	}
}

// funkcja do wyboru liczby graczy na podstawie suwaka
function updatePlayerInputs() {
	if (!slider) return;

	const playerInputs = document.querySelectorAll(".players-list .player-input");
	const playerCount = document.getElementById("playerCount");

	// aktualizacja liczby graczy pod suwakiem
	const count = parseInt(slider.value);
	playerCount.textContent = count;

	// widoczność inputów nazw graczy
	playerInputs.forEach((input, index) => {
		if (index < count) {
			input.classList.remove("hidden");
		} else {
			input.classList.add("hidden");
		}
	});
}

// funkcja zapisująca nazwy graczy do session storage
function savePlayers() {
	const playerInputs = document.querySelectorAll(
		".players-list .player-input input"
	);
	const players = [];

	playerInputs.forEach((input) => {
        const playerName = input.value.trim();
        if (playerName) {
            players.push(playerName);
        }
	});

	sessionStorage.setItem("players", JSON.stringify(players));
}

// funkcja do pobierania listy graczy z session storage
function getPlayers() {
	return JSON.parse(sessionStorage.getItem("players")) || [];
}

// funkcja do aktualizacji nazwy gracza na podstawie indeksu
function updatePlayerName(playerIndex) {
	const players = getPlayers();
	const playerName = document.querySelector(".player-name");

	if (players.length > 0 && playerName) {
		playerName.textContent = players[playerIndex];
	}
}

// funkcja do obsługi przycisku następnego gracza
function nextPlayer() {
	let currentPlayerIndex =
		parseInt(sessionStorage.getItem("currentPlayerIndex")) || 0;
	const players = getPlayers();

	// jeśli nie ma żadnych graczy, zakończ funkcję
	if (players.length === 0) return;

	// inkrementacja indeksu gracza
	currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
	sessionStorage.setItem("currentPlayerIndex", currentPlayerIndex.toString());

	// aktualizacja nazwy gracza na stronie
	updatePlayerName(currentPlayerIndex);

	// przejście do kolejnego gracza
	goToMenuPage();
}

// funkcja do przejścia do menu gracza
function goToMenuPage() {
	window.location.href = "./menu.html";
}

// funkcja rozpoczynająca grę
function startGame() {
	savePlayers();
	sessionStorage.setItem('currentPlayerIndex', '0');
	goToMenuPage();
}


// operacje wykonywane przy załadowaniu strony
document.addEventListener("DOMContentLoaded", function () {
	initializeSlider();

    // aktualizacja nazwy gracza na podstawie indeksu
    const currentPlayerIndex = parseInt(sessionStorage.getItem('currentPlayerIndex')) || 0;
    updatePlayerName(currentPlayerIndex);
});
