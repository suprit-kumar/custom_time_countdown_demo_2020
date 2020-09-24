const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownform');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span')

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeElBtn = document.getElementById('complete-button');


let countDownTitle='';
let countDownDate='';
let countDownValue= new Date();
let countDownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24 ;

// Set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

// populate countdown / Complete UI
function updateDom(){
    countDownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownValue - now;
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide input
        inputContainer.hidden = true;
        // If countdown has ended show complete
        if (distance < 0){
            countdownEl.hidden = true;
            clearInterval(countDownActive);
            completeElInfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
            completeEl.hidden = false;
        }else{
            // show the countdown in progress
                // Populate countdown 
            countdownElTitle.textContent = `${countDownTitle}`
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    },second);
}


// Takes values from Form input
function updateCountdown(e){
    e.preventDefault();
    countDownTitle=e.srcElement[0].value;
    countDownDate=e.srcElement[1].value;
    savedCountdown={
        title:countDownTitle,
        date:countDownDate
    }

    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    // Check for valid date 
    if(countDownDate === ''){
        alert('Please select a date for the countdown');
    }else{
        countDownValue = new Date(countDownDate).getTime();
        updateDom();
    }
}

// Reset all values
function reset(){
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false ;
    // Stop countdown
    clearInterval(countDownActive);
    // Reset values
    countDownTitle = '';
    countDownDate = '';
    localStorage.removeItem('countdown');
}



function restorePreviousCountdown(){
    // get countdown value from local storage if available
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countDownTitle = savedCountdown.title;
        countDownDate = savedCountdown.date;
        countDownValue = new Date(countDownDate).getTime();
        updateDom();
    }
}


// Event listners
countdownForm.addEventListener('submit',updateCountdown);
countdownButton.addEventListener('click',reset);
completeElBtn.addEventListener('click',reset);

// On load check local storage
restorePreviousCountdown();