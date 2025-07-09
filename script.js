const startOverBtn = document.querySelector('#start-over');
let h2El = document.querySelector('h2');
let h3El = document.querySelector('h3');
const gameContainer = document.querySelector('#game-container');
const faceUpCard = Array.from(document.querySelectorAll('.front-card'));
const faceDownCard = Array.from(document.querySelectorAll('.back-card'));
const cards = Array.from(document.querySelectorAll('.card')); // turns all cards into array
let countdownEl = document.querySelector('#countdown');
let time = 75;
let isProcessing = false;
let cardsBeingChecked = 0; 
let firstCard; 
let secondCard;
let firstCardText; 
let secondCardText;
let intervalId; //setInterval always has an id
let matchedCards = [];

//will reset game upon pressing 'start over' button
startOverBtn.addEventListener('click', init) 


//initializes game upon page load
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
    countdownEl.innerHTML = time;
    if(time > 0){ //will stop time once hits 0
    time--; 
    } else { 
        cards.forEach(function(card){
        card.style.pointerEvents = 'none'; //user won't be allowed to click anymore cards
        })
        clearInterval(intervalId);
        gameOver();
    }
}

function flipCard(e){
    if (isProcessing) return;
    //only elements with back-card class will be abled to be clicked
    if (e.target.className === 'back-card') { 
        e.target.classList.add('flip'); // flip reveals card beneath facedown card
        //only trigger timer when initial back card is clicked
        if (!intervalId) { //if undefined/false it will start timer, i.e. only first card will start timer because once first card is clicked, intervalId won't be undefined anymore
            intervalId = setInterval(initTimer, 1000);
        }
        if (cardsBeingChecked === 2){ //checks after flipping card to see how many cards there are
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
            firstCardText = e.target.getAttribute('alt'); // img alt attribute in html
            firstCard = e.target; //actual photo
            cardsBeingChecked++;
        } else { // if card being checked isn't at 0
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
    //both cards are pushed into the matchedCards array
        matchedCards.push(card1); 
        matchedCards.push(card2);
    //both cards will no longer respond to clicks
        card1.removeEventListener('click', flipCard); 
        card2.removeEventListener('click', flipCard);
    //This will prevent previous matched cards from being compared
        firstCard = null; 
        secondCard = null; 
        firstCardText = null; 
        secondCardText = null;
        isProcessing = false;
        cardsBeingChecked = 0; //set to 0 to be able to compare new set of cards
    }
}

function isNotMatch(card1, card2){
    if(firstCard && secondCard){
        setTimeout(() => {
        //unmatched cards are flipped back to show facedown card
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            firstCard = null; 
            secondCard = null; 
            firstCardText = null; 
            secondCardText = null;
            isProcessing = false;
            cardsBeingChecked = 0;
        }, 850);
    }
}

function checkWinner(){ 
    if (matchedCards.length === cards.length){
        clearInterval(intervalId); //stops timer when user finishes
        h2El.innerText = 'CONGRATULATIONS! YOU FOUND EVERYONE!';
        h3El.innerText = 'PRESS \'START OVER\' TO PLAY AGAIN.';
        h2El.classList.add('end-message');
        faceUpCard.forEach(function(card){
            card.classList.add('victory');
        })
    }
} //called on line 67

function gameOver(){
    h2El.innerText = 'SORRY, YOU RAN OUT OF TIME. YOU LOSE.';
    h3El.innerText = 'PRESS \'START OVER\' TO PLAY AGAIN.';
    h2El.classList.add('end-message'); //flashing text
}

function shuffleCards(){
    for (let i=0; i<cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        //.order specifies order of elements
        cards[i].style.order = randomIndex; 
    }
}

function resetTimer(){ 
    time = 75;
    countdownEl.innerText = 75';
    clearInterval(intervalId);
    intervalId = undefined;
}

function resetTitle(){ 
    h2El.innerText = 'CLICK ON ANY CARD TO START THE GAME';
    h3El.innerText = 'CAN YOU MATCH ALL OF YOUR FAVORITE CHARACTERS BEFORE TIME RUNS OUT?';
    h2El.classList.remove('end-message');
}

function resetCards(){
    faceDownCard.forEach(function(card){
        card.classList.remove('flip'); //cards will turn back to facedown
    });
    faceUpCard.forEach(function(card){
        card.classList.remove('victory');
    });
} 

function resetPointer(){
    cards.forEach(function(card){
        card.style.pointerEvents = 'auto'; //will be able to click again
    })
}
