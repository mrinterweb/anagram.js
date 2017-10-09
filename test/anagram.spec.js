var assert = require('assert');
var Anagram = require('../index');

describe('Anagram', function() {
  describe('#lookup', function() {
    it('returns expected anagrams', function() {
      var result = new Anagram().lookup('Nag a ram');
      assert(result == 'anagram');
    });

    it('returns null if anagram not found', function() {
      var result = new Anagram().lookup('asasfaefasdfzcxvzcvzzz');
      assert.equal(result, null);
    });

    it('should not take too long to lookup every word', function() {
      this.timeout(10000);
      let anagram = new Anagram();

      console.log('looking up anagrams for', anagram.wordList.length, 'words');
      console.time('lookup');
      let startTime = new Date();
      anagram.wordList.forEach(word => anagram.lookup(word));
      let durration = new Date() - startTime;
      console.timeEnd('lookup');
      assert(durration < 2000);
    })
  });
});


