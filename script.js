const parrotImages = [
  'bobrossparrot.gif',
  'explodyparrot.gif',
  'fiestaparrot.gif',
  'metalparrot.gif',
  'revertitparrot.gif',
  'tripletsparrot.gif',
  'unicornparrot.gif'
];

let cards = [];
let flippedCards = [];
let moves = 0;
let pairsFound = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(image) {
  return `
    <div class="card" onclick="flipCard(this)">
      <div class="card-inner">
        <div class="card-front face">
          <img src="assets/back.png" alt="Back of card">
        </div>
        <div class="card-back face">
          <img src="assets/${image}" alt="Parrot">
        </div>
      </div>
    </div>`;
}

function initGame() {
  let numCards;
  do {
    numCards = parseInt(prompt("Com quantas cartas deseja jogar? (Escolha um número par de 4 a 14)"));
  } while (isNaN(numCards) || numCards % 2 !== 0 || numCards < 4 || numCards > 14);

  const selectedImages = shuffle(parrotImages).slice(0, numCards / 2);
  cards = shuffle([...selectedImages, ...selectedImages]);

  const gameBoard = document.querySelector('.game-board');
  gameBoard.innerHTML = cards.map(createCard).join('');
}

function flipCard(card) {
  if (card.classList.contains('flip') || flippedCards.length === 2) return;

  card.classList.add('flip');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  moves++;
  const [firstCard, secondCard] = flippedCards;
  const firstImage = firstCard.querySelector('.card-back img').src;
  const secondImage = secondCard.querySelector('.card-back img').src;

  if (firstImage === secondImage) {
    pairsFound++;
    flippedCards = [];
    if (pairsFound === cards.length / 2) {
      setTimeout(() => alert(`Você ganhou em ${moves} jogadas!`), 500);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      flippedCards = [];
    }, 1000);
  }
}

window.onload = initGame;
