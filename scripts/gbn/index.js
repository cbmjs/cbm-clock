import CallByMeaning from "@cbmjs/cbm-api";
import requireFromString from "require-from-string";

const cbm = new CallByMeaning(process.env.HOST);

// Create a function in the server for future reference
// const params = {
// 	name: "getTime",
// 	desc: `Gets the timestamp of the number of milliseconds that have elapsed
//           since the Unix epoch(1 January 1970 00: 00: 00 UTC).`,
// 	returnsNames: "time",
// 	returnsUnits: "milliseconds",
// 	codeFile: path.join(path.dirname(url.fileURLToPath(import.meta.url)), "get-time.js"),
// };
// (async () => {
// 	const res = await cbm.create(params, "function");
// 	return res;
// })().then((res) => console.log(res));

export default async function clock() {
	const result = await cbm.lookup("getTime"); // **
	const getTime = requireFromString(await cbm.getCode(result.body.sourceCode));
	const time = getTime();
	const seconds = Math.floor(time / 1000) % 60;
	const minutes = Math.floor(time / 1000 / 60) % 60;
	const hours = (Math.floor(time / 1000 / 60 / 60) % 24) + 2; // + 2 for local time
	return { seconds, minutes, hours };
}

/*
{
  name: 'get-time',
  description: 'Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch.',
  units: undefined,
  argsNames: [],
  argsUnits: [],
  returnsNames: ['time'],
  returnsUnits: ['milliseconds'],
  sourceCode: 'getTime.js',
}
*/
