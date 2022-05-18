const date = new Date('May 30, 2023 2:17:00').getTime();

const timeTypes = [
  {
    type: 'Days',
    value: '0',
    element: new Object(),
    update: time => Math.floor(time / (1000 * 60 * 60 * 24))
  },
  {
    type: 'Hours',
    value: '0',
    element: new Object(),
    update: time => Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  },
  {
    type: 'Minutes',
    value: '0',
    element: new Object(),
    update: time => Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
  },
  {
    type: 'Seconds',
    value: '0',
    element: new Object(),
    update: time => Math.floor((time % (1000 * 60)) / 1000)
  }
];

const countdownContainer = document.querySelector('.timer-container');
const fragment = document.createDocumentFragment();

timeTypes.forEach(({ type, value }, index) => {
  let timerItems = document.createElement('div');
  timerItems.classList = `timer-items ${type.toLowerCase()}`;
  timerItems.innerHTML = `<span class="time-value">${value}</span> <span class="time-type">${type}</span>`;

  timeTypes[index].element = timerItems;
  fragment.appendChild(timerItems);
});
countdownContainer.appendChild(fragment);

const updateTimer = setInterval(() => {
  const now = new Date().getTime();
  let timeLeft = date - now;

  timeTypes.forEach(({ element, update }) => appendTextToElement(element.children[0], update(timeLeft)));

  if (timeLeft <= 0) {
    clearInterval(updateTimer);
    timeTypes.forEach(({ element, value }) => appendTextToElement(element.children[0], value));
  }
}, 1000);

const appendTextToElement = (element, text) => (element.innerHTML = text);
