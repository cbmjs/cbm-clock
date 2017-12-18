/* eslint-disable no-bitwise */

function clock() {
  const time = new Date().getTime();
  const seconds = ~~(time / 1000) % 60;
  const minutes = ~~((time / 1000) / 60) % 60;
  const hours = (~~((time / 1000) / 60 / 60) % 24) + 2; // + 2 for local time
  return { seconds, minutes, hours };
}

module.exports = clock;
