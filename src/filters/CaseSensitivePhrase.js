import _ from 'underscore';

import PhraseBase from './PhraseBase.js';

class CaseSensitivePhrase extends PhraseBase {
  process(payload) {
    return payload.split(this.value).join("");
  }

  isValidCombination(filters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof CaseSensitivePhrase &&
        filter.value === this.value
    ));

    return !isInvalid;
  }
}

export default CaseSensitivePhrase;
