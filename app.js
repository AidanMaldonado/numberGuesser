//Game Values
let min = 1,
    max = 10,
    winningNum = getWinningNum(),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
}); 

//Listen for guess
guessBtn.addEventListener('click', guessFunction);

//Function on submit of guess
function guessFunction() {
  let guess = parseInt(guessInput.value);

  //Validate
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //Check if won
  if(guess === winningNum) {
    //Game Over - Won
    gameOver(true, `${winningNum} is correct!`);
  } else {
    //Wrong Number
    guessesLeft -= 1;

    if(guessesLeft === 0) {
      //Game Over - Lost
      gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
    } else {
      //Game Continues - Answer Wrong
      guessInput.style.borderColor = 'red';

      //Clear Input
      guessInput.value = '';

      //Tell user wrong number and guesses left
      setMessage(`${guess} is not correct. You have ${guessesLeft} more tries!`, 'red');
    }
  }
}

//Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  //Disable Input 
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //Text Color
  message.style.color = color;
  //Set Message 
  setMessage(msg);

  //Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

//Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

//Gets random winning number
function getWinningNum() {
  const randomNum = Math.ceil(Math.random() * 10);
  return randomNum;
}