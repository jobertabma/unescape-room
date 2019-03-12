import _ from 'underscore';

import AsciiHelper from '../helpers/Ascii.js';

class Value {
  static generate(level) {
    let characters;
    let valueToBePassed;

    switch(level) {
    case 'trivial':
      return AsciiHelper.numbers()[_.random(0, AsciiHelper.numbers().length - 1)];
    case 'easy':
      characters = _.flatten([
          AsciiHelper.numbers(),
          AsciiHelper.lowerCaseAlphabet(),
          [true, false]
        ]
      );

      return characters[_.random(0, characters.length - 1)];
    case 'medium':
      characters = _.flatten([
          AsciiHelper.upperCaseAlphabet(),
          AsciiHelper.lowerCaseAlphabet(),
          AsciiHelper.numbers(),
        ]
      );

      valueToBePassed = '';

      for(let i = 1; i <= _.random(3, 5); i++) {
        valueToBePassed += characters[_.random(0, characters.length - 1)];
      }

      return valueToBePassed;
    case 'hard':
      characters = _.flatten([
          AsciiHelper.upperCaseAlphabet(),
          AsciiHelper.lowerCaseAlphabet(),
          AsciiHelper.numbers(),
          AsciiHelper.specialCharacters(),
        ]
      );

      valueToBePassed = '';

      for(let i = 1; i <= _.random(5, 10); i++) {
        valueToBePassed += characters[_.random(0, characters.length - 1)];
      }

      return valueToBePassed;
    }
  }
}

export default Value;
