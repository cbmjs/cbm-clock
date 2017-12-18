/* eslint-disable no-bitwise */

const CallByMeaning = require('cbm-api'); // eslint-disable-line

const cbm = new CallByMeaning();

async function clock() {
  let time = await cbm.call({ outputNodes: 'time', outputUnits: 'milliseconds' }); time = time.body;
  const seconds = ~~(time / 1000) % 60;
  const minutes = ~~((time / 1000) / 60) % 60;
  const hours = (~~((time / 1000) / 60 / 60) % 24) + 2; // + 2 for local time
  return { seconds, minutes, hours };
}

module.exports = clock;
