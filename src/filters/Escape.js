import _ from "underscore";

class Escape {
  static SET = ["'", '"', "\\", "`"];

  process(payload) {
    return payload.split(this.value).join("");
  }

  constructor(value) {
    this.value = value;
  }

  isValidCombination(filters, allowedCharacters) {
    let isInvalid = _.some(
      filters,
      filter => filter instanceof Escape && filter.value === this.value
    );

    isInvalid =
      isInvalid || this.process(allowedCharacters) !== allowedCharacters;

    return !isInvalid;
  }

  static generate(_filters) {
    return new this(this.SET[_.random(0, this.SET.length - 1)]);
  }
}

export default Escape;
