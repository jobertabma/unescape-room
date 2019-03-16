class EscapeQuotesFilter {
  process(payload) {
    return payload.replace(/(['"\\])/g, '\\$1');
  }

  static generate(_filters) {
    return new this();
  }
}

export default EscapeQuotesFilter;
