import _ from 'underscore';

import App  from '../App.js';

import AsciiHelper from '../helpers/Ascii.js';

class Alpha {
  constructor(value, recursive, caseInsensitive, globalMatch) {
    this.value = value;
    this.recursive = recursive;
    this.caseInsensitive = caseInsensitive;
    this.globalMatch = globalMatch;
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
      filter instanceof Alpha &&
        filter.value.toLowerCase() === this.value.toLowerCase()
    ));

    isInvalid = isInvalid || this.process(allowedCharacters) !== allowedCharacters

    return !isInvalid;
  }

  static generate(filters) {
    const characters = _.flatten([
      AsciiHelper.lowerCaseAlphabet(),
      AsciiHelper.upperCaseAlphabet(),
    ]);

    let recursive = filters <= _.random(0, App.MAX_LEVEL)
    let caseInsensitive = filters <= _.random(0, App.MAX_LEVEL);
    let globalMatch = filters <= _.random(0, App.MAX_LEVEL);

    return new this(
      characters[_.random(0, characters.length - 1)],
      recursive,
      caseInsensitive,
      globalMatch
    );
  }
}

export default Alpha;
