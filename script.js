const startOverBtn = document.querySelector('#start-over');
const h2El = document.querySelector('h2');
const h3El = document.querySelector('h3');
const gameContainer = document.querySelector('#game-container');
const faceUpCard = document.querySelectorAll('.front-card')
const faceDownCard = document.querySelectorAll('.back-card')
const cards = Array.from(document.querySelectorAll('.card')); // turns all cards into array
let countdownEl = document.querySelector('#countdown')
const startingMinutes = 2;
let time = startingMinutes * 60; // 60 cos want all the seconds ( = 120)
let cardPicked;
let firstPick; 
let secondPick;
let intervalId; //setInterval always has an id

//event listeners

startOverBtn.addEventListener('click', init)

//_______________________________________________________________________________

//functions
function initTimer (){
    const minutes = Math.floor(time /60); // 120/60 = 2
    let seconds = time % 60; //all seconds remaining after division of 120/60
    if (seconds < 10){
        countdownEl.innerHTML = `${minutes}:0${seconds}` //adds 0 to the end or else would be 2:0 instead of 2:00
    } else {
        countdownEl.innerHTML = `${minutes}:${seconds}`
    }
    if(time > 0){ //will stop time once hits 0:00
    time --; 
    } else {
        clearInterval(intervalId);
    }
}

function flipCard(e) {
    if (e.target.className === 'back-card') { //everything disappears
        e.target.style.opacity = '0';
        //only trigger timer when back card is clicked
        if (!intervalId) { //if not defined will start timer, i.e. only first card will start timer
            intervalId = setInterval(initTimer, 1000);
        }
    } else {
        return
    }
};

cards.forEach(function(card){
    addEventListener('click', flipCard);
});

function init(e) {
    shuffleCards();
    resetTimer();
    resetCards();
}
init();

function shuffleCards () {
    for (let i=0; i<cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        cards[i].style.order = randomIndex; //order specifies order of elements
    }
}

function resetTimer (){ 
    time = 120;
    countdownEl.innerText = '2:00'
    clearInterval(intervalId);
    intervalId = undefined;
}

function resetCards(){
    faceDownCard.forEach(function(card){ //forEach cos an array
        card.style.opacity = '1';
    });
}


// function stopTimer (){
// clearTimeout(intervalId);
// } 

//function startGame(){
// setInteral(initTimer,1000)
// checkMatch()
// more functions etc etc ????????????????
// }

// function startTimer() 
// //starts timer on click of first card



// //flips card over 
// //only 2 can be flipped at a time

// function flipBack () 
// //flip card back over if no match


// function checkMatch() 
// //checks for match
// //if match --> disableCards()
// // else --> flipBack()

//function disableCards()
// //disables ability to click 
// // removes faceDownCard

// //function checkWinner()
// //if all cards are facing up within time say Congrats!

// function displayLoser ()
// //if timer runs out and still have cards left say Sorry you lose
