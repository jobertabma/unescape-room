import AlphaBase from './AlphaBase.js';

class CaseInsensitiveAlpha extends AlphaBase {
  process(payload) {
    return payload.replace(/${this.value}/ig, '');
  }
}

export default CaseInsensitiveAlpha;
