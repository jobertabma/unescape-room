import React, { Component } from 'react';

import FormattedTime from '../components/FormattedTime.js';
import Header from '../components/Header.js';

class MatchOver extends Component {
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
              </div>

              <div className="section">
                Total time remaining
              </div>

              <div className="section">
                <h1><FormattedTime seconds={this.props.totalTimeSpent} /></h1>
              </div>

              <br />
              <button onClick={this.props.onPractice}>Practice</button>
              <br />
              <button onClick={this.props.onMatch}>New match</button>
              <br />
              <button>Share</button>
              <br />
              <button onClick={this.props.onGoHome}>Home</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchOver;
