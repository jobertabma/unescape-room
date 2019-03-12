import _ from 'underscore';

class Number {
  process(payload) {
    return payload;
    // return atob(payload);
  }

  static generate(level) {
    return new this();
  }
}

export default Number;
