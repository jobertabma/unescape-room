import _ from 'underscore';

class Atob {
  process(payload) {
    try {
      return atob(payload);
    }
    catch(_e) {
      return '';
    }
  }

  isValidCombination(filters, _allowedCharacters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof Atob
    ));

    return !isInvalid;
  }

  static generate(_filters) {
    return new this();
  }
}

export default Atob;
