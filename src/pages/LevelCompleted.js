import React, { Component } from 'react';

import FormattedTime from '../components/FormattedTime.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

class LevelCompleted extends Component {
  render() {
    return (
      <div className="gameBox">
        <div>
          <Header />
          <div>
            <div className="gameHeader">
              🤩 Level completed
            </div>

            <div className="clearfix" />

            <div>
              <div className="section">
                You have completed an <code>unescape()</code> room level.
                {" "}
                {this.props.hasNextLevel && <span>Get ready for the next one!</span>}
              </div>
            </div>

            <div className="card section">
              <div>
                Current total points
              </div>

              <div className="section">
                <h1>{this.props.totalPoints}</h1>
              </div>

              <div className="section">
                Total time spent
              </div>

              <div className="section">
                <h1><FormattedTime seconds={this.props.totalTimeRemaining} /></h1>
              </div>

              {this.props.hasNextLevel &&
                <div className="section">
                  <div onClick={this.props.onNextlevel} className="practice-run">
                    <strong>Advance to next level</strong>
                    <br />
                    <span>A new level is lined up for you, have fun!</span>
                  </div>
                </div>}

              {!this.props.hasNextLevel &&
                <div className="section">
                  <div onClick={this.props.onFinish} className="practice-run">
                    <strong>Game summary</strong>
                    <br />
                    <span>Wow, you have completed the game, let's see how you did!</span>
                  </div>
                </div>}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default LevelCompleted;
