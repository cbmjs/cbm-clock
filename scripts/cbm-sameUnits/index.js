const CallByMeaning = require('@cbmjs/cbm-api');


const cbm = new CallByMeaning(process.env.HOST);

async function clock() {
	let time = await cbm.call({ outputConcepts: 'time', outputUnits: 'milliseconds' }); time = time.body;
	const seconds = Math.floor(time / 1000) % 60;
	const minutes = Math.floor((time / 1000) / 60) % 60;
	const hours = (Math.floor((time / 1000) / 60 / 60) % 24) + 3; // + 2 (or 3) for local time
	return { seconds, minutes, hours };
}

module.exports = clock;
