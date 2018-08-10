// stores first element matching '.deck' into a constant
const cardsDeck = document.querySelector('.deck');

// creates array from nodelist of all child li elements of deck class
const cardsArray = [...document.querySelectorAll('.deck li')];

let openCards = [];
let matchedCards = [];

function displayCards() {
	
	// shuffles cards and stores them in a document fragment
	const frag = document.createDocumentFragment();
	shuffle(cardsArray).forEach(function (card) {
		frag.appendChild(card);
	});
	
	// appends the fragment (shuffled cards) to the deck 
	cardsDeck.appendChild(frag);

	// hides all cards and starts timer after a 4 second sneak-peek
	setTimeout(function () {
		cardsArray.forEach(function (card) {
			card.classList.toggle('open');
		});
		timeStart();
	}, 4000);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// listens for clicks on child 'li' elements (cards) of 'deck' class that have class of 'card'
cardsDeck.addEventListener('click', function (card) {
	const clickedCard = card.target;
	if (
		clickedCard.classList.contains('card') &&
		openCards.length < 2 &&
		!openCards.includes(clickedCard) &&
		!matchedCards.includes(clickedCard) &&
		starCounter > 0
	) {
		toggleOpen(clickedCard);
		addToOpenCards(clickedCard);
		if (openCards.length == 2) {
			movesUp();
			checkCards();
		}
	}
});

function toggleOpen(clickedCard) {
	clickedCard.classList.toggle('open');
}

function toggleMatch(clickedCard) {
	clickedCard.classList.toggle('open');
	clickedCard.classList.toggle('match');
}

const resetButton = document.querySelector('.fa-repeat');
resetButton.addEventListener('click', function () {
	resetGame();
});

function resetGame() {
	location.reload();
}

function addToOpenCards(clickedCard) {
	openCards.push(clickedCard);
}

function addToMatchedCards(clickedCard) {
	matchedCards.push(clickedCard);

	// checks for game win
	if (matchedCards.length == 16) {
		timeStop();
		setTimeout(gameWonModal, 100);
	}
}

function checkCards() {
	if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
		openCards.forEach(function (clickedCard) {
			addToMatchedCards(clickedCard);
			toggleMatch(clickedCard);
		});
		openCards = [];
	} else {
		setTimeout(function () {
			hideOpenCards();
		}, 500);
		starDown();
	}
}

function hideOpenCards() {
	openCards.forEach(function (clickedCard) {
		toggleOpen(clickedCard);
	});
	openCards = [];
}

let moves = 0;
const movesDisplay = document.querySelector('.moves');
movesDisplay.textContent = moves + ' Moves';

function movesUp() {
	moves++;
	if (moves == 1) {
		movesDisplay.textContent = moves + ' Move';
	} else {
		movesDisplay.textContent = moves + ' Moves';
	}
}

const starDisplay = document.querySelector('.stars');
let starCounter = 10;

function starDown() {
	starCounter--;

	// removes a star every 2 mismatches
	if (starCounter % 2 !== 1) {
		starDisplay.firstElementChild.remove();
	}

	// checks for game loss
	if (starCounter == 0) {
		timeStop();
		setTimeout(gameLostModal, 100);
	}
}

let totalSeconds = 0;
let timeInterval;

function timeStart() {
	timeInterval = setInterval(function () {
		totalSeconds++;
		displayTime();
	}, 1000);
}

function timeStop() {
	clearInterval(timeInterval);
}

let seconds = Math.floor(totalSeconds % 60);
let minutes = Math.floor(totalSeconds / 60);
const timeDisplay = document.querySelector('.time');
timeDisplay.innerHTML = `Time ${minutes}:0${seconds}`;

function displayTime() {
	seconds = totalSeconds % 60;
	minutes = parseInt(totalSeconds / 60);
	if (seconds < 10) {
		timeDisplay.innerHTML = `Time ${minutes}:0${seconds}`;
	} else {
		timeDisplay.innerHTML = `Time ${minutes}:${seconds}`;
	}
}

let modalStars;
let modalTime;

function gameWonModal() {
	if (seconds < 10) {
		modalTime = `${minutes}:0${seconds}`;
	} else {
		modalTime = `${minutes}:${seconds}`;
	}
	if (starDisplay.childElementCount == 1) {
		modalStars = `${starDisplay.childElementCount} star`;
	} else {
		modalStars = `${starDisplay.childElementCount} stars`;
	}
	const modalDisplay = `You've won! You finished with ${modalStars} in ${modalTime}. Do you want to play again?`;
	alert(modalDisplay);
	resetGame();
}

function gameLostModal() {
	const modal = `You've lost. Do you want to try again?`;
	alert(modal);
	resetGame();
}

// game init
displayCards();