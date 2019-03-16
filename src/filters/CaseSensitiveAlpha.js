import AlphaBase from './AlphaBase.js';

class CaseSensitiveAlpha extends AlphaBase {
  process(payload) {
    return payload.split(this.value).join("");
  }
}

export default CaseSensitiveAlpha;
