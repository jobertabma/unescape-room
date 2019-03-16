import _ from 'underscore';

class CaseSensitivePhraseBase {
  static SET = [
    'alert',
    'script',
    'on',
    'String'
  ]

  constructor(value) {
    this.value = value;
  }

  static generate(_filters) {
    // mix SET with level, function, and value
    return new this(this.SET[_.random(0, this.SET.length - 1)]);
  }
}

export default CaseSensitivePhraseBase;
