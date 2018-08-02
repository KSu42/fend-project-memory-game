(function () {
	// DOM is ready
	console.log('bonjour');

	// stores first element matching '.deck' into a constant
	const cardsDeck = document.querySelector('.deck');

	// creates array from nodelist of all child li elements of deck class
	const cardsArray = [...document.querySelectorAll('.deck li')];

	/*
	 * Display the cards on the page
	 *   - shuffle the list of cards using the provided "shuffle" method below
	 *   - loop through each card and create its HTML
	 *   - add each card's HTML to the page
	 */

	function displayCards() {
		const frag = document.createDocumentFragment();
		shuffle(cardsArray).forEach(function (card) {
			frag.appendChild(card);
		});
		cardsDeck.appendChild(frag);
	}

	displayCards();

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

	/*
	 * set up the event listener for a card. If a card is clicked:
	 *  - display the card's symbol (put this functionality in another function that you call from this one)
	 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
	 *  - if the list already has another card, check to see if the two cards match
	 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
	 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
	 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
	 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
	 */

	// listens for clicks on child 'li' elements (cards) of 'deck' class that have class of 'card'
	cardsDeck.addEventListener('click', function (e) {
		if (e.target.classList.contains('card')) {

			// hides or displays clicked card
			toggleCards(e);
			console.log('card click');
		}
	});

	// toggles class of target card
	function toggleCards(e) {
		e.target.classList.toggle('open');
	}

	const resetButton = document.querySelector('.fa-repeat');
	resetButton.addEventListener('click', function () {
		location.reload();
	});
})();