
const form = document.querySelector('.form');

const timeInput = document.querySelector('.time-input');

const format = document.querySelector("select[name='format']");

const setBtn = document.querySelector('.set-btn');

const countDown = document.querySelector('.countdown');

const stopBtn = document.querySelector('.stop-btn');

const resetBtn = document.querySelector('.reset-btn');




let countDownInterval;


let secondsLeftms;

let endTime;

let stopBtnClicked = false;



stopBtn.addEventListener('click', () => {

  stopBtnClicked = !stopBtnClicked;


  if (stopBtnClicked === true) {
   
    stopBtn.innerHTML = 'PLAY';
 
    resetBtn.disabled = false;
   
    clearInterval(countDownInterval);
  } else if (stopBtnClicked === false) {
  

    stopBtn.innerHTML = 'STOP';
  
    resetBtn.disabled = true;

    endTime = secondsLeftms + Date.now();

    countDownInterval = setInterval(() => {
      setCountDown(endTime);
    }, 1000);
  }
});



resetBtn.addEventListener('click', () => {
  resetCountDown();
});




form.addEventListener('submit', (event) => {

  event.preventDefault();


  let countDownTime = timeInput.value;


  if (countDownTime > 0) {
   
    if (format.value === 'hours') {
     
      
      countDownTime = countDownTime * 3600000;
    } else if (format.value === 'minutes') {
   
      countDownTime = countDownTime * 60000;
    } else if (format.value === 'seconds') {
     
      countDownTime = countDownTime * 1000;
    }

  
    const now = Date.now();
  
    endTime = now + countDownTime;

    setCountDown(endTime);

    countDownInterval = setInterval(() => {
      setCountDown(endTime);
    }, 1000);

 
    setBtn.disabled = true;

    stopBtn.disabled = false;
  }

});




const setCountDown = (endTime) => {
 
  secondsLeftms = endTime - Date.now();
  
  const secondsLeft = Math.round(secondsLeftms / 1000);

  let hours = Math.floor(secondsLeft / 3600);
  let minutes = Math.floor(secondsLeft / 60) - (hours * 60);
  let seconds = secondsLeft % 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (secondsLeft < 0) {
    resetCountDown();
    return;
  }


  countDown.innerHTML = `${hours} : ${minutes} : ${seconds}`;

};



const resetCountDown = () => {
  
  clearInterval(countDownInterval);
 
  countDown.innerHTML = '00 : 00 : 00';
 
  stopBtnClicked = false;
 
  stopBtn.innerHTML = 'STOP';


  setBtn.disabled = false;

  stopBtn.disabled = true;
  resetBtn.disabled = true;
};
