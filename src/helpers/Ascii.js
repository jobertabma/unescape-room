import _ from 'underscore';

class Ascii {
  static specialCharacters() {
    return ['(', ')', '{', '}', ';', '.', '[', ']', '<', '>', '+', '-', '`'];
  }

  static numbers() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  static lowerCaseAlphabet() {
    let characters = [];

    for(var i = 97; i <= 122; i++) {
      characters.push(String.fromCharCode(i));
    }

    return characters;
  }

  static upperCaseAlphabet() {
    let characters = [];

    for(var i = 65; i <= 90; i++) {
      characters.push(String.fromCharCode(i));
    }

    return characters;
  }
}

export default Ascii;
