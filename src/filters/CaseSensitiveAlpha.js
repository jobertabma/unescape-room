import _ from 'underscore';

import AlphaBase from './AlphaBase.js';

class CaseSensitiveAlpha extends AlphaBase {
  process(payload) {
    return payload.split(this.value).join("");
  }

  isValidCombination(filters) {
    let isInvalid = _.some(filters, (filter) => (
      filter instanceof CaseSensitiveAlpha &&
        filter.value === this.value
    ));

    return !isInvalid;
  }
}

export default CaseSensitiveAlpha;
