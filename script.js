console.log('Hi') 

let h3 = document.querySelector('h3');

function sayCongrats() {
    h3.innerText = 'Congratulations! You won!'
}

h3.addEventListener('click', sayCongrats)