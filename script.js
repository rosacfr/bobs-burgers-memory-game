const startOverBtn = document.querySelector('#start-over');
let h2El = document.querySelector('h2');
let h3El = document.querySelector('h3');
const gameContainer = document.querySelector('#game-container');
const faceUpCard = Array.from(document.querySelectorAll('.front-card'));
const faceDownCard = Array.from(document.querySelectorAll('.back-card'));
const cards = Array.from(document.querySelectorAll('.card')); // turns all cards into array
let countdownEl = document.querySelector('#countdown')
const startingMinutes = 2;
let time = startingMinutes * 60; // 60 cos want all the seconds ( = 120)
let busy = true;
let cardToCheck = 0; 
let firstCard; 
let secondCard;
let firstCardText; 
let secondCardText;
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

//countdown timer. Will stop when it hits 0:00
function initTimer(){
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

function flipCard(e){
    if (e.target.className === 'front-card') { 
        e.target.style.opacity = '1';
        //only trigger timer when initial back card is clicked
        if (!intervalId) { //if undefined it will start timer, i.e. only first card will start timer
            intervalId = setInterval(initTimer, 1000);
        }
    } else {
        return
    }
};

cards.forEach(function(card){
    addEventListener('click', flipCard);
});


function shuffleCards(){
    for (let i=0; i<cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        //.order specifies order of elements
        cards[i].style.order = randomIndex; 
    }
}

//Ensures only two cards are being checked at a time and whether it's a match
function checkMatch(){
cards.forEach(function(card){
    card.addEventListener('click', (e) => {
        if (cardToCheck === 0) {
        firstCardText = e.target.getAttribute('alt') // img alt attribute in html
        firstCard = e.target
        cardToCheck++;
        } else {
        secondCardText = e.target.getAttribute('alt');
        secondCard = e.target;
        cardToCheck = 0; //reruns cycle
        }
        console.log(`first ${firstCardText}`);
        console.log(`second ${secondCardText}`);
        if (firstCardText === secondCardText){
            isMatch(firstCard, secondCard);
        } else if (firstCardText !== secondCardText){
            isNotMatch(firstCard, secondCard);
        }
    });
    checkWinner();
});
}
checkMatch();

function isMatch(card1, card2){
    if(firstCard && secondCard){
    matchedCards.push(card1); 
    matchedCards.push(card2);
    card1.removeEventListener('click', flipCard); 
    card2.removeEventListener('click', flipCard);
    card1.style.cursor = 'not-allowed';
    card2.style.cursor = 'not-allowed';
    //This will prevent previous matched cards from being compared
    firstCard = null; 
    secondCard = null; 
    firstCardText = null; 
    secondCardText = null;
    }
}

function isNotMatch(card1, card2){
        if(firstCard && secondCard){
        setTimeout(() => {
            card1.style.opacity = '0';
            card2.style.opacity = '0';
            firstCard = null; 
            secondCard = null; 
            firstCardText = null; 
            secondCardText = null;
        }, 1000);
        
    }
}

function checkWinner(){ 
    if (matchedCards.length === cards.length){
        clearInterval(intervalId); 
        h2El.innerText = 'CONGRATULATIONS! YOU FOUND EVERYONE!'
        h3El.innerText = 'PRESS \'START OVER\' TO PLAY AGAIN.'
    }
}
//called on line 100;

function gameOver(){
    h2El.innerText = 'SORRY, YOU RAN OUT OF TIME. YOU LOSE.'
    h3El.innerText = 'PRESS \'START OVER\' TO PLAY AGAIN.'
    // cards.forEach(function(card){ //continues to disable cards once start over btn pressed
    //     removeEventListener('click', flipCard);
        // card.style.cursor = 'not-allowed'; //not working, still showing pointer finger
    // });
}

function resetTimer(){ 
    time = 120;
    countdownEl.innerText = '2:00'
    clearInterval(intervalId);
    intervalId = undefined;
}

function resetTitle(){ 
    h2El.innerText = 'CLICK ON ANY CARD TO START THE GAME';
    h3El.innerText = 'CAN YOU MATCH ALL OF YOUR FAVORITE CHARACTERS BEFORE TIME RUNS OUT?';

}

function resetCards(){
    faceUpCard.forEach(function(card){ //forEach cos an array
        card.style.opacity = '0';
    });
} 
