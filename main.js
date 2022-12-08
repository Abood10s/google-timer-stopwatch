const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const form = document.getElementById("form");
const timer = document.getElementById("timer");
const show_timer = document.getElementById("show-timer");
const show_stop = document.getElementById("show-stopwatch");
const the_timer = document.getElementById("google-timer");
const the_stop = document.getElementById("stop-watch");

/*********************************
            Timer
*********************************/

let minsinput = document.getElementById("minsinput");
let pauseClicked = true;

let startminutes = 10;
the_timer.style.display = "none";
show_timer.addEventListener("click", () => {
  show_timer.classList.add("active");
  show_stop.classList.remove("active");
  the_stop.style.display = "none";
  the_timer.style.display = "flex";
});

show_stop.addEventListener("click", () => {
  show_stop.classList.add("active");
  show_timer.classList.remove("active");
  the_timer.style.display = "none";
  the_stop.style.display = "flex";
});

minsinput.addEventListener("input", (e) => {
  startminutes = e.target.value;
});
start.addEventListener("click", () => {
  form.style.display = "none";

  /**************/
  let time = startminutes * 60;
  function updateTimer() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timer.textContent = `${minutes}m : ${seconds}s `;
    time--;
  }
  let interval = setInterval(updateTimer, 1000);
  /***********************/
  pause.addEventListener("click", () => {
    pauseClicked = !pauseClicked;
    pause.id = "start";
    pause.innerText = "start";
    clearInterval(interval);
    if (pauseClicked) {
      pause.innerText = "pause";

      function updateTimer() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timer.textContent = `${minutes}m : ${seconds}s `;
        if (time !== 00 && seconds !== 00) {
      time--;
    } else {
      timer.style.color = "red";
      alert("timer Ended!");
    }
      }
      interval = setInterval(updateTimer, 1000);
    } else {
      pause.innerText = "start";
      pause.style.padding = "0.5rem";
      pause.addEventListener("click", () => {
        updateTimer();
      });
    }
  });

  reset.addEventListener("click", () => {
    time = startminutes * 60;
  });
});

/*********************************
            Stop Watch
*********************************/

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 1000);
  }
});
pauseBtn.addEventListener("click", () => {
  if (!paused) {
    paused = true;
    elapsedTime = Date.now() - startTime;
    clearInterval(intervalId);
  }
});
resetBtn.addEventListener("click", () => {
  paused = true;
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  currentTime = 0;
  hrs = 0;
  mins = 0;
  secs = 0;
  timeDisplay.textContent = `00:00:00`;
});

function updateTime() {
  elapsedTime = Date.now() - startTime;

  secs = Math.floor((elapsedTime / 1000) % 60);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

  secs = pad(secs);
  mins = pad(mins);
  hrs = pad(hrs);

  timeDisplay.textContent = `${hrs}h:${mins}m:${secs}s`;

  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }
}
