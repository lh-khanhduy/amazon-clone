//make the clock running
const initTime = new Date();
document.querySelector('.hours').innerHTML = displayTwoDigitNumber(initTime.getHours());
document.querySelector('.minutes').innerHTML = displayTwoDigitNumber(initTime.getMinutes());
document.querySelector('.seconds').innerHTML = displayTwoDigitNumber(initTime.getSeconds());
document.querySelector('.date').innerHTML = ` ${initTime.toLocaleString('default', {
	month: 'long',
})} ${initTime.getDate()}, ${initTime.getFullYear()}`;

const clockRunningInterval = setInterval(() => {
	//Get time information
	let currentDateTime = new Date();

	//update on clock
	document.querySelector('.hours').innerHTML = displayTwoDigitNumber(currentDateTime.getHours());
	document.querySelector('.minutes').innerHTML = displayTwoDigitNumber(
		currentDateTime.getMinutes()
	);
	document.querySelector('.seconds').innerHTML = displayTwoDigitNumber(
		currentDateTime.getSeconds()
	);
	document.querySelector('.date').innerHTML = ` ${currentDateTime.toLocaleString('default', {
		month: 'long',
	})} ${currentDateTime.getDate()}, ${currentDateTime.getFullYear()}`;
}, 1000);

function displayTwoDigitNumber(number) {
	return number.toString().padStart(2, '0');
}
