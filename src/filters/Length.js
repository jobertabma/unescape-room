import _ from 'underscore';

class LengthFilter {
  process(payload) {
    if(this.length === null) {
      return payload;
    }

    return payload.substring(0, this.length - 1);
  }

  constructor(length) {
    this.length = length;
  }

  static generate(level) {
    switch(level) {
      case 'medium':
        return new this(_.random(100, 250));
      case 'hard':
        return new this(_.random(50, 250));
      default:
        return new this(null);
    }
  }
}

export default LengthFilter;
