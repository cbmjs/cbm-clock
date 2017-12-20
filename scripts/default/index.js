function clock() {
  const time = new Date().getTime();
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor((time / 1000) / 60) % 60;
  const hours = (Math.floor((time / 1000) / 60 / 60) % 24) + 2; // + 2 for local time
  return { seconds, minutes, hours };
}

module.exports = clock;
