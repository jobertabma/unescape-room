import _ from 'underscore';

class Number {
  process(payload) {
    return payload.split(String(this.value)).join("");
  }

  constructor(value) {
    this.value = value;
  }

  static generate(_filters) {
    return new this(_.random(0, 9));
  }
}

export default Number;
