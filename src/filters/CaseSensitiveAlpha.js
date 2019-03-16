import _ from 'underscore';

import AlphaBase from './AlphaBase.js';

class CaseSensitiveAlpha extends AlphaBase {
  process(payload) {
    return payload.split(this.value).join("");
  }

  isValidCombination(filters, allowedCharacters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof CaseSensitiveAlpha &&
        filter.value === this.value
    ));

    isInvalid = isInvalid || this.process(allowedCharacters) !== allowedCharacters

    return !isInvalid;
  }
}

export default CaseSensitiveAlpha;
