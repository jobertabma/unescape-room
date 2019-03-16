import _ from 'underscore';

class Escape {
  process(payload) {
    // should it also escape backticks?
    return payload.replace(/(['"\\])/g, '\\$1');
  }

  isValidCombination(filters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof Escape
    ));

    return !isInvalid;
  }

  static generate(_filters) {
    // should pick at least one char to escape
    // or a number of characters
    return new this();
  }
}

export default Escape;
