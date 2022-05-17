const daysLeft = document.querySelector('.timer-items.days .time-value');
const hoursLeft = document.querySelector('.timer-items.hours .time-value');
const minutesLeft = document.querySelector('.timer-items.minutes .time-value');
const secondsLeft = document.querySelector('.timer-items.seconds .time-value');

const date = new Date('Jul 25, 2022 16:37:52').getTime();

const updateTimer = setInterval(() => {
  const now = new Date().getTime();
  let timeLeft = date - now;

  daysLeft.innerHTML = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  hoursLeft.innerHTML = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutesLeft.innerHTML = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  secondsLeft.innerHTML = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (timeLeft < 0) {
    clearInterval(updateTimer);
    daysLeft.innerHTML = '0';
    hoursLeft.innerHTML = '0';
    minutesLeft.innerHTML = '0';
    secondsLeft.innerHTML = '0';
  }
}, 1000);
