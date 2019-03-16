import PhraseBase from './PhraseBase.js';

class CaseSensitivePhrase extends PhraseBase {
  process(payload) {
    return payload.split(this.value).join("");
  }
}

export default CaseSensitivePhrase;
