import _ from 'underscore';

class CaseSensitiveCharacter {
  process(payload) {
    return payload.split(this.value).join("");
  }

  constructor(value) {
    this.value = value;
  }

  isValidCombination(filters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof CaseSensitiveCharacter &&
        filter.value === this.value
    ));

    return !isInvalid;
  }
}

export default CaseSensitiveCharacter;
