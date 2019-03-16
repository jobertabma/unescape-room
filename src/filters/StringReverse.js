import _ from 'underscore';

class StringReverse {
  process(payload) {
    return payload.split("").reverse().join("");
  }

  static generate(_filters) {
    return new this();
  }

  isValidCombination(filters, _allowedCharacters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof StringReverse
    ));

    return !isInvalid;
  }
}

export default StringReverse;
