import CallByMeaning from "@cbmjs/cbm-api";

const cbm = new CallByMeaning(process.env.HOST);

export default async function clock() {
	const { body: secondsUNIX } = await cbm.call("time", "seconds");
	const { body: minutesUNIX } = await cbm.call("time", "minutes");
	const { body: hoursUNIX } = await cbm.call("time", "hours");

	const seconds = Math.floor(secondsUNIX) % 60;
	const minutes = Math.floor(minutesUNIX) % 60;
	const hours = (Math.floor(hoursUNIX) % 24) + 2; // + 2 for local time
	return { seconds, minutes, hours };
}
