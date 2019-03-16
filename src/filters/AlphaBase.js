import _ from 'underscore';

import AsciiHelper from '../helpers/Ascii.js';

class AlphaBase {
  constructor(value) {
    this.value = value;
  }

  static generate(_filters) {
    const characters = _.flatten([
      AsciiHelper.lowerCaseAlphabet(),
      AsciiHelper.upperCaseAlphabet(),
    ]);

    return new this(characters[_.random(0, characters.length - 1)]);
  }
}

export default AlphaBase;
