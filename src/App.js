import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'underscore';

import './App.css';
import './Prism.css';

import HtmlTemplateGenerator from './generators/HtmlTemplate.js';
import ListenerTemplateGenerator from './generators/ListenerTemplate.js';
import FunctionGenerator from './generators/Function.js';
import ValueGenerator from './generators/Value.js';
import FiltersGenerator from './generators/Filters.js';

import AsciiHelper from './helpers/Ascii.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingUp: true,
      helpExpanded: false
    };

    this.handlePayloadChange = this.handlePayloadChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleToggleHelpSection = this.handleToggleHelpSection.bind(this);
  }

  componentDidMount() {
    this.handleStartGame(localStorage.getItem('level') || 'trivial');
  }

  uniqueGameIdentifier() {
    let possibleIdentifier = [];

    let set = AsciiHelper.lowerCaseAlphabet();

    while(possibleIdentifier.length < 16) {
      possibleIdentifier.push(set[_.random(0, set.length - 1)]);
    }

    return possibleIdentifier.join('');
  }

  handleStartGame(level) {
    // remove event listener

    // if (this.state.listener) {
    //   window.removeEventListener('message', this.state.listener);
    // }

    const functionToBeCalled = FunctionGenerator.generate(level);
    const valueToBePassed = ValueGenerator.generate(level);
    const htmlTemplate = HtmlTemplateGenerator.generate(level);
    const identifier = this.uniqueGameIdentifier();

    this.setState({
      level: level,
      identifier: identifier,
      settingUp: false,
      functionCalled: false,
      valuePassed: false,
      template: htmlTemplate,
      payload: '',
      functionToBeCalled: functionToBeCalled,
      valueToBePassed: valueToBePassed,
      listenerTemplate: ListenerTemplateGenerator.generate(functionToBeCalled),
      filters: FiltersGenerator.generate(
        level,
        functionToBeCalled,
        valueToBePassed,
        htmlTemplate
      ),
    });

    (function(_this) {
      window.addEventListener('message', function(event) {
        if (typeof event.data !== 'object') {
          return false;
        }

        switch(event.data.function) {
          case _this.state.functionToBeCalled:
            _this.updateGameStore(_this.state.identifier, {
              functionCalled: true
            });

            const valuePassed = event.data.value === _this.state.valueToBePassed;

            _this.setState({
              functionCalled: true,
              valuePassed: valuePassed
            });

            valuePassed && _this.updateGameStore(_this.state.identifier, {
              valuePassed: true
            });
          break;
        }
      });
    })(this);
  }

  updateGameStore(identifier, options) {
    let currentGames = JSON.parse(localStorage.getItem('games') || '{}');
    let currentGame = currentGames[identifier] || {};

    currentGames[identifier] = { ...currentGame, ...options };

    localStorage.setItem('games', JSON.stringify(currentGames));
  }

  handleLevelChange(event) {
    localStorage.setItem('level', event.target.value);

    this.handleStartGame(event.target.value);
  }

  handlePayloadChange(event) {
    this.updateGameStore(this.state.identifier, {
      level: this.state.level,
      payload: event.target.value
    });

    this.setState({
      payload: event.target.value
    });
  }

  processedPayload() {
    let processedPayload = this.state.payload;

    _.map(this.state.filters, filter => (
      processedPayload = filter.process(processedPayload)
    ));

    return processedPayload;
  }

  html() {
    let html = this.state.template.replace(/{payload}/, this.processedPayload());

    html = html.replace(/{listener}/, this.state.listenerTemplate);

    return html;
  }

  source() {
    let html = this.state.template.replace(/\s+?{listener}/, '');

    let parts = html.split("{payload}");

    let prefix = parts[0];
    let postfix = parts[1];

    return {
      prefix: prefix,
      payload: this.processedPayload(),
      postfix: postfix,
    }
  }

  handleToggleHelpSection(event) {
    event.preventDefault();

    this.setState({
      helpExpanded: !this.state.helpExpanded
    });
  }

  src() {
    return "data:text/html;charset=utf-8," + escape(this.html());
  }

  emojiState() {
    if(this.state.payload === '') {
      return '😶'
    } else {
      if(this.state.valuePassed) {
        return '🥳';
      } else if(this.state.functionCalled) {
        return '🤭'
      } else {
        return '🧐';
      }
    }
  }

  render() {
    return !this.state.settingUp && (
      <div className="gameBox">
        <div>
          <div>
            <div className="gameHeader">
              The <code>unescape()</code> room
            </div>

            <div className="gameOptions">
              <select onChange={this.handleLevelChange} defaultValue={this.state.level}>
                <option value="trivial">
                  Trivial
                </option>
                <option value="easy">
                  Easy
                </option>
                <option value="medium">
                  Medium
                </option>
                <option value="hard">
                  Hard
                </option>
              </select>

              <button
                onClick={() => this.handleStartGame(this.state.level)}
              >
                New challenge
              </button>
            </div>

            <div className="clearfix" />


            <div>
              <div className="section">
                This game will help you improve your <strong>Cross-Site Scripting</strong>
                {" "}(<strong>XSS</strong>) skills through challenges. Each challenge is made up of
                a template, function, value, and a number of filters. Filters are mitigations based on
                real-world examples and are generated dynamically. It is up to you to find a payload
                that bypasses all filters so it executes the function with the expected argument
                {" "}(<span className="button">example</span>). In case you are not familiar with
                {" "}<strong>XSS</strong> vulnerabilities yet,
                {" "}<a target="_blank" href="https://www.hacker101.com/sessions/xss">
                  check out this video
                </a> to get you up to speed. Good luck!
              </div>

              <div className="section">
                <strong>Current challenge</strong>
              </div>

              <div className="section">
                Find a way around the filters and exploit the vulnerability by calling the
                {" "}
                <code className={classNames('label', {
                  isCompleted: this.state.functionCalled,
                  isPending: !this.state.functionCalled,
                })}>{this.state.functionToBeCalled}</code> function with
                {" "}
                argument
                {" "}
                <code className={classNames('label', {
                  isCompleted: this.state.valuePassed,
                  isPending: !this.state.valuePassed,
                })}>{this.state.valueToBePassed}</code>
                {" "}
                (<code>{typeof this.state.valueToBePassed}</code>). You are up
                {" "}
                against <strong>{this.state.filters.length}</strong> filter
                {this.state.filters.length !== 1 && "s"}.
                {" "}
                Refreshing the page will restart the game.
              </div>
            </div>

            {this.state.helpExpanded && <div>
              <div className="section">
                Hello world. Section 1
              </div>

              <div className="section">
                <span className="button" onClick={this.handleToggleHelpSection}>
                  Got it
                </span>
              </div>
            </div>}

            <div className="card section">
              <div>
                <span className="emoji">
                  {this.emojiState()}
                </span>
                <input
                  className="userPayloadInput"
                  type="text"
                  value={this.state.payload}
                  onChange={this.handlePayloadChange}
                  placeholder='(payload)'
                  autoFocus={true}
                />
              </div>

              <div className="section">
                <pre className="source language-html">
                  <code>
                    {this.source().prefix}
                    <span className="userPayload label">{this.source().payload || '(payload)'}</span>
                    {this.source().postfix}
                  </code>
                </pre>
              </div>

              <iframe style={{ display: 'none' }} src={this.src()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
