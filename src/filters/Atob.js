import _ from 'underscore';

class Atom {
  process(payload) {
    try {
      return atob(payload);
    }
    catch(_e) {
      return '';
    }
    // return atob(payload);
  }

  static generate(level) {
    return new this();
  }
}

export default Atom;
