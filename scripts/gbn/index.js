/* eslint-disable no-bitwise, no-eval */

const CallByMeaning = require('cbm-api'); // eslint-disable-line

const cbm = new CallByMeaning();

// Create a function in the server for future reference
// const params = {
//   name: 'getTime',
//   desc: 'Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch(1 January 1970 00: 00: 00 UTC).',
//   returnsNames: 'time',
//   returnsUnits: 'milliseconds',
//   codeFile: __dirname.concat('/getTime.js'),
// };
// (async () => {
//   const res = await cbm.create(params, 'function');
//   return res;
// })().then(res => console.log(res));

async function clock() {
  const result = await cbm.lookup('getTime'); // **
  const getTime = eval(cbm.getCode(result.body.sourceCode));
  const time = getTime();
  const seconds = ~~(time / 1000) % 60;
  const minutes = ~~((time / 1000) / 60) % 60;
  const hours = (~~((time / 1000) / 60 / 60) % 24) + 2; // + 2 for local time
  return { seconds, minutes, hours };
}

module.exports = clock;

// **
// {
//   name: 'getTime',
//   description: 'Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch(1 January 1970 00: 00: 00 UTC).',
//   units: undefined,
//   argsNames: [],
//   argsUnits: [],
//   returnsNames: ['time'],
//   returnsUnits: ['milliseconds'],
//   sourceCode: 'getTime.js',
// }
