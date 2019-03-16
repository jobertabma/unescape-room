import _ from 'underscore';

class Lottery {
  static pick(set) {
    let expandedSet = _.flatten(_.map(set, (likelihood, value) => (
      _.times(likelihood, (_index) => value)
    )));

    return expandedSet[_.random(0, expandedSet.length - 1)];
  }
}

export default Lottery;
