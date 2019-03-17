import React, { Component } from 'react';

import FormattedTime from '../components/FormattedTime.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

class MatchOver extends Component {
  twitterShareLink() {
    return 'https://twitter.com/intent/tweet?text=' + this.props.shareMessage
  }

  render() {
    return (
      <div className="gameBox">
        <div>
          <Header />
          <div>
            <div className="gameHeader">
              🏆 Game over
            </div>

            <div className="clearfix" />

            <div>
              <div className="section">
                You completed an <code>unescape()</code> room game. Below is a summary of
                {" "}how well you did!
              </div>
            </div>

            <div className="card section">
              <div>
                Levels completed
              </div>

              <div className="section">
                <h1>{this.props.filters.length}</h1>
              </div>

              <div className="section">
                Points
              </div>

              <div className="section">
                <h1>{this.props.totalPoints}</h1>
                {" "}<a href={this.twitterShareLink()} rel="noopener noreferrer" target="_blank">
                  Share this!
                </a>
              </div>

              <div className="section">
                Total time spent
              </div>

              <div className="section">
                <h1><FormattedTime seconds={this.props.totalTimeSpent} /></h1>
              </div>

              <div>
                <div onClick={this.props.onPractice} className="practice-run">
                  <strong>Practice run</strong>
                  <br />
                  <span>Learn the ropes and get a feel for the game</span>
                </div>

                <div onClick={this.props.onMatch} className="play-a-match section">
                  <strong>Play a match</strong>
                  <br />
                  <span>A race against the clock, levels become increasingly more difficult</span>
                </div>

                <div onClick={this.props.onGoHome} className="play-a-match section">
                  <strong>Home</strong>
                  <br />
                  <span>I need some rest, take me back to the main screen</span>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default MatchOver;
