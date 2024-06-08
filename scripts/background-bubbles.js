// Configuration
const bubbleCount = 50;
const minSize = 10; // Minimum bubble size
const maxSize = 500; // Maximum bubble size
const spacingBuffer = 10; // Minimum space between bubbles

// Helper function to generate a random number within a range
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to check if a new bubble overlaps with existing ones
function isOverlapping(newBubble, bubbles) {
    for (let bubble of bubbles) {
        let dx = newBubble.x - bubble.x;
        let dy = newBubble.y - bubble.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < (newBubble.size / 2 + bubble.size / 2 + spacingBuffer)) {
            return true;
        }
    }
    return false;
}

// Generate and position bubbles
function createBackgroundBubbles() {
    const bubbles = [];
    const container = document.getElementsByClassName('background-bubbles')[0];
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    while (bubbles.length < bubbleCount) {
        const size = getRandom(minSize, maxSize);
        const x = getRandom(size / 2, containerWidth - size / 2);
        const y = getRandom(size / 2, containerHeight - size / 2);

        const newBubble = { x, y, size };

        if (!isOverlapping(newBubble, bubbles)) {
            bubbles.push(newBubble);
            const bubble = document.createElement('div');
            bubble.className = 'background-bubble';
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${x - size / 2}px`;
            bubble.style.top = `${y - size / 2}px`;
            container.appendChild(bubble);
        }
    }
}
