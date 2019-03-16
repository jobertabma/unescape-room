import PhraseBase from './PhraseBase.js';

class CaseInsensitivePhrase extends PhraseBase {
  process(payload) {
    return payload.replace(/${this.value}/ig, '');
  }
}

export default CaseInsensitivePhrase;
