var milli = 0;
var seconds = 0;
var minutes = 0;
var onOff = 0;

var txtMilli = document.getElementById('txtMilli');
var txtSeconds = document.getElementById('txtSeconds');
var txtMinutes = document.getElementById('txtMinutes');

function startCounting() {
	if (milli > 999) {
		milli = 0;
		if (seconds < 60) {
			seconds += 1;
		}
	} else {
		milli += 1;
	}
	if (seconds > 59) {
		seconds = 0;
		minutes += 1;
	}

	if (milli > 10) {
		txtMilli.innerHTML = '0' + milli;
	}
	if (milli < 10) {
		txtMilli.innerHTML = '' + milli;
	}
}

function theTimer() {
	if (onOff == 0) {
		onOff = 1;
		timer = setInterval(startCounting, 1);
	} else if (onOff == 1) {
		onOff = 0;
		clearInterval(timer);
	}
}

myButton.onclick = theTimer;