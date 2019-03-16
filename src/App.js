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

import Menu from './pages/Menu.js';
import HowTo from './pages/HowTo.js';
import LevelCompleted from './pages/LevelCompleted.js';
import GameOver from './pages/GameOver.js';

import CodeEditor from './components/CodeEditor.js';
import FormattedTime from './components/FormattedTime.js';
import Challenge from './components/Challenge.js';

import Score from './helpers/Score.js';

class App extends Component {
  static MAX_LEVEL = 10;
  static SECONDS_PER_LEVEL = 180;

  constructor(props) {
    super(props);

    this.state = {
      gameState: 'menu'
    };

    this.handlePayloadChange = this.handlePayloadChange.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
  }

  handleEndGame() {
    if(this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({
        timer: null
      });
    }

    if (this.state.eventListener) {
      window.removeEventListener('message', this.state.eventListener);
      this.setState({
        eventListener: null
      });
    }
  }

  handleStartGame(filters, match = true) {
    this.handleEndGame();

    const functionToBeCalled = FunctionGenerator.generate();
    const valueToBePassed = ValueGenerator.generate(filters);
    const htmlTemplate = HtmlTemplateGenerator.generate(filters);

    if (match) {
      this.setState({
        gameState: 'match',
        secondsRemaining: App.SECONDS_PER_LEVEL,
        totalPoints: 0,
        totalTimeSpent: 0,
        timer: (function(_this) {
            return setInterval(() => {
              let newSecondsRemaining = _this.state.secondsRemaining - 1;

              if (newSecondsRemaining < 1) {
                _this.handleEndGame();

                _this.setState({
                  gameState: 'match-over',
                  secondsRemaining: 0
                });
              } else {
                _this.setState({
                  secondsRemaining: newSecondsRemaining
                });
              }
            }, 1000);
          })(this)
      });
    } else {
      this.setState({
        gameState: 'practice'
      });
    }

    this.setState({
      functionCalled: false,
      valuePassed: false,
      template: htmlTemplate,
      payload: '',
      functionToBeCalled: functionToBeCalled,
      valueToBePassed: valueToBePassed,
      currentErrorDescription: null,
      currentErrorLine: null,
      listenerTemplate: ListenerTemplateGenerator.generate(functionToBeCalled),
      filters: FiltersGenerator.generate(htmlTemplate, filters),
      eventListener: (function(_this) {
        window.addEventListener('message', function(event) {
          if (typeof event.data !== 'object') {
            return false;
          }

          switch(event.data.function) {
            case _this.state.functionToBeCalled:
              _this.setState({
                functionCalled: true
              });

              if (event.data.value === _this.state.valueToBePassed) {
                _this.handleEndGame();

                _this.setState({
                  valuePassed: true,
                  currentErrorDescription: null,
                  currentErrorLine: null,
                });

                if (_this.state.gameState !== 'practice') {
                  let totalPoints = _this.state.totalPoints + ((_this.state.filters.length + 1) * _this.state.secondsRemaining);

                  _this.setState({
                    totalPoints: totalPoints,
                    gameState: 'match-level-completed'
                  });

                  Score.setNewHighestScore(totalPoints);
                  Score.setNewHighestLevel(_this.state.filters.length + 1);
                }
              } else {
                _this.setState({
                  valuePassed: false
                });
              }
            break;
            case 'errorHandler':
              _this.setState({
                currentErrorDescription: event.data.error,
                currentErrorLine: event.data.line
              });
            break;
          }
        });
      })(this)
    });
  }

