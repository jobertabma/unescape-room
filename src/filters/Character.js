import _ from "underscore";

class Character {
  process(payload) {
    return payload.split(this.value).join("");
  }

  constructor(value) {
    this.value = value;
  }

  isValidCombination(filters, allowedCharacters) {
    let isInvalid = _.some(
      filters,
      filter => filter instanceof Character && filter.value === this.value
    );

    isInvalid =
      isInvalid || this.process(allowedCharacters) !== allowedCharacters;

    return !isInvalid;
  }
}

export default Character;
