// interactive
document.querySelector('.js-start-btn').addEventListener('click', () => {
	start();
});

document.querySelector('.js-stop-btn').addEventListener('click', () => {
	stop();
});

document.querySelector('.js-reset-btn').addEventListener('click', () => {
	reset();
});

// functional

let isRunning = false;
let time = parseInt(localStorage.getItem('time')) || 0;
let timerInterval;

function start() {
	if (!isRunning) {
		timerInterval = setInterval(() => {
			time++;
			localStorage.setItem('time', time.toString());
			let timerDisplay = convertTimeUnit(time);
			document.querySelector('.js-timer').innerHTML = `${displayTwoDigitNumber(
				timerDisplay.m
			)}:${displayTwoDigitNumber(timerDisplay.s)}`;
		}, 100);
	}
	isRunning = true;
}

function stop() {
	if (isRunning) {
		clearInterval(timerInterval);
		localStorage.removeItem('time');
	}
	isRunning = false;
}

function reset() {
	stop();
	time = 0;
	document.querySelector('.js-timer').innerHTML = '00:00';
}

function convertTimeUnit(seconds) {
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	return { m, s };
}

function displayTwoDigitNumber(number) {
	return number.toString().padStart(2, '0');
}
