// you want to have these flash at different sequences
// maybe an array of these panels and step through with interval
// when array done allow user to click

//grabbing panels
const topLeftPanel = document.querySelector('.top-left-panel');
const topRightPanel = document.querySelector('.top-right-panel');
const bottomLeftPanel = document.querySelector('.bottom-left-panel');
const bottomRightPanel = document.querySelector('.bottom-right-panel');

// function that select through panels randomly
//game play

const getRandomPanel = () => {
	const panels = [
		topRightPanel,
		topLeftPanel,
		bottomRightPanel,
		bottomLeftPanel,
	];
	// getting the length of panels 4, then pick random index of that of (0 to 3)
	// then parseInt it so it wont give bad math/ converts string to whole number/
	return panels[parseInt(Math.random() * panels.length)];
};

// want sequence of panels in array
const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];
//clone of sequence

// flashing function for panel
// code will resolve after a certain amount of time, use promise to wrap timeouts to wait for something to happen
// using promise resolve method to return promise that is resolved with given value

const flash = (panel) => {
	return new Promise((resolve, reject) => {
		//inside the promise you want panel to turn white // targeting css .active
		panel.className += ' active';
		//using set timeout to allow a function once after the interval of time
		setTimeout(() => {
			//inside time out get rid of active, when time out is done
			panel.className = panel.className.replace(' active', '');

			// set another time out to wait incase a duplicate color is selected
			setTimeout(() => {
				// the promise fulfilled
				resolve();
			}, 250);
		}, 1000);
	});
};

let score = 0;
let canClick = false;
// to see which panel is getting clicked on
const panelClicked = (panel) => {
	// if canClick is false return callback
	// so user cant click while panels are flashing
	if (!canClick) return;
	console.log(panel);

	const expectedPanel = sequenceToGuess.shift();
	if (expectedPanel === panel) {
		//check if the game is over
		if (sequenceToGuess.length === 0) {
			// start new round
			score++;
			scoreDisplay.innerHTML = score;
			sequence.push(getRandomPanel());
			sequenceToGuess = [...sequence];
			// call startFlashing when starting a new round
			startFlashing();
		}
	} else {
		// end game
		alert('game over');
	}
};

// building async function that self executes
// inside the startFlashing , calling the flash of the different panels
const startFlashing = async () => {
	canClick = false;

	//loop through the sequence of panels
	for (const panel of sequence) {
		// used await since I don't want all the panel to flash at the same time
		await flash(panel);
	}
	//until all the panels are done flashing then user can click
	canClick = true;
};

// prevents you from clicking until flash sequence ends
startFlashing();

// reset the game
const reset = document.querySelector('.reset');
reset.addEventListener('click', onReset);
function onReset() {
	location.reload();
}

//------------------------------------------------------------------------------------
// How To play button
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
	modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};

//-----------------------------------------------------------------------------------
//Bonus - Tracking points/score
const scoreDisplay = document.querySelector('.score');
