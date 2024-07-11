// zmienne globalne
const slider = document.getElementById('playerRange');
const playerCount = document.getElementById('playerCount');

// funkcja do wyboru liczby graczy na podstawie suwaka
function updatePlayerInputs() {
    const playerRange = document.getElementById('playerRange');
    const playerCountDisplay = document.getElementById('playerCount');
    const playerInputs = document.querySelectorAll('.players-list .player-input');
    // aktualizacja liczby graczy
    const count = parseInt(playerRange.value);
    playerCountDisplay.textContent = count;
    // widoczność pól graczy
    playerInputs.forEach((input, index) => {
        if (index < count) {
            input.classList.remove('hidden');
        } else {
            input.classList.add('hidden');
        }
    });
}

// funkcja inicjująca obsługę suwaka
function initializeSlider() {
    slider.addEventListener('input', updatePlayerInputs);
}

// pywołanie funkcji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    updatePlayerInputs();
});
