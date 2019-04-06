import _ from "underscore";

import AsciiHelper from "../helpers/Ascii.js";

class Value {
  static generate(filters) {
    let characters = _.flatten([
      AsciiHelper.numbers(),
      filters > 3 && AsciiHelper.lowerCaseAlphabet(),
      filters > 8 && AsciiHelper.upperCaseAlphabet(),
      filters > 15 && AsciiHelper.specialCharacters()
    ]);

    characters = _.reject(characters, item => item === false);

    let valueToBePassed = [];

    for (let i = 1; i <= Math.floor((filters + 1) * 1.25); i++) {
      valueToBePassed.push(characters[_.random(0, characters.length - 1)]);
    }

    return valueToBePassed.join("");
  }
}

export default Value;
