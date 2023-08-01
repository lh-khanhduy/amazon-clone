//make the clock running

const clockRunningInterval = setInterval(() => {
	//Get time information
	let currentDate = new Date();
	let hour = currentDate.getHours();
	let minute = currentDate.getMinutes();
	let second = currentDate.getSeconds();

	//update on clock
	document.querySelector('.hours').innerHTML = displayTwoDigitNumber(hour);
	document.querySelector('.minutes').innerHTML = displayTwoDigitNumber(minute);
	document.querySelector('.seconds').innerHTML = displayTwoDigitNumber(second);
}, 1000);

function displayTwoDigitNumber(number) {
	return number.toString().padStart(2, '0');
}
