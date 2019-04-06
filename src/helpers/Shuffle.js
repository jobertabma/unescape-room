import _ from "underscore";

class Shuffle {
  static shuffle(array) {
    let shuffledArray = [];

    while (array.length > 0) {
      shuffledArray.push(array.splice(_.random(0, array.length - 1), 1));
    }

    return _.flatten(shuffledArray);
  }
}

export default Shuffle;
