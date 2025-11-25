document.addEventListener('DOMContentLoaded', function() {
    const body = document.getElementById('time-traveler-body');
    const timeDisplayElement = document.getElementById('time-display');
    const greetingTextElement = document.getElementById('greeting-text');

    function updateTimeAndLayout() {
        const now = new Date();
        const hour = now.getHours();
        let timePhase = '';

        // 1. Determine the Time Phase based on the 24-hour clock
        if (hour >= 5 && hour < 12) {
            timePhase = 'morning';      // 05:00 to 11:59
        } else if (hour >= 12 && hour < 18) {
            timePhase = 'afternoon';    // 12:00 to 17:59
        } else if (hour >= 18 && hour < 21) {
            timePhase = 'evening';      // 18:00 to 20:59
        } else {
            timePhase = 'night';        // 21:00 to 04:59
        }

        // 2. Apply the Layout (CSS Class)
        // Ensure only the current time phase class is on the body
        body.className = ''; 
        body.classList.add(timePhase);
        
        // 3. Update Time Display
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Display in 12-hour format like the image
        });
        timeDisplayElement.textContent = timeString;

        // Reset the greeting text, as the time-specific text is set via CSS ::before 
        greetingTextElement.textContent = '';
    }

    // Run immediately on load
    updateTimeAndLayout();

    // Set an interval to update the time and check for phase changes every minute
    setInterval(updateTimeAndLayout, 60000); 
});
