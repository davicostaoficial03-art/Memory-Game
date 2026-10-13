const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

if (!grid || !spanPlayer || !timer) {
    throw new Error('Verifique os elementos HTML do jogo.');
}

const characters = [
    '../images/imagem1.png',
    '../images/imagem2.png',
    '../images/imagem3.png',
    '../images/imagem4.png',
    '../images/imagem5.png',
    '../images/imagem6.png',
    '../images/imagem7.png',
    '../images/imagem8.png',
    '../images/imagem9.png',
    '../images/imagem10.png'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;
let seconds = 0;
let loop = null;
let timerStarted = false;

const playerName = localStorage.getItem('player') || 'Jogador';

spanPlayer.textContent = playerName;
timer.textContent = '00';

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

const startTimer = () => {
    if (timerStarted) {
        return;
    }

    timerStarted = true;

    loop = setInterval(() => {
        seconds++;
        timer.textContent = String(seconds).padStart(2, '0');
    }, 1000);
};

const checkEndGame = () => {
    if (matchedCards === characters.length * 2) {
        clearInterval(loop);

        setTimeout(() => {
            alert(
                `Parabéns, ${playerName}! Seu tempo foi de ${timer.textContent} segundos!`
            );
        }, 300);
    }
};

const checkCards = () => {
    const firstCharacter = firstCard.dataset.character;
    const secondCharacter = secondCard.dataset.character;

    lockBoard = true;

    if (firstCharacter === secondCharacter) {
        setTimeout(() => {
            firstCard.classList.add('disabled-card');
            secondCard.classList.add('disabled-card');

            matchedCards += 2;

            firstCard = null;
            secondCard = null;
            lockBoard = false;

            checkEndGame();
        }, 500);

        return;
    }

    setTimeout(() => {
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }, 1000);
};

const revealCard = (event) => {
    const card = event.currentTarget;

    if (
        lockBoard ||
        card.classList.contains('reveal-card') ||
        card.classList.contains('disabled-card')
    ) {
        return;
    }

    startTimer();

    card.classList.add('reveal-card');

    if (firstCard === null) {
        firstCard = card;
        return;
    }

    secondCard = card;

    checkCards();
};

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    const image = document.createElement('img');

    image.src = character;
    image.alt = '';
    image.className = 'card-image';
    image.draggable = false;

    image.onerror = () => {
        console.error(`Erro ao carregar a imagem: ${image.src}`);
    };

    front.appendChild(image);

    card.dataset.character = character;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    return card;
};

const loadGame = () => {
    grid.innerHTML = '';

    const duplicateCharacters = [
        ...characters,
        ...characters
    ];

    const shuffledArray = duplicateCharacters.sort(
        () => Math.random() - 0.5
    );

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

loadGame();