// slider
const slider = document.getElementById("playerRange");

// przyciski dodające punkty
const btnFivePoints = document.querySelector(".btn-five-points");
const btnTenPoints = document.querySelector(".btn-ten-points");
const btnFifteenPoints = document.querySelector(".btn-fifteen-points");

if (btnFivePoints) {
	btnFivePoints.addEventListener("click", () => {
		const currentPlayer = getCurrentPlayer();
		if (currentPlayer) {
			addPoints(currentPlayer, 5);
		}
	});
}

if (btnTenPoints) {
	btnTenPoints.addEventListener("click", () => {
		const currentPlayer = getCurrentPlayer();
		if (currentPlayer) {
			addPoints(currentPlayer, 10);
		}
	});
}

if (btnFifteenPoints) {
	btnFifteenPoints.addEventListener("click", () => {
		const currentPlayer = getCurrentPlayer();
		if (currentPlayer) {
			addPoints(currentPlayer, 15);
		}
	});
}

// przyciski następnego gracza
const nextPlayerButton = document.querySelector(".btn-next");
const additionalNextButton = document.querySelector(".btn-success");
if (nextPlayerButton) {
	nextPlayerButton.addEventListener("click", nextPlayer);
}
if (additionalNextButton) {
	additionalNextButton.addEventListener("click", nextPlayer);
}

// przycisk zmiany pytania/wyzwania
const rerollButton = document.querySelector(".btn-reroll");
if (rerollButton) {
	rerollButton.addEventListener("click", (event) => {
		event.preventDefault();
		const currentPlayer = getCurrentPlayer();
		if (currentPlayer) {
			if (getPoints(currentPlayer) >= 15) {
				addPoints(currentPlayer, -15);
				location.reload();
			} else {
				// komunikat o braku punktów
				const popupMessage = document.querySelector(".pop-up");
				popupMessage.style.display = "block";
				setTimeout(() => {
					popupMessage.style.display = "none";
				}, 2000);
			}
		}
	});
}

// przycisk przekazania pytania/wyzwania
const skipButton = document.querySelector(".btn-skip");
if (skipButton) {
	skipButton.addEventListener("click", (event) => {
		event.preventDefault();
		const currentPlayer = getCurrentPlayer();
		if (currentPlayer) {
			if (getPoints(currentPlayer) >= 30) {
				addPoints(currentPlayer, -30);
				// Wyświetlenie pytania dla nowego gracza
				let currentPlayerIndex =
					parseInt(sessionStorage.getItem("currentPlayerIndex")) || 0;
				const players = getPlayers();
				// jeśli nie ma żadnych graczy, zakończ funkcję
				if (players.length === 0) return;
				// inkrementacja indeksu gracza
				currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
				sessionStorage.setItem(
					"currentPlayerIndex",
					currentPlayerIndex.toString()
				);
				// aktualizacja nazwy gracza na stronie
				updatePlayerName(currentPlayerIndex);
				updatePlayerScores();
			} else {
				// komunikat o braku punktów
				const popupMessage = document.querySelector(".pop-up");
				popupMessage.style.display = "block";
				setTimeout(() => {
					popupMessage.style.display = "none";
				}, 2000);
			}
		}
	});
}

// przycisk szansy
const chanceButton = document.getElementById("btn-chance");

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
			// inicjalizacja punktów dla każdego gracza
			sessionStorage.setItem(`${playerName}_points`, "0");
		}
	});

	sessionStorage.setItem("players", JSON.stringify(players));
	sessionStorage.setItem("currentPlayerIndex", "0");
}

// funkcja do pobierania listy graczy z session storage
function getPlayers() {
	return JSON.parse(sessionStorage.getItem("players")) || [];
}

// funkcja zwracająca aktualnego gracza
function getCurrentPlayer() {
	const players = getPlayers();
	const currentPlayerIndex =
		parseInt(sessionStorage.getItem("currentPlayerIndex")) || 0;
	return players[currentPlayerIndex];
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
	sessionStorage.setItem("currentPlayerIndex", "0");
	goToMenuPage();
}

// funkcja do wyświetlania losowego pytania
async function fetchRandomQuestion() {
	try {
		// wczytanie zawartości pliku JSON
		const response = await fetch("https://avargaque.github.io/TruthOrDare/data/questions.json");
		JSON;
		const data = await response.json();

		// wybór losowego pytania
		const questions = data.questions;
		const randomIndex = Math.floor(Math.random() * questions.length);
		const randomQuestion = questions[randomIndex];

		// wyświetlenie pytania na stronie
		const questionContainer = document.getElementById("question-container");
		questionContainer.textContent = randomQuestion;
	} catch (error) {
		console.error("Wystąpił błąd podczas wczytywania danych:", error);
	}
}

