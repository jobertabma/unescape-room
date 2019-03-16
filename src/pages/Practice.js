import _ from 'underscore';
import React, { Component } from 'react';

import Sandbox from '../components/Sandbox.js';
import Challenge from '../components/Challenge.js';
import Footer from '../components/Footer.js';

class Practice extends Component {
  render() {
    return (
      <div className="gameBox">
        <div>
          <div>
            <div className="gameHeader">
              🎧 Level {this.props.currentLevel} (practice)
            </div>

            <div className="gameOptions">
              <select
                style={{ marginRight: '4px' }}
                defaultValue={String(this.props.currentLevel - 1)}
                onChange={(event) => this.props.onStartGame(event.target.value)}
              >
                {_.times(this.props.maxLevel, (index) => (
                  <option key={index} value={index}>Level {index + 1}</option>
                ))}
              </select>
              <span className="button"
                onClick={this.props.onNewPracticeLevel}
              >
                New practice level
              </span>
              {" "}
              <span className="button"
                onClick={this.props.onGoHome}
              >
                Home
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
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Practice;