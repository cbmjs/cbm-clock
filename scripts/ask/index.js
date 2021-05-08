import CallByMeaning from "@cbmjs/cbm-api";
import requireFromString from "require-from-string";

const cbm = new CallByMeaning(process.env.HOST);

export default async function clock() {
	const result = await cbm.ask("A function that returns the current time.");
	const getTime = requireFromString(await cbm.getCode(result.body[1].function));
	const time = getTime();
	const seconds = Math.floor(time / 1000) % 60;
	const minutes = Math.floor(time / 1000 / 60) % 60;
	const hours = (Math.floor(time / 1000 / 60 / 60) % 24) + 2; // + 2 for local time
	return { seconds, minutes, hours };
}
