const scrambledWordElement = document.querySelector('#scrambled-word');
const guessInputElement = document.querySelector('#guess-input');
const checkGuessBtnElement = document.querySelector('#check-guess-btn');
const logOutputElement = document.querySelector('#log-output');

let currentword = '';

let wordsArray = [
    'cat', 'dog', 
    'mouse', 'bird', 'parrot', 'raccoon', 'bear', 'frog', 'grasshopper', 'spider',
    'elephant',
    'butterfly',
    'caterpillar',
    'gorilla',
    'owl','snake',
    'coyote',
    'wolf',
    'moth',
    'hamster',
    'monkey'
]

function scrambleWord(word) {
    return word.shuffle();
}

String.prototype.shuffle = function () {
    let wordarray = this.split('');
    let n = wordarray.length;

    for(let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = wordarray[i];
        wordarray[i] = wordarray[j];
        wordarray[j] = temp;
    }
    return wordarray.join('');
}

function fetchWord(wordArray) {

    currentword = wordArray[Math.floor(Math.random() * wordArray.length)];
    return currentword;
}

function compareGuess() {
    console.log('compareGuess')
    appendToLog(guessInputElement.value);
    let match = isMatch();
    if (match) {
        wordsArray = wordsArray.filter( word => word !== currentword);
        console.log('words remaining');
        console.log(wordsArray);
        scrambledWordElement.innerText = scrambleWord(fetchWord(wordsArray));
    }
    if (match) {
        guessInputElement.value = '';
        guessInputElement.focus();
    }
    return match;
}

function isMatch() {
    return currentword === guessInputElement.value;
}

function appendToLog(msg) {
    let p = document.createElement('p');
    p.innerText = msg;
    p.innerText += isMatch() ? ' ✅' : ' ❌';
    logOutputElement.insertBefore(p, logOutputElement.firstChild);
}


scrambledWordElement.innerText = scrambleWord(fetchWord(wordsArray));
guessInputElement.value = '';

checkGuessBtnElement.addEventListener('click', compareGuess);