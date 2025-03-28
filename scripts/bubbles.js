// Configuration
const bubbleCount = 8;
const icons = ['python', 'java', 'js', 'c', 'html-css', 'hacker', 'sql', 'react'];
const minSize = (window.innerWidth + window.innerHeight) / 15; // Minimum bubble size
const maxSize = (window.innerWidth + window.innerHeight) / 8; // Maximum bubble size
const spacingBuffer = 1; // Minimum space between bubbles

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

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

function createBubbles() {
    const bubbles = [];
    const container = document.getElementById('bubbles');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    let j = 0;
    while (bubbles.length < bubbleCount) {
        const size = getRandom(minSize, maxSize);
        let x = containerWidth;
        while (x + size > containerWidth) {
            x = getRandom(size / 2, containerWidth - size / 2);
        }
        const y = getRandom(size / 2, containerHeight - size / 2);

        const newBubble = { x, y, size };
        
        if (!isOverlapping(newBubble, bubbles)) {
            bubbles.push(newBubble);
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${x - size / 3}px`;
            bubble.style.top = `${y - size / 2}px`;
            container.appendChild(bubble);
            
            (function(index) {
                bubble.addEventListener('click', () => {
                    openMenu(icons[index]);
                });
            })(j);
            
            const icon = document.createElement('div');
            icon.className = icons[j];
            icon.style.width = `${0.75 * size}px`;
            icon.style.height = `${0.75 * size}px`;
            bubble.appendChild(icon);
            j += 1;
        }
    }
}

async function openMenu(text) {
    const response = await fetch(`template-${text}.html`);
    const templateText = await response.text();
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = templateText;
    const template = tempContainer.querySelector('template').content;
    const menuClone = document.importNode(template, true);
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
    document.body.appendChild(menuClone);
}

function closeMenu() {
    let menu = document.querySelector("#dc");
    if (menu) menu.remove();
}

document.addEventListener('DOMContentLoaded', createBubbles);