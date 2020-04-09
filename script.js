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

const flash = (panel) => {
	return new Promise((resolve, reject) => {
		//inside the promise you want panel to turn white
		panel.className += ' active';
		//using set timeout to allow a function once after the interval of time
		setTimeout(() => {
			//inside time out get rid of active
			panel.className = panel.className.replace(' active');
			// the promise full filled
			resolve();
		}, 500);
	});
};
