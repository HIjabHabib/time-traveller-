function updateTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // Update time display
  document.getElementById("time").textContent =
    `${hour.toString().padStart(2, '0')}:` +
    `${minute.toString().padStart(2, '0')}:` +
    `${second.toString().padStart(2, '0')}`;

  // Determine theme
  let theme = "";
  let greeting = "";
  let description = "";

  if (hour >= 5 && hour < 9) {
    theme = "theme-sunrise";
    greeting = "Good Morning";
    description = "A warm sunrise begins your day.";
  }
  else if (hour >= 9 && hour < 17) {
    theme = "theme-day";
    greeting = "Good Day";
    description = "Bright daylight fills the sky.";
  }
  else if (hour >= 17 && hour < 20) {
    theme = "theme-sunset";
    greeting = "Good Evening";
    description = "The sun gently sets. Beautiful sky!";
  }
  else {
    theme = "theme-night";
    greeting = "Good Night";
    description = "A peaceful night with calm dark skies.";
  }

  // Apply theme
  document.body.className = theme;

  // Update text
  document.getElementById("greeting").textContent = greeting;
  document.getElementById("description").textContent = description;
}

// Update every second
setInterval(updateTime, 1000);

// Run immediately at start
updateTime();
