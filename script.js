const startOverBtn = document.querySelector('#start-over');
const h2El = document.querySelector('h2');
const h3El = document.querySelector('h3');
const gameContainer = document.querySelector('#game-container');
//do i select the class of the photo, or the actual img? i.e. imgs/bob.jpg
const faceUpCard = document.querySelectorAll('.front-card') //should these be an array?
const faceDownCard = document.querySelectorAll('.back-card')
const cards = Array.from(document.querySelectorAll('.card')); // turns all cards into array
//console.log(cards)
let countdownEl = document.querySelector('#countdown')
const startingMinutes = 2;
let time = startingMinutes * 60; // 60 cos want all the seconds ( = 120)
let cardPicked;
let firstPick; 
let secondPick;
let intervalId //initializes timer //will put into startGame function //interal id is 1
//arefaceUpCard and faceDown connected to cards array? so if iterating through is cards[i] okay? or will i have to make faceUpCards an array so it can read those image cards;

//event listeners

startOverBtn.addEventListener('click', init)

//_______________________________________________________________________________
 //initialize game without any event listeners

//functions


function initTimer (){
    const minutes = Math.floor(time /60); // 120/60 = 2
    let seconds = time % 60; //all seconds remaining after division of 120/60
    if (seconds < 10){
        countdownEl.innerHTML = `${minutes}:0${seconds}` //adds 0 to the end or else would be 2:0 instead of 2:00
    } else {
        countdownEl.innerHTML = `${minutes}:${seconds}`
    }
    if(time > 0){
    time --; 
    } else {
        clearInterval(intervalId);
    }
}


function flipCard(e) {
    console.log(e.target);
    if (e.target.className === 'back-card') { //everything disappears
        e.target.style.opacity = '0';
        //only trigger timer when back card is clicked
        if (!intervalId) { //if not defined will start timer
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
    //reset timer and interval function
    time = 120;
    countdownEl.innerText = '2:00'
    clearInterval(intervalId);
    intervalId = undefined;
}


function shuffleCards () {
    for (let i=0; i<cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        cards[i].style.order = randomIndex; //order specifies order of elements
    }
}

//look at time variable

// function stopTimer (){
// clearTimeout(intervalId);
// } 

//function resetTimer (){ 
//}

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
