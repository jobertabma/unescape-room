import _ from 'underscore';

class Length {
  process(payload) {
    return payload.substring(0, this.length - 1);
  }

  isValidCombination(filters, _allowedCharacters) {
    // make sure we only Length once
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof Length
    ));

    return !isInvalid;
  }

  constructor(length) {
    this.length = length;
  }

  static generate(_filters) {
    return new this(_.random(100, 250));
  }
}

export default Length;
