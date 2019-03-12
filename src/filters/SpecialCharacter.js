import _ from 'underscore';

import AsciiHelper from '../helpers/Ascii.js';

class SpecialCharacter {
  process(payload) {
    return payload.split(this.value).join("");
  }

  constructor(value) {
    this.value = value;
  }

  static generate(level) {
    return new this(
      AsciiHelper.specialCharacters()[_.random(0, AsciiHelper.specialCharacters().length - 1)]
    );
  }
}

export default SpecialCharacter;
