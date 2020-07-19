'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var colors = require('colors');
let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

//generates 4 random letters 
const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }

  console.log(solution)
}
//random numbers hhb
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  let solutionArray = [];
  let guessArray = [];
  let finalArr = [];
  let correctLetterLocations = 0;
  let correctLetters = 0;

  solutionArray = solution.split('');
  guessArray = guess.split('');

//checks for correct letters in correct position
  for(let i =0; i<solutionArray.length; i++){
    if(solutionArray[i] === guessArray[i]){
      finalArr.push(guessArray[i]);
      correctLetterLocations ++;
      solutionArray[i] = null;
    }
  }

//checks for correct letters at any position
for(let i = 0; i<solutionArray.length; i++){
  if(guessArray.indexOf(solutionArray[i]) != - 1){
    correctLetters ++;
    solutionArray[i] = null;
  }
}
let hint = colors.red(correctLetters) + ' - ' + correctLetterLocations;

return hint;
}

const mastermind = (guess) => {
  if (guess != solution){
   let hint = generateHint(guess);
    console.log("Current Hint: " + hint)
    board.push(hint)
  }

  else if (guess == solution){
    console.log('You guessed it!!!!');
    console.log('Time for a new game.')
    console.log('START GUESSING')
    resetGame();
    return "You guessed it!";
}
}

const resetGame = () => {
  board = [];
  solution = '';
  generateSolution();
}

const checkTurn = () => {
  if(board.length == 10){
    console.log('Sorry you are out of turns. Time for a new game.');
    resetGame();
  }
}

const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    checkTurn();
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}