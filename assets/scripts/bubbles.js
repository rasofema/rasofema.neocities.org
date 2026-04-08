(() => {
    const layer = document.querySelector(".bubble-layer");

    if (!layer) {
        return;
    }

    const MAX_BUBBLES = 24;
    const SPAWN_INTERVAL_MS = 1000;
    const BUBBLE_LIFETIME_MS = 20000;
    const MIN_SIZE = 10;
    const MAX_SIZE = 40;
    const MIN_DURATION = 8;
    const MAX_DURATION = 18;

    function spawnBubble() {
        if (layer.childElementCount >= MAX_BUBBLES) {
            layer.firstElementChild?.remove();
        }

        const bubble = document.createElement("div");
        bubble.className = "bubble";

        const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.animationDuration = `${MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION)}s`;
        bubble.style.animationDelay = `-${Math.random() * 2}s`;

        layer.appendChild(bubble);
        window.setTimeout(() => bubble.remove(), BUBBLE_LIFETIME_MS);
    }

    spawnBubble();
    window.setInterval(spawnBubble, SPAWN_INTERVAL_MS);
})();