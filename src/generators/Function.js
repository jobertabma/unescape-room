import _ from "underscore";

class Function {
  static ADJECTIVES = [
    "fancy",
    "elegant",
    "polite",
    "nice",
    "brave",
    "tall",
    "kind",
    "pretty"
  ];

  static NOUNS = ["Robot", "Human", "SuperHero", "Function"];

  static generate(_filters) {
    return (
      this.ADJECTIVES[_.random(0, this.ADJECTIVES.length - 1)] +
      this.NOUNS[_.random(0, this.NOUNS.length - 1)]
    );
  }
}

export default Function;
