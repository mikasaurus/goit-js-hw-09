import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button');
const valueField = document.querySelectorAll('.value');
let ms = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = options.defaultDate.getTime();
    const selectedDate = selectedDates[0].getTime();
    if (currentDate > selectedDate) {
      startButton.disabled = true;
    }
    if (currentDate > selectedDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
      ms = selectedDate - currentDate;
    }
  },
};

const calendar = flatpickr(dateInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  setInterval(() => {
    let value = convertMs(ms);
    ms -= 1000;
    valueField[0].innerHTML = `${value.days}`.padStart(2, '0');
    valueField[1].innerHTML = `${value.hours}`.padStart(2, '0');
    valueField[2].innerHTML = `${value.minutes}`.padStart(2, '0');
    valueField[3].innerHTML = `${value.seconds}`.padStart(2, '0');
    if (ms < 0) {
      valueField[0].innerHTML = '00';
      valueField[1].innerHTML = '00';
      valueField[2].innerHTML = '00';
      valueField[3].innerHTML = '00';
    }
  }, 1000);
};

startButton.addEventListener('click', addLeadingZero);
