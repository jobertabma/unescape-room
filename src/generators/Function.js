import _ from 'underscore';

class Function {
  static SET = [
    'alert',
    'callMe',
    'post',
    'confirm',
    'd'
  ];

  static generate(_filters) {
    return this.SET[_.random(0, this.SET.length - 1)];
  }
}

export default Function;
