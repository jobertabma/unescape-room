import React, { Component } from 'react';

import Sandbox from '../components/Sandbox.js';
import FormattedTime from '../components/FormattedTime.js';
import Challenge from '../components/Challenge.js';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';

class Match extends Component {
  render() {
    return (
      <div className="gameBox">
        <div>
          <Header />
          <div>
            <div className="gameHeader">
              🎮 Level {this.props.currentLevel} of {this.props.maxLevel} (game)
            </div>

            <div className="gameOptions">
              <span className="button" onClick={this.props.onStop}>
                Stop game
              </span>
            </div>

            <div className="clearfix" />

            <div>
              <div className="section">
                <Challenge
                  functionCalled={this.props.functionCalled}
                  valuePassed={this.props.valuePassed}
                  functionToBeCalled={this.props.functionToBeCalled}
                  valueToBePassed={this.props.valueToBePassed}
                />
              </div>
            </div>

            <div className="card section">
              <Sandbox
                payload={this.props.payload}
                onPayloadChange={this.props.onPayloadChange}
                sourcePrefix={this.props.sourcePrefix}
                sourcePostfix={this.props.sourcePostfix}
                sourcePayload={this.props.sourcePayload}
                source={this.props.source}
                currentErrorDescription={this.props.currentErrorDescription}
                currentErrorLine={this.props.currentErrorLine}
              />

              <div className="section">
                <span className="emoji">⏲</span>
                <strong><FormattedTime seconds={this.props.secondsRemaining} /></strong>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Match;
