let activeIndex = 0;
const cards = document.querySelectorAll('.card-container');

function updateCarousel() {
    cards.forEach((card, i) => {
        const offset = i - activeIndex;
        card.style.setProperty('--offset', offset);
        card.style.setProperty('--abs-offset', Math.abs(offset));
        card.style.setProperty('--direction', offset > 0 ? 1 : offset < 0 ? -1 : 0);
        card.style.setProperty('--active', i === activeIndex ? 1 : 0);
    });
}

function moveLeft() {
    if (activeIndex > 0) {
        activeIndex--;
        updateCarousel();
    }
}

function moveRight() {
    if (activeIndex < cards.length - 1) {
        activeIndex++;
        updateCarousel();
    }
}
