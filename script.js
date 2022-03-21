const startOverBtn = document.querySelector('#start-over');
let h2El = document.querySelector('h2');
let h3El = document.querySelector('h3');
const gameContainer = document.querySelector('#game-container');
const faceUpCard = Array.from(document.querySelectorAll('.front-card'));
const faceDownCard = Array.from(document.querySelectorAll('.back-card'));
const cards = Array.from(document.querySelectorAll('.card')); // turns all cards into array
// const imageCard = Array.from(document.querySelectorAll('.front-card').getAttribute('src'));
let countdownEl = document.querySelector('#countdown')
const startingMinutes = 2;
let time = startingMinutes * 60; // 60 cos want all the seconds ( = 120)
let cardToCheck = 0; 
let firstCard; 
let secondCard;
let intervalId; //setInterval always has an id
let matchedCards = [];

//event listeners

startOverBtn.addEventListener('click', init)

//_______________________________________________________________________________

//functions
function init(e) {
    shuffleCards();
    resetTimer();
    resetCards();
    resetTitle();
    cardToCheck = 0; 
    matchedCards = [];
}
init();

function initTimer (){
    let minutes = Math.floor(time /60); // 120/60 = 2 & math.floor or else 1.51666:59
    let seconds = time % 60; //all seconds remaining after division of 120/60
    if (seconds < 10){
        countdownEl.innerHTML = `${minutes}:0${seconds}` //or else would be 2:0 instead of 2:00
    } else {
        countdownEl.innerHTML = `${minutes}:${seconds}`
    }
    if(time > 0){ //will stop time once hits 0:00
    time --; 
    } else {
        clearInterval(intervalId);
        gameOver();
    }
}

function flipCard(e) {
    if (e.target.className === 'front-card') { 
        e.target.style.opacity = '1';
        //only trigger timer when initial back card is clicked
        if (!intervalId) { //if not defined will start timer, i.e. only first card will start timer
            intervalId = setInterval(initTimer, 10);
        }
    } else {
        return
    }
};

cards.forEach(function(card){
    addEventListener('click', flipCard);
});


function shuffleCards () {
    for (let i=0; i<cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        cards[i].style.order = randomIndex; //.order specifies order of elements
    }
}

cards.forEach(function(card){
    card.addEventListener('click', (e) => {
        if (cardToCheck === 0) {
        firstCard = e.target.getAttribute('alt') // img alt attribute in html
        cardToCheck++;
        } else {
        secondCard = e.target.getAttribute('alt');
        cardToCheck = 0; //
        }
        console.log(firstCard);
        console.log(secondCard);
        if (firstCard === secondCard){
            console.log('It\'s a match')

        } else if (firstCard !== secondCard){
            console.log('Not a match');
            e.target.style.opacity = '0';
        }
    })
});

// function checkMatch () {
//     if (firstCard === secondCard){
//         console.log('It\'s a match')
//     } else {
//         console.log('Not a match');
//     }
// }

// function checkMatch(){

// }


function checkWinner(){ 
    if (matchedCards === cards.length){
        clearInterval(intervalId); 
        h2El.innerText = 'CONGRATULATIONS! YOU FOUND EVERYONE!'
        h3El.innerText = 'PRESS \'START OVER\' TO PLAY AGAIN.'
    }
}


function gameOver (){
    h2El.innerText = 'SORRY, YOU RAN OUT OF TIME. YOU LOSE.'
    h3El.innerText = 'PRESS \'START OVER\' TO PLAY AGAIN.'
}

function resetTimer (){ 
    time = 120;
    countdownEl.innerText = '2:00'
    clearInterval(intervalId);
    intervalId = undefined;
}

function resetTitle (){ 
    h2El.innerText = 'CLICK ON ANY CARD TO START THE GAME';
    h3El.innerText = 'CAN YOU MATCH ALL OF YOUR FAVORITE CHARACTERS BEFORE TIME RUNS OUT?';

}

function resetCards(){
    faceUpCard.forEach(function(card){ //forEach cos an array
        card.style.opacity = '0';
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
