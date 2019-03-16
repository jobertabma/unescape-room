import _ from 'underscore';

import AlphaBase from './AlphaBase.js';

class CaseInsensitiveAlpha extends AlphaBase {
  process(payload) {
    return payload.replace(/${this.value}/ig, '');
  }

  isValidCombination(filters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof CaseInsensitiveAlpha &&
        filter.value.toLowerCase() === this.value.toLowerCase()
    ));

    return !isInvalid;
  }
}

export default CaseInsensitiveAlpha;
