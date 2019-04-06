import _ from "underscore";

import AsciiHelper from "../helpers/Ascii.js";

class SpecialCharacter {
  process(payload) {
    return payload.split(this.value).join("");
  }

  constructor(value) {
    this.value = value;
  }

  isValidCombination(filters, allowedCharacters) {
    let isInvalid = _.some(
      filters,
      filter =>
        filter instanceof SpecialCharacter && filter.value === this.value
    );

    isInvalid =
      isInvalid || this.process(allowedCharacters) !== allowedCharacters;

    return !isInvalid;
  }

  static generate(_filters) {
    return new this(
      AsciiHelper.specialCharacters()[
        _.random(0, AsciiHelper.specialCharacters().length - 1)
      ]
    );
  }
}

export default SpecialCharacter;
