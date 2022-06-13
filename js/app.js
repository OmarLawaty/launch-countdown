const getFirstDayOfNextMonth = () => {
  const date = new Date();

  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

const updateDate = () => {
  const date = new Date(getFirstDayOfNextMonth()).getTime();

  return date;
};

const timeTypes = [
  {
    type: 'Days',
    value: '0',
    element: new Object(),
    updateTo: time => Math.floor(time / (1000 * 60 * 60 * 24)),
    updateFrom: time => time * (1000 * 60 * 60 * 24)
  },
  {
    type: 'Hours',
    value: '0',
    element: new Object(),
    updateTo: time => Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    updateFrom: time => time * 3600000
  },
  {
    type: 'Minutes',
    value: '0',
    element: new Object(),
    updateTo: time => Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
    updateFrom: time => time * 60000
  },
  {
    type: 'Seconds',
    value: '0',
    element: new Object(),
    updateTo: time => Math.floor((time % (1000 * 60)) / 1000),
    updateFrom: time => time * 1000
  }
];

const countdownContainer = document.querySelector('.timer-container');
const fragment = document.createDocumentFragment();

timeTypes.forEach(({ type, value }, index) => {
  let timerItems = document.createElement('div');
  timerItems.classList = `timer-items ${type.toLowerCase()}`;
  timerItems.innerHTML = `
  <div class="time-value">
    <div class="next-number">${value}</div>
    <div class="current-number">${value}</div>
      <div class="new-values">
        <div class="upper-value" >${value}</div>
        <div class="bottom-value" >${value}</div>
      </div>
    <hr class="split-line">
  </div>
  <div class="time-type">${type}</div>`;

  timeTypes[index].element = timerItems;

  fragment.appendChild(timerItems);
});

countdownContainer.appendChild(fragment);

const updateTimer = setInterval(() => {
  const now = new Date().getTime();
  let timeLeft = updateDate() - now;

  timeTypes.forEach(({ element, updateTo, updateFrom }) => {
    element = element.children[0].children[1];

    if (checkSameState(Number(element.innerHTML), updateTo(timeLeft))) return;

    flip(element);

    setTimeout(() => appendTextToElement(element, updateTo(timeLeft), updateTo(timeLeft - updateFrom(1))), 500);
  });
}, 1000);

const appendTextToElement = (element, text, nextValue) => {
  element.parentElement.children[0].innerHTML = nextValue;
  element.parentElement.children[2].children[1].innerHTML = nextValue;
  element.parentElement.children[2].children[0].innerHTML = text;
  element.parentElement.children[1].innerHTML = text;
};

const flip = element => {
  element.parentElement.classList.add('flip');
  setTimeout(() => {
    element.parentElement.classList.remove('flip');
  }, 500);
};

const checkSameState = (currentValue, nextValue) => {
  if (currentValue === nextValue) {
    return true;
  }

  return false;
};
