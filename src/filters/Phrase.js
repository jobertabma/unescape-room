import _ from 'underscore';

import App  from '../App.js';

import LotteryHelper from '../helpers/Lottery.js';

class Phrase {
  static SET = {
    'script': 8,
    'on': 6,
    'String': 4,
    '\\x': 1
  };

  constructor(value, recursive, caseInsensitive) {
    this.value = value;
    this.recursive = recursive;
    this.caseInsensitive = caseInsensitive;
  }

  process(payload) {
    let flags = []

    if (this.globalMatch) {
      flags.push('g');
    }

    if (this.caseInsensitive) {
      flags.push('i');
    }

    let regularExpression = new RegExp(this.value, flags.join(''));

    let processedPayload = payload.replace(regularExpression, '');;

    while(this.recursive && processedPayload.match(regularExpression)) {
      processedPayload = processedPayload.replace(regularExpression, '');
    }

    return processedPayload;
  }

  isValidCombination(filters, allowedCharacters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof Phrase &&
        filter.value.toLowerCase() === this.value.toLowerCase()
    ));

    isInvalid = isInvalid || this.process(allowedCharacters) !== allowedCharacters

    return !isInvalid;
  }

  static generate(filters) {
    let recursive = filters <= _.random(0, App.MAX_LEVEL)
    let caseInsensitive = filters <= _.random(0, App.MAX_LEVEL);
    let globalMatch = filters <= _.random(0, App.MAX_LEVEL);

    return new this(
      LotteryHelper.pick(this.SET),
      recursive,
      caseInsensitive,
      globalMatch
    );
  }
}

export default Phrase;
