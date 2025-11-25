document.addEventListener('DOMContentLoaded', function() {
    const body = document.getElementById('time-traveler-body');
    const timeDisplayElement = document.getElementById('time-display');
    const greetingTextElement = document.getElementById('greeting-text');

    function updateTimeAndLayout() {
        const now = new Date();
        const hour = now.getHours();
        let timePhase = '';

        if (hour >= 5 && hour < 12) {
            timePhase = 'morning';      // 05:00 to 11:59
        } else if (hour >= 12 && hour < 18) {
            timePhase = 'afternoon';    // 12:00 to 17:59
        } else if (hour >= 18 && hour < 21) {
            timePhase = 'evening';      // 18:00 to 20:59
        } else {
            timePhase = 'night';        // 21:00 to 04:59
        }

        body.className = ''; 
        body.classList.add(timePhase);
        
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true 
        });
        timeDisplayElement.textContent = timeString;

        greetingTextElement.textContent = '';
    }

    updateTimeAndLayout();
    setInterval(updateTimeAndLayout, 60000); 
});
