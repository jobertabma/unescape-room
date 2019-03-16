import _ from 'underscore';

import PhraseBase from './PhraseBase.js';

class CaseInsensitivePhrase extends PhraseBase {
  process(payload) {
    return payload.replace(/${this.value}/ig, '');
  }

  isValidCombination(filters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof CaseInsensitivePhrase &&
        filter.value.toLowerCase() === this.value.toLowerCase()
    ));

    return !isInvalid;
  }
}

export default CaseInsensitivePhrase;
