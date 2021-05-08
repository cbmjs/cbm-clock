import CallByMeaning from "@cbmjs/cbm-api";

const cbm = new CallByMeaning(process.env.HOST);

export default async function clock() {
	let time = await cbm.call({
		outputConcepts: "time",
		outputUnits: "milliseconds",
	});
	time = time.body;
	const seconds = Math.floor(time / 1000) % 60;
	const minutes = Math.floor(time / 1000 / 60) % 60;
	const hours = (Math.floor(time / 1000 / 60 / 60) % 24) + 2; // + 2 for local time
	return { seconds, minutes, hours };
}
