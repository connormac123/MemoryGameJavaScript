document.addEventListener("DOMContentLoaded", function () {
    const memoryGame = document.querySelector('.memory-game');
    const gridSizeSelect = document.getElementById('grid-size');
    const startGameButton = document.getElementById('start-game');
    let gridSize = 4; // Default grid size
    let cards = [];
    let flippedCards = [];

    startGameButton.addEventListener('click', startGame);
    gridSizeSelect.addEventListener('change', () => {
        gridSize = parseInt(gridSizeSelect.value);
        startGame();
    });

    function startGame() {
        clearGame();
        createCards();
        shuffledCards = shuffle(cards);
        renderCards(shuffledCards);
    }

    function clearGame() {
        memoryGame.innerHTML = '';
        cards = [];
        flippedCards = [];
    }

    function createCards() {
        for (let i = 0; i < gridSize * gridSize / 2; i++) {
            cards.push(String.fromCharCode(65 + i));
            cards.push(String.fromCharCode(65 + i));
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function renderCards(cards) {
        memoryGame.innerHTML = '';
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.textContent = card;
            cardElement.addEventListener('click', () => flipCard(cardElement));
            memoryGame.appendChild(cardElement);
        });
    }

    function flipCard(cardElement) {
        if (flippedCards.length < 2 && !flippedCards.includes(cardElement)) {
            cardElement.classList.add('flip');
            flippedCards.push(cardElement);
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.textContent === secondCard.textContent) {
            flippedCards.forEach(card => card.classList.add('hide'));
        } else {
            flippedCards.forEach(card => card.classList.remove('flip'));
        }
        flippedCards = [];
    }
});
