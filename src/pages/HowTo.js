import React, { Component } from 'react';

import Header from '../components/Header.js';

class HowTo extends Component {
  render() {
    return (
      <div className="gameBox">
        <div>
          <Header />

          <div>
            <div className="gameHeader">
              How to play
            </div>

            <div className="clearfix" />

            <div>
              <div className="section">
                Text if needed.
              </div>
            </div>

            <div className="card section">
              Hello

              <button onClick={this.props.onGoHome}>Go back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HowTo;
