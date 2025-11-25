let autoMode = true;
let stars = document.getElementById("stars");

// Create stars dynamically
function createStars() {
  for (let i = 0; i < 120; i++) {
    let star = document.createElement("div");
    star.className = "star";
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    star.style.animationDelay = (Math.random() * 2) + "s";
    stars.appendChild(star);
  }
}
createStars();

function updateScene(hour) {
  let greeting, desc, theme;

  if (hour >= 5 && hour < 9) {
    theme = "theme-sunrise";
    greeting = "Good Morning";
    desc = "Warm tones rise with the new day.";
    stars.style.opacity = 0;
  }
  else if (hour >= 9 && hour < 17) {
    theme = "theme-day";
    greeting = "Good Day";
    desc = "Bright skies and drifting clouds.";
    stars.style.opacity = 0;
  }
  else if (hour >= 17 && hour < 20) {
    theme = "theme-sunset";
    greeting = "Good Evening";
    desc = "Soft orange hues slow the world down.";
    stars.style.opacity = 0;
  }
  else {
    theme = "theme-night";
    greeting = "Good Night";
    desc = "Dark sky with twinkling stars.";
    stars.style.opacity = 1;
  }

  document.body.className = theme;
  document.getElementById("greeting").textContent = greeting;
  document.getElementById("desc").textContent = desc;
}

// Auto-update clock
function runClock() {
  if (!autoMode) return;

  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  document.getElementById("clock").textContent =
    `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  document.getElementById("ampm").textContent = h >= 12 ? "PM" : "AM";

  updateScene(h);
}

setInterval(runClock, 1000);
runClock();

// Slider control
let slider = document.getElementById("timeSlider");
slider.addEventListener("input", () => {
  autoMode = false;
  updateScene(parseInt(slider.value));
});

// Pause/resume auto mode
document.getElementById("pauseBtn").onclick = () => {
  autoMode = !autoMode;
  document.getElementById("pauseBtn").textContent =
    autoMode ? "Pause Auto" : "Resume Auto";
};

// Random scene
document.getElementById("randomBtn").onclick = () => {
  let randomHour = Math.floor(Math.random() * 24);
  slider.value = randomHour;
  autoMode = false;
  updateScene(randomHour);
};
