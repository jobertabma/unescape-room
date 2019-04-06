class Score {
  static getCurrentHighestScore() {
    let currentHighestScore = localStorage.getItem("highestScore");

    return currentHighestScore !== null ? parseInt(currentHighestScore) : null;
  }

  static getCurrentHighestLevel() {
    let currentHighestLevel = localStorage.getItem("highestLevel");

    return currentHighestLevel !== null ? parseInt(currentHighestLevel) : null;
  }

  static setNewHighestScore(score) {
    if (score > Score.getCurrentHighestScore()) {
      localStorage.setItem("highestScore", score);
    }
  }

  static setNewHighestLevel(level) {
    if (level > Score.getCurrentHighestLevel()) {
      localStorage.setItem("highestLevel", level);
    }
  }
}

export default Score;
