import CallByMeaning from "@cbmjs/cbm-api";

const cbm = new CallByMeaning(process.env.HOST);

export default async function clock() {
	const secondsUNIX = (await cbm.call("time", "seconds")).body;
	const minutesUNIX = (await cbm.call("time", "minutes")).body;
	const hoursUNIX = (await cbm.call("time", "hours")).body;

	const seconds = Math.floor(secondsUNIX) % 60;
	const minutes = Math.floor(minutesUNIX) % 60;
	const hours = (Math.floor(hoursUNIX) % 24) + 2; // + 2 for local time
	return { seconds, minutes, hours };
}
