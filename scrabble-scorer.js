// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   return word;
};

function simpleScorer(word) { 
   word = word.toUpperCase();
   return 1 * word.length;
};

function vowelBonusScorer(word) { 
   word = word.toUpperCase();
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   let score = simpleScorer(word);
   for (let i = 0; i < word.length; i++) { 
      if (word.includes(vowels[i])) {
         score = score + 2;
      }
   }
   return score;
};

//let scrabbleScorer;

const scoringAlgorithms = [
   scrabble = {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scoringFunction: function () { return oldScrabbleScorer(word) }
   },

   simple = {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scoringFunction: function () {return simpleScorer(word)}
   },

   vowels = {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 points, consonants are 1 point.',
      scoringFunction: function () {return vowelBonusScorer(word)}
   }
];

function scorerPrompt(word) { 
   console.log('Which scoring algorithm would you like to use?' + '\n' + 
      '0 - Scrabble: Uses scrabble point system' + '\n' + 
      '1 - Simple: One point per character' + '\n' + 
      '2 - Vowel Bonus: Vowels are worth 3 points');
   let prompt = input.question('Enter 0, 1, or 2: ');
   return scoringAlgorithms[prompt].scoringFunction(word);
};

function transform() {};

let newPointStructure;

function runProgram() {
   word = initialPrompt();
   scoring = scorerPrompt(word);
   console.log(scoring);
};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   //scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
