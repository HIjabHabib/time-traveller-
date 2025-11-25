document.addEventListener('DOMContentLoaded', function() {
    const body = document.getElementById('time-traveler-body');
    const greetingElement = document.getElementById('greeting');
    const timeDisplayElement = document.getElementById('time-display');

    function updateTimeAndLayout() {
        const now = new Date();
        const hour = now.getHours();
        let timePhase = '';

        // 1. Determine the Time Phase
        if (hour >= 5 && hour < 12) {
            timePhase = 'morning';      // 5:00 to 11:59
        } else if (hour >= 12 && hour < 18) {
            timePhase = 'afternoon';    // 12:00 to 17:59
        } else if (hour >= 18 && hour < 21) {
            timePhase = 'evening';      // 18:00 to 20:59
        } else {
            timePhase = 'night';        // 21:00 to 4:59
        }

        // 2. Apply the Layout (CSS Class)
        // First, remove any existing time phase class
        // Use a more robust way to clear classes, just in case
        body.className = ''; 
        // Then, add the new time phase class
        body.classList.add(timePhase);

        // 3. Update Time Display
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        timeDisplayElement.textContent = timeString;
    }

    // Run immediately on load
    updateTimeAndLayout();

    // Set an interval to update the time and layout every minute
    setInterval(updateTimeAndLayout, 60000); // Updates every minute
});
