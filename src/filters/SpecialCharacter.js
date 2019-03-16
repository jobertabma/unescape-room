import _ from 'underscore';

import AsciiHelper from '../helpers/Ascii.js';

class SpecialCharacter {
  process(payload) {
    return payload.split(this.value).join("");
  }

  constructor(value) {
    this.value = value;
  }

  isValidCombination(filters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof SpecialCharacter &&
        filter.value === this.value
    ));

    return !isInvalid;
  }

  static generate(_filters) {
    return new this(
      AsciiHelper.specialCharacters()[_.random(0, AsciiHelper.specialCharacters().length - 1)]
    );
  }
}

export default SpecialCharacter;
