/* eslint-disable no-eval */

const CallByMeaning = require('@cbmjs/cbm-api');

const cbm = new CallByMeaning(process.env.HOST);

async function clock() {
  const result = await cbm.ask('A function that returns the current time.');
  const getTime = eval(await cbm.getCode(result.body[1].function));
  const time = getTime();
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor((time / 1000) / 60) % 60;
  const hours = (Math.floor((time / 1000) / 60 / 60) % 24) + 3; // + 2 (or 3) for local time
  return { seconds, minutes, hours };
}

module.exports = clock;
