class EscapeFilter {
  process(payload) {
    return payload.replace(/(['"\\])/g, '\\$1');
  }

  static generate(_filters) {
    // should pick at least one char to escape
    return new this();
  }
}

export default EscapeFilter;
