/* eslint-disable no-bitwise, no-eval */

const CallByMeaning = require('cbm-api'); // eslint-disable-line

const cbm = new CallByMeaning();

async function clock() {
  const result = await cbm.search({ outputNodes: 'time' }); // **
  const getTime = eval(cbm.getCode(result.body[1].function));
  const time = getTime();
  const seconds = ~~(time / 1000) % 60;
  const minutes = ~~((time / 1000) / 60) % 60;
  const hours = (~~((time / 1000) / 60 / 60) % 24) + 2; // + 2 for local time
  return { seconds, minutes, hours };
}

module.exports = clock;

// **
// [
//   {
//     'function': 'now.js',
//     'desc': 'Gets the timestamp of the number of seconds that have elapsed since the Unix epoch (1 January 1970 00:00:00 UTC).',
//   },
//   {
//     'function': 'getTime.js',
//     'desc': 'Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch(1 January 1970 00: 00: 00 UTC).',
//   },
// ];
