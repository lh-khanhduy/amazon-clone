let score = JSON.parse(localStorage.getItem('score')) || {
	wins: 0,
	losses: 0,
	ties: 0,
};

updateScore();

// onclick, onkeydown interactive

document.querySelector('.js-rock-btn').addEventListener('click', () => {
	playGame('rock');
});

document.querySelector('.js-paper-btn').addEventListener('click', () => {
	playGame('paper');
});

document.querySelector('.js-scissors-btn').addEventListener('click', () => {
	playGame('scissors');
});

document.querySelector('.js-reset-btn').addEventListener('click', () => {
	showResetConfirmation();
});

document.querySelector('.js-autoplay-btn').addEventListener('click', () => {
	autoPlay();
});

document.body.addEventListener('keydown', (event) => {
	if (event.key === 'r') {
		playGame('rock');
	} else if (event.key === 'p') {
		playGame('paper');
	} else if (event.key === 's') {
		playGame('scissors');
	}
});

document.body.addEventListener('keydown', (event) => {
	if (event.key === 'a') {
		autoPlay();
	}
});

document.body.addEventListener('keydown', (event) => {
	if (event.key === 'Backspace') {
		showResetConfirmation();
	}
});

// function

function pickComputerMove() {
	const randomNumber = Math.random();

	let computerMove = '';

	if (randomNumber >= 0 && randomNumber < 1 / 3) {
		computerMove = 'rock';
	} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
		computerMove = 'paper';
	} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
		computerMove = 'scissors';
	}

	return computerMove;
}

function playGame(playerMove) {
	const computerMove = pickComputerMove();

	let result = '';

	//play
	if (playerMove === 'scissors') {
		if (computerMove === 'rock') {
			result = 'You lose.';
		} else if (computerMove === 'paper') {
			result = 'You win.';
		} else if (computerMove === 'scissors') {
			result = 'Tie.';
		}
	} else if (playerMove === 'paper') {
		if (computerMove === 'rock') {
			result = 'You win.';
		} else if (computerMove === 'paper') {
			result = 'Tie.';
		} else if (computerMove === 'scissors') {
			result = 'You lose.';
		}
	} else if (playerMove === 'rock') {
		if (computerMove === 'rock') {
			result = 'Tie.';
		} else if (computerMove === 'paper') {
			result = 'You lose.';
		} else if (computerMove === 'scissors') {
			result = 'You win.';
		}
	}

	//update score after round
	if (result === 'You win.') {
		score.wins += 1;
	} else if (result === 'You lose.') {
		score.losses += 1;
	} else if (result === 'Tie.') {
		score.ties += 1;
	}

	localStorage.setItem('score', JSON.stringify(score));

	//display round result
	document.querySelector('.round-result').innerHTML = `${result} <br> You ${convertMoveToSymbol(
		playerMove
	)} - ${convertMoveToSymbol(computerMove)} Computer`;

	updateScore();
}

function convertMoveToSymbol(move) {
	if (move === 'rock') {
		return '✊';
	} else if (move === 'paper') {
		return '🖐️';
	} else if (move === 'scissors') {
		return '✌️';
	}
}

function updateScore() {
	document.querySelector(
		'.result-inform'
	).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
	score.wins = 0;
	score.losses = 0;
	score.ties = 0;
	localStorage.removeItem('score');
	document.querySelector('.round-result').innerHTML = '';
	updateScore();
}

function showResetConfirmation() {
	document.querySelector('.js-reset-confirmation-inform').innerHTML = `
		Are you sure you want to reset the score?
		<button class="js-reset-confirm-yes reset-confirm-button">
		  Yes
		</button>
		<button class="js-reset-confirm-no reset-confirm-button">
		  No
		</button>
	  `;

	document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
		resetScore();
		hideResetConfirmation();
	});

	document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
		hideResetConfirmation();
	});
}

function hideResetConfirmation() {
	document.querySelector('.js-reset-confirmation-inform').innerHTML = '';
}

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
	if (!isAutoPlaying) {
		intervalID = setInterval(() => {
			playGame(pickComputerMove());
		}, 1000);
		isAutoPlaying = true;
		document.querySelector('.autoplay-btn').innerHTML = 'Stop Playing';
	} else {
		clearInterval(intervalID);
		isAutoPlaying = false;
		document.querySelector('.autoplay-btn').innerHTML = 'Autoplay';
	}
}
