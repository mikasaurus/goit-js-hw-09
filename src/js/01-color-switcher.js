const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timer = null;

start.addEventListener('click', () => {
  if (
    (timer = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000))
  );
  start.disabled = true;
  stop.disabled = false;
});

stop.addEventListener('click', () => {
  clearInterval(timer);
  start.disabled = false;
  stop.disabled = true;
});
