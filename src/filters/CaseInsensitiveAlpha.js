import _ from 'underscore';

import AsciiHelper from '../helpers/Ascii.js';

class CaseInsensitiveAlpha {
  process(payload) {
    return payload.replace(/${this.value}/ig, '');
  }

  constructor(value) {
    this.value = value;
  }

  static generate(_filters) {
    const characters = AsciiHelper.lowerCaseAlphabet();

    return new this(characters[_.random(0, characters.length - 1)]);
  }
}

export default CaseInsensitiveAlpha;
