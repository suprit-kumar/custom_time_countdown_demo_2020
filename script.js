const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownform');
const dateEl = document.getElementById('date-picker');

let countDownTitle='';
let countDownDate='';

// Set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

// Takes values from Form input
function updateCountdown(e){
    e.preventDefault();
    countDownTitle=e.srcElement[0].value;
    countDownDate=e.srcElement[1].value;
    console.log(countDownTitle,countDownDate);
}

// Event listners
countdownForm.addEventListener('submit',updateCountdown);