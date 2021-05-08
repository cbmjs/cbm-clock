import CallByMeaning from "@cbmjs/cbm-api";
import requireFromString from "require-from-string";

const cbm = new CallByMeaning(process.env.HOST);

export default async function clock() {
	const result = await cbm.search({ outputConcepts: "time" }); // **
	const getTime = requireFromString(await cbm.getCode(result.body[1].function));
	const time = getTime();
	const seconds = Math.floor(time / 1000) % 60;
	const minutes = Math.floor(time / 1000 / 60) % 60;
	const hours = (Math.floor(time / 1000 / 60 / 60) % 24) + 2; // + 2 for local time
	return { seconds, minutes, hours };
}

/*
[
  {
    'function': 'now.js',
    'desc': 'Gets the timestamp of the number of seconds that have elapsed since the Unix epoch.',
  },
  {
    'function': 'getTime.js',
    'desc': 'Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch.',
  },
];
 */
