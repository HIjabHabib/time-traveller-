const greeting = document.getElementById('greeting');
const hour = new Date().getHours();
let bg, message;

if (hour < 12) {
    bg = '#FFD580';
    message = 'Good Morning!';
} else if (hour < 17) {
    bg = '#87CEEB';
    message = 'Good Afternoon!';
} else if (hour < 20) {
    bg = '#FFA07A';
    message = 'Good Evening!';
} else {
    bg = '#191970';
    message = 'Good Night!';
}

document.body.style.backgroundColor = bg;
greeting.textContent = message;

