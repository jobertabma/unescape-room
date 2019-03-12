class CaseSensitiveCharacter {
  process(payload) {
    return payload.split(this.value).join("");
  }

  constructor(value) {
    this.value = value;
  }
}

export default CaseSensitiveCharacter;