  handlePayloadChange(event) {
    this.setState({
      payload: event.target.value,
      currentErrorLine: null,
      currentErrorDescription: null
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

  renderMenu() {
    return (
      <Menu
        onPractice={() => this.handleStartGame(0, false)}
        onMatch={() => this.handleStartGame(0)}
        highestScore={Score.getCurrentHighestScore()}
        highestLevel={Score.getCurrentHighestLevel()}
        maxLevel={App.MAX_LEVEL}
        onHowTo={this.handleGoHowTo}
      />
    );
  }

  renderPractice() {
    return (
      <div className="gameBox">
        <div>
          <div>
            <div className="gameHeader">
              🎧 Level {this.state.filters.length + 1} (practice)
            </div>

            <div className="gameOptions">
              <select
                style={{ marginRight: '4px' }}
                onChange={(event) => this.handleStartGame(parseInt(event.target.value), false)}
              >
                {_.times(App.MAX_LEVEL, (index) => (
                  <option key={index} value={index}>Level {index + 1}</option>
                ))}
              </select>
              <span className="button"
                onClick={() => {
                  this.handleStartGame(this.state.filters.length, false)
                }}
              >
                New practice level
              </span>
              {" "}
              <span className="button"
                onClick={this.handleGoHome}
              >
                Home
              </span>
            </div>

            <div className="clearfix" />

            <div>
              <div className="section">
                <Challenge
                  functionCalled={this.state.functionCalled}
                  valuePassed={this.state.valuePassed}
                  functionToBeCalled={this.state.functionToBeCalled}
                  valueToBePassed={this.state.valueToBePassed}
                />
              </div>
            </div>

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

              <CodeEditor
                sourcePrefix={this.source().prefix}
                sourcePostfix={this.source().postfix}
                sourcePayload={this.source().payload}
                source={this.src()}
                currentErrorDescription={this.state.currentErrorDescription}
                currentErrorLine={this.state.currentErrorLine}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderMatch() {
    return (
      <div className="gameBox">
        <div>
          <div>
            <div className="gameHeader">
              🎮 Level {this.state.filters.length + 1} of {App.MAX_LEVEL} (game)
            </div>

            <div className="gameOptions">
              <span className="button"
                onClick={() => {
                  this.handleEndGame();
                  this.setState({
                    gameState: 'match-over'
                  });
                }}
              >
                Stop game
              </span>
            </div>

            <div className="clearfix" />

            <div>
              <div className="section">
                <Challenge
                  functionCalled={this.state.functionCalled}
                  valuePassed={this.state.valuePassed}
                  functionToBeCalled={this.state.functionToBeCalled}
                  valueToBePassed={this.state.valueToBePassed}
                />
              </div>
            </div>

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

              <CodeEditor
                sourcePrefix={this.source().prefix}
                sourcePostfix={this.source().postfix}
                sourcePayload={this.source().payload}
                source={this.src()}
                currentErrorDescription={this.state.currentErrorDescription}
                currentErrorLine={this.state.currentErrorLine}
              />

              <div className="section">
                <span className="emoji">⏲</span>
                <strong><FormattedTime seconds={this.state.secondsRemaining} /></strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderMatchOver() {
    return (
      <GameOver
        totalPoints={this.state.totalPoints}
        totalTimeSpent={this.state.totalTimeSpent}
        onPractice={() => this.handleStartGame(0, false)}
        onMatch={() => this.handleStartGame(0)}
        onGoHome={this.handleGoHome}
        filters={this.state.filters}
      />
    );
  }

  renderHowTo() {
    return (
      <HowTo
        onGoHome={this.handleGoHome}
      />
    );
  }

  handleGoHome = () => {
    this.handleEndGame();

    this.setState({ gameState: 'menu' })
  }

  handleGoHowTo = () => {
    this.setState({ gameState: 'howto' })
  }

  renderMatchLevelCompleted() {
    return (
      <LevelCompleted
        totalTimeRemaining={App.SECONDS_PER_LEVEL - this.state.secondsRemaining}
        totalPoints={this.state.totalPoints}
        onNextlevel={() => this.handleStartGame(this.state.filters.length + 1)}
      />
    );
  }

  render() {
    switch (this.state.gameState) {
      case 'menu':
        return this.renderMenu();
      case 'howto':
        return this.renderHowTo();
      case 'practice':
        return this.renderPractice();
      case 'match':
        return this.renderMatch();
      case 'match-over':
        return this.renderMatchOver();
      case 'match-level-completed':
        return this.renderMatchLevelCompleted();
      default:
        return <span />;
    }
  }
}

export default App;
