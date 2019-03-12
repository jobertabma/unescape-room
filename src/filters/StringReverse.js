class StringReverse {
  process(payload) {
    return payload.split("").reverse().join("");
  }

  static generate(level) {
    return new this();
  }
}

export default StringReverse;
