var time = 60;
var interval;
var display = document.getElementById("display");
var altBtns = document.getElementById("alt-btns");
var resetBtn = document.getElementById("reset");

function startTimer() {
    altBtns.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => {
        if (time > 0) {
            time -= 1;
            display.innerHTML =
Math.floor((time % 3600) / 60).toString().padStart(2, "0") + ":" +
                Math.floor((time % 60)).toString().padStart(2, "0");
        } else {
            stopTimer();
        }
    }, 1000);
}

function stopTimer() {
    altBtns.innerHTML = `<i class="fa-solid fa-play"></i>`;
    clearInterval(interval);
    interval = null;
}

altBtns.onclick = function () {
    if (interval) {
        stopTimer();
    } else {
        startTimer();
    }
};

resetBtn.onclick = function () {
    altBtns.innerHTML = `<i class="fa-solid fa-play"></i>`;
    if (interval) {
        clearInterval(interval);
    }
    interval = null;
    time = 60;
    display.innerHTML = "01:00";
};

// Inicjalizacja wyświetlacza
display.innerHTML = "01:00";
