import _ from 'underscore';

class Number {
  process(payload) {
    return payload.split(String(this.value)).join("");
  }

  isValidCombination(filters, allowedCharacters) {
    // make sure we only filter a number once
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof Number &&
        filter.value === this.value
    ));

    isInvalid = isInvalid || this.process(allowedCharacters) !== allowedCharacters

    return !isInvalid;
  }

  constructor(value) {
    this.value = value;
  }

  static generate(_filters) {
    return new this(_.random(0, 9));
  }
}

export default Number;
