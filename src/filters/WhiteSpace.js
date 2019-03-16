import _ from 'underscore';

class WhiteSpace {
  process(payload) {
    return payload.replace(/\s+/g, '');
  }

  static generate(_filters) {
    return new this();
  }

  isValidCombination(filters, _allowedCharacters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof WhiteSpace
    ));

    return !isInvalid;
  }
}

export default WhiteSpace;
