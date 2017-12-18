/* eslint-disable no-bitwise */

const CallByMeaning = require('cbm-api'); // eslint-disable-line

const cbm = new CallByMeaning();

async function clock() {
  const secondsUNIX = (await cbm.call('time', 'seconds')).body;
  const minutesUNIX = (await cbm.call('time', 'minutes')).body;
  const hoursUNIX = (await cbm.call('time', 'hours')).body;

  const seconds = ~~secondsUNIX % 60;
  const minutes = ~~minutesUNIX % 60;
  const hours = (~~hoursUNIX % 24) + 2; // + 2 for local time
  return { seconds, minutes, hours };
}

module.exports = clock;
