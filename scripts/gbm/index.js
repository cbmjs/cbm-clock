/* eslint-disable no-eval */

const CallByMeaning = require('@cbmjs/cbm-api');

const cbm = new CallByMeaning(process.env.HOST);

async function clock() {
  const result = await cbm.search({ outputConcepts: 'time' }); // **
  const getTime = eval(await cbm.getCode(result.body[1].function));
  const time = getTime();
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor((time / 1000) / 60) % 60;
  const hours = (Math.floor((time / 1000) / 60 / 60) % 24) + 2; // + 2 for local time
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