// funkcja do wyświetlania losowego wyzwania
async function fetchRandomDare() {
	try {
		const response = await fetch("./data/dares.json");
		JSON;
		const data = await response.json();

		const dares = data.dares;
		const randomIndex = Math.floor(Math.random() * dares.length);
		const randomDare = dares[randomIndex];

		const dareContainer = document.getElementById("dare-container");
		dareContainer.textContent = randomDare;
	} catch (error) {
		console.error("Wystąpił błąd podczas wczytywania danych:", error);
	}
}

// funkcja do wyświetlania losowego wyzwania czasowego
async function fetchRandomTimeDare() {
	try {
		const response = await fetch("./data/timeDares.json");
		JSON;
		const data = await response.json();

		const timeDares = data.timeDares;
		const randomIndex = Math.floor(Math.random() * timeDares.length);
		const randomTimeDare = timeDares[randomIndex];

		const timeDareContainer = document.getElementById("time-dare-container");
		timeDareContainer.textContent = randomTimeDare;
	} catch (error) {
		console.error("Wystąpił błąd podczas wczytywania danych:", error);
	}
}

// funkcja do wyboru szansy
function randomChoice() {
	// możliwe opcje
	const firstChoice = function () {
		window.location.href = "./truth.html";
	};
	const secondChoice = function () {
		window.location.href = "./dare.html";
	};
	const thirdChoice = function () {
		window.location.href = "./timeDare.html";
	};
	const fourthChoice = function () {
		window.location.href = "./chance.html";
	};

	// losowe przejście do pytania, wyzwania, wyzwania czasowego lub bonusu punktów
	const choices = [firstChoice, secondChoice, thirdChoice, fourthChoice];
	const randomIndex = Math.floor(Math.random() * choices.length);
	return choices[randomIndex]();
}

// funkcja zmieniająca liczbę punktów gracza
function addPoints(player, points) {
	const currentPoints =
		parseInt(sessionStorage.getItem(`${player}_points`)) || 0;
	const newPoints = currentPoints + points;
	sessionStorage.setItem(`${player}_points`, newPoints.toString());
	updatePlayerScores();
}
// funkcja odczytująca punkty gracza
function getPoints(player) {
	const points = parseInt(sessionStorage.getItem(`${player}_points`)) || 0;
	return points;
}

// funkcja aktualizująca wyniki graczy
function updatePlayerScores() {
	const players = getPlayers();
	const currentPlayerIndex =
		parseInt(sessionStorage.getItem("currentPlayerIndex")) || 0;
	const currentPlayer = players[currentPlayerIndex];
	const playerScoreElement = document.querySelector(".player-score");
	if (playerScoreElement) {
		const points = getPoints(currentPlayer);
		playerScoreElement.textContent = `${points}`;
	}
}

// operacje wykonywane przy załadowaniu strony
document.addEventListener("DOMContentLoaded", function () {
	initializeSlider();

	// dodawanie animacji po załadowaniu strony
	const elementsToAnimate = document.querySelectorAll(".animate-on-load");
	elementsToAnimate.forEach((element) => {
		element.classList.add("scale-up-center");
	});

	// aktualizacja nazwy gracza na podstawie indeksu
	const currentPlayerIndex =
		parseInt(sessionStorage.getItem("currentPlayerIndex")) || 0;
	updatePlayerName(currentPlayerIndex);

	// wyświetlenie pytań i wyzwań
	if (window.location.pathname === "/truth.html") {
		fetchRandomQuestion();
	}
	if (window.location.pathname === "/dare.html") {
		fetchRandomDare();
	}
	if (window.location.pathname === "/timeDare.html") {
		fetchRandomTimeDare();
	}

	// aktywacja przycisku szansy
	if (window.location.pathname === "/menu.html") {
		chanceButton.addEventListener("click", randomChoice);
	}

	// przypisanie punktów na stronie szansy
	if (window.location.pathname === "/chance.html") {
		// funkcja przydzielająca losowo punkty
		const randomPoints = function () {
			const bonusPoints = [0, 10, 20, 50];
			const randomIndex = Math.floor(Math.random() * bonusPoints.length);
			return bonusPoints[randomIndex];
		};
		const points = randomPoints();

		const pointsContainer = document.getElementById("random-points-container");
		pointsContainer.textContent = points;

		// dodanie punktów do konta gracza
		addPoints(getCurrentPlayer(), points);
	}

	//aktualizacja wyników graczy
	updatePlayerScores();
});
