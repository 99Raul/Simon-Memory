// you want to have these flash at different sequences
// maybe an array of these panels and step through with interval
// when array done allow user to click

//grabbing panels
const topLeftPanel = document.querySelector('.top-left-panel');
const topRightPanel = document.querySelector('.top-right-panel');
const bottomLeftPanel = document.querySelector('.bottom-left-panel');
const bottomRightPanel = document.querySelector('.bottom-right-panel');

// want sequence
const sequence = [
	topLeftPanel,
	topRightPanel,
	bottomLeftPanel,
	bottomRightPanel,
];

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
			// the promise fulfilled
			resolve();
		}, 1000);
	});
};

// building async function that self executes
// inside the main , calling the flash of the different panels
const main = async () => {
	//loop through the sequence of panels
	for (const panel of sequence) {
		// used await since I don't want all the panel to flash at the same time
		await flash(panel);
	}
};

main();
