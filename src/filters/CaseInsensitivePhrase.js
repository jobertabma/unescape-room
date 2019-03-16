import _ from 'underscore';

import PhraseBase from './PhraseBase.js';

class CaseInsensitivePhrase extends PhraseBase {
  process(payload) {
    return payload.replace(/${this.value}/ig, '');
  }

  isValidCombination(filters, allowedCharacters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof CaseInsensitivePhrase &&
        filter.value.toLowerCase() === this.value.toLowerCase()
    ));

    isInvalid = isInvalid || this.process(allowedCharacters) !== allowedCharacters

    return !isInvalid;
  }
}

export default CaseInsensitivePhrase;
