const startOverBtn = document.querySelector('#start-over');
const h2El = document.querySelector('h2');
const h3El = document.querySelector('h3');
const gameContainer = document.querySelector('#game-container');
//do i select the class of the photo, or the actual img? i.e. imgs/bob.jpg
const faceUpCard = document.querySelectorAll('.front-card') //should these be an array?
const faceDownCard = document.querySelectorAll('.back-card')
const cards = Array.from(document.querySelectorAll('.card')); // turns all cards into array
//console.log(cards)
let countdown = document.querySelector('#countdown')
const startingMinutes = 2;
let time = startingMinutes * 60; // 60 cos want all the seconds ( = 120)
//arefaceUpCard and faceDown connected to cards array? so if iterating through is cards[i] okay? or will i have to make faceUpCards an array so it can read those image cards;

//event listeners
// cards.addeventListener('click', startTimer) <--- this might start timer EVERY time a card is clicked. How would I fix this?

startOverBtn.addEventListener('click', init)

//_______________________________________________________________________________
init(); //initialize game without any event listeners

// //functions

function init(e) {
    shuffleCards();
}
// //timer set to 2 min


function shuffleCards () {
    for (let i=0; i<cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        cards[i].style.order = randomIndex; //order specifies order of elements
    }
}

// setInterval(initTimer, 1000) //google what this does (it starts timer) //initializes timer

function initTimer (){
    const minutes = Math.floor(time /60); // 120/60 = 2
    let seconds = time % 60; //all seconds remaining after division of 120/60
    if (seconds < 10){
        countdown.innerHTML = `${minutes}:0${seconds}` //adds 0 to the end or else would be 2:0 instead of 2:00
    } else {
        countdown.innerHTML = `${minutes}:${seconds}`
    }
    time --; //cos going down
}

// function stopTimer (){

// }

// function startTimer() 
// //starts timer on click of first card

// function flipCard() 
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
