const startOverBtn = document.querySelector('#start-over');
let h2El = document.querySelector('h2');
let h3El = document.querySelector('h3');
const gameContainer = document.querySelector('#game-container');
const faceUpCard = Array.from(document.querySelectorAll('.front-card'))
const faceDownCard = Array.from(document.querySelectorAll('.back-card'));
const cards = Array.from(document.querySelectorAll('.card')); // turns all cards into array
let countdownEl = document.querySelector('#countdown')
// const startingMinutes = 2;
// let time = startingMinutes * 60; // 60 cos want all the seconds ( = 120)
let time = 100
let isProcessing = false;
let cardsBeingChecked = 0; 
let firstCard; 
let secondCard;
let firstCardText; 
let secondCardText;
let intervalId; //setInterval always has an id
let matchedCards = [];

//event listener
startOverBtn.addEventListener('click', init)

//functions
function init(e) {
    shuffleCards();
    resetTimer();
    resetCards();
    resetTitle();
    resetPointer();
    cardsBeingChecked = 0; 
    matchedCards = [];
}
init();

//countdown timer
function initTimer(){
    countdownEl.innerHTML = time
    if(time > 0){ //will stop time once hits 0
    time --; 
    } else {
        cards.forEach(function(card){
            card.style.pointerEvents = 'none';
        })
        clearInterval(intervalId);
        gameOver();
    }
}

function flipCard(e){
    if (isProcessing) return;
    if (e.target.className === 'back-card') { 
        //e.target.style.opacity = '0';
        e.target.classList.add('flip')
        //only trigger timer when initial back card is clicked
        if (!intervalId) { //if undefined it will start timer, i.e. only first card will start timer
            intervalId = setInterval(initTimer, 1000);
        }
        if (cardsBeingChecked === 2){ //checks after flipping card, checks how many cards there are
            isProcessing = true; //if 2 cards, isProcessing is true so no other cards can be flipped
            checkMatch();
            checkWinner();
        }
    } else {
        
        return
    }
};

cards.forEach(function(card){
    addEventListener('click', flipCard);
});

//Ensures only two cards are being checked at a time and whether it's a match
cards.forEach(function(card){
    card.addEventListener('click', (e) => {
        if (cardsBeingChecked === 0) {
        firstCardText = e.target.getAttribute('alt') // img alt attribute in html
        firstCard = e.target
        cardsBeingChecked++;
        } else {
        secondCardText = e.target.getAttribute('alt');
        secondCard = e.target;
        cardsBeingChecked++; 
        }
    });
    
});

function checkMatch(){
    if (firstCardText === secondCardText){
        isMatch(firstCard, secondCard);
    } else if (firstCardText !== secondCardText){
        isNotMatch(firstCard, secondCard);
    }
}

function isMatch(card1, card2){
    if(firstCard && secondCard){
    matchedCards.push(card1); 
    matchedCards.push(card2);
    card1.removeEventListener('click', flipCard); 
    card2.removeEventListener('click', flipCard);
    //This will prevent previous matched cards from being compared
    firstCard = null; 
    secondCard = null; 
    firstCardText = null; 
    secondCardText = null;
    isProcessing = false;
    cardsBeingChecked = 0; //set to compare new set of cards
    }
}

function isNotMatch(card1, card2){
    if(firstCard && secondCard){
    setTimeout(() => {
        // card1.style.opacity = '1';
        // card2.style.opacity = '1';
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        firstCard = null; 
        secondCard = null; 
        firstCardText = null; 
        secondCardText = null;
        isProcessing = false;
        cardsBeingChecked = 0;
        }, 900);
    }
}

function checkWinner(){ 
    if (matchedCards.length === cards.length){
        clearInterval(intervalId); //stops timer when user finishes
        h2El.innerText = 'CONGRATULATIONS! YOU FOUND EVERYONE!'
        h3El.innerText = 'PRESS \'START OVER\' TO PLAY AGAIN.'
        faceUpCard.forEach(function(card){
            card.classList.add('victory');
        })
    }
} //called on line 67

function gameOver(){
    h2El.innerText = 'SORRY, YOU RAN OUT OF TIME. YOU LOSE.'
    h3El.innerText = 'PRESS \'START OVER\' TO PLAY AGAIN.'
}

function shuffleCards(){
    for (let i=0; i<cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        //.order specifies order of elements
        cards[i].style.order = randomIndex; 
    }
}


function resetTimer(){ 
    time = 100;
    countdownEl.innerText = '100'
    clearInterval(intervalId);
    intervalId = undefined;
}

function resetTitle(){ 
    h2El.innerText = 'CLICK ON ANY CARD TO START THE GAME';
    h3El.innerText = 'CAN YOU MATCH ALL OF YOUR FAVORITE CHARACTERS BEFORE TIME RUNS OUT?';

}

function resetCards(){
    faceDownCard.forEach(function(card){
        //card.style.opacity = '1';
        card.classList.remove('flip');
    });
} 

function resetPointer(){
    cards.forEach(function(card){
        card.style.pointerEvents = 'auto';
    })
}

