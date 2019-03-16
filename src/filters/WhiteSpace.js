class WhiteSpace {
  process(payload) {
    return payload.replace(/\s+/g, '');
  }

  static generate(_filters) {
    return new this();
  }
}

export default WhiteSpace;
