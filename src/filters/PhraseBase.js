import _ from 'underscore';

import Lottery from '../helpers/Lottery.js';

class PhraseBase {
  static SET = {
    'script': 8,
    'on': 6,
    'String': 4,
    '\\x': 1
  };

  constructor(value) {
    this.value = value;
  }

  static generate(_filters) {
    // mix SET with level, function, and value
    return new this(Lottery.pick(this.SET));
  }
}

export default PhraseBase;
