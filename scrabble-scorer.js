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
    word = word.toLowerCase();
   return 1 * word.length;
};

function vowelBonusScorer(word) { 
    word = word.toLowerCase();
   let vowels = ['a', 'e', 'i', 'o', 'u'];
   let score = '';
   for (let i = 0; i < word.length; i++) { 
      if (vowels.includes(word[i])) {
         score = Number(score) + 3;
      } else {
         score = Number(score) + simpleScorer(word[i])
      }
   }
   return score;
};

function scrabbleScorer(word) {
   word = word.toLowerCase();
	let letterPoints = "";
 
    for (let i = 0; i < word.length; i++) {
        if (word[i] in newPointStructure) {
            let points = newPointStructure[word[i]];
           letterPoints = Number(letterPoints) + Number(points);
		 } 
	}
	return letterPoints;
};

const scoringAlgorithms = [
   simple = {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },

   vowels = {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 points, consonants are 1 point.',
      scorerFunction: vowelBonusScorer
   },

   scrabble = {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(word) { 
   console.log('Which scoring algorithm would you like to use?' + '\n' + 
      '0 - Simple: One point per character' + '\n' + 
      '1 - Vowel Bonus: Vowels are worth 3 points' + '\n' + 
      '2 - Scrabble: Uses scrabble point system');
   let prompt = input.question('Enter 0, 1, or 2: ');
   return scoringAlgorithms[prompt].scorerFunction(word);
};

function transform(object) {
   let temp = {};
   for (key in object) {
      for (let i = 0; i < object[key].length; i++) {
         let value = String(object[key][i]).toLowerCase();
         temp[value] = Number(key);
      }
   }
   let sorted = Object.keys(temp);
   sorted.sort();
   let sortedObj = {};
   for (let i = 0; i < sorted.length; i++) {
      sortedObj[sorted[i]] = temp[sorted[i]]
   }
   return sortedObj;
};

let newPointStructure = transform(oldPointStructure);

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
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
