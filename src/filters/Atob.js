import _ from 'underscore';

class Atom {
  process(payload) {
    try {
      return atob(payload);
    }
    catch(_e) {
      return '';
    }
  }

  static generate(_filters) {
    return new this();
  }
}

export default Atom;
