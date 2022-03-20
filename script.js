const startOverBtn = document.querySelector('#start-over');
const h2El = document.querySelector('h2');
const h3El = document.querySelector('h3');
const gameContainer = document.querySelector('#game-container');
//do i select the class of the photo, or the actual img? i.e. imgs/bob.jpg
const faceUpCard = document.querySelectorAll('.front-card') //should these be an array?
const faceDownCard = document.querySelectorAll('.back-card')
const cards = Array.from(document.querySelectorAll('.card')); // turns all cards into array
//console.log(cards)
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
// //randomize cards
// //timer set to 2 min


function shuffleCards () {
    for (let i=0; i<cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        cards[i].style.order = randomIndex; //order specifies order of elements
    }
}
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
