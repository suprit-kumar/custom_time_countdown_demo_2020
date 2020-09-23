const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownform');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span')

let countDownTitle='';
let countDownDate='';
let countDownValue=Date;
let countDownActive;


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

        // Populate countdown 
        countdownElTitle.textContent = `${countDownTitle}`
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        // Hide input 
        inputContainer.hidden = true ;
        // Show countdown
        countdownEl.hidden = false;
    },second);
}


// Takes values from Form input
function updateCountdown(e){
    e.preventDefault();
    countDownTitle=e.srcElement[0].value;
    countDownDate=e.srcElement[1].value;
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
    inputContainer.hidden = false ;
    // Stop countdown
    clearInterval(countDownActive);
    // Reset values
    countDownTitle = '';
    countDownDate = '';
}


// Event listners
countdownForm.addEventListener('submit',updateCountdown);
countdownButton.addEventListener('click',reset);