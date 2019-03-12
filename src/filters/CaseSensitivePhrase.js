import _ from 'underscore';

class CaseSensitivePhrase {
  static SET = [
    'alert',
    'script',
    'on',
    'String'
  ]

  process(payload) {
    return payload.split(this.value).join("");
  }

  constructor(value) {
    this.value = value;
  }

  static generate(level) {
    // mix SET with level, function, and value
    return new this(this.SET[_.random(0, this.SET.length - 1)]);
  }
}

export default CaseSensitivePhrase;
