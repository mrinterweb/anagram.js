'use strict';
var fs = require('fs');
/** Finds anagrams
* Example usage:
*   new Anagram().lookup('Nag a ram')
*/
class Anagram {
  constructor() {
    var contents = fs.readFileSync('./resources/wordlist.txt');
    this.wordList = contents.toString().split(/\n/);
    this.anagramIndex = this._indexer(this.wordList);
  }

  /**
   * looks up matching anagrams
   * @param {string} word - the word you want to find anagrams for
   * @returns {(Array|null)}
   */
  lookup(word) {
    return this.anagramIndex[this._indexReference(word)] || null;
  }

  // Build a hash of all words that downcases and sorts the letters.
  // This hash will have keys that are the common anagram and an array
  // of matching words
  _indexer(words) {
    let indexed = {};
    for (let word of words) {
      let index = this._indexReference(word);
      if (Array.isArray(indexed[index])) {
        indexed[index] = indexed[index].concat(word);
      } else {
        indexed[index] = [word];
      }
    }
    return indexed;
  }

  _indexReference(word) {
    return word
      .toLocaleLowerCase()
      .replace(/[^a-z]/ig, '')
      .split('')
      .sort()
      .join('');
  }
}
module.exports = Anagram;
