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
import Match from './pages/Match.js';
import Practice from './pages/Practice.js';

import CodeEditor from './components/CodeEditor.js';
import FormattedTime from './components/FormattedTime.js';
import Challenge from './components/Challenge.js';
import Footer from './components/Footer.js';

import Score from './helpers/Score.js';

class App extends Component {
  static MAX_LEVEL = 10;
  static SECONDS_PER_LEVEL = 180;

  static GAME_STATE_MENU = 'menu';
  static GAME_STATE_HOW_TO = 'howto';
  static GAME_STATE_PRACTICE = 'practice';
  static GAME_STATE_MATCH = 'match';
  static GAME_STATE_MATCH_LEVEL_COMPLETE = 'match-level-complete';
  static GAME_STATE_MATCH_OVER = 'match-over';

  constructor(props) {
    super(props);

    this.state = {
      gameState: App.GAME_STATE_MENU
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

  handleCreateLevel(filters, match = true) {
    this.handleEndGame();

    const functionToBeCalled = FunctionGenerator.generate();
    const valueToBePassed = ValueGenerator.generate(filters);
    const htmlTemplate = HtmlTemplateGenerator.generate(filters);

    if (match) {
      this.setState({
        gameState: App.GAME_STATE_MATCH,
        secondsRemaining: App.SECONDS_PER_LEVEL,
        timer: (function(_this) {
            return setInterval(() => {
              let newSecondsRemaining = _this.state.secondsRemaining - 1;

              if (newSecondsRemaining < 1) {
                _this.handleEndGame();

                _this.setState({
                  gameState: App.GAME_STATE_MATCH_OVER,
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
        gameState: App.GAME_STATE_PRACTICE
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
      filters: FiltersGenerator.generate(htmlTemplate, functionToBeCalled, valueToBePassed, filters),
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

                if (_this.state.gameState !== App.GAME_STATE_PRACTICE) {
                  let totalPoints = _this.state.totalPoints + _this.state.secondsRemaining;
                  let totalTimeSpent = _this.state.totalTimeSpent + (App.SECONDS_PER_LEVEL - _this.state.secondsRemaining);

                  _this.setState({
                    totalPoints: totalPoints,
                    totalTimeSpent: totalTimeSpent,
                    gameState: App.GAME_STATE_MATCH_LEVEL_COMPLETE
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

  handleStartGame(filters, match = true) {
    this.setState({
      totalPoints: 0,
      totalTimeSpent: 0
    });

    this.handleCreateLevel(filters, match);
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
      <Practice
        currentLevel={this.state.filters.length + 1}
        maxLevel={App.MAX_LEVEL}
        onGoHome={this.handleGoHome}
        onNewPracticeLevel={() => {
          this.handleStartGame(this.state.filters, false)
        }}
        onStartGame={(value) => {
          this.handleStartGame(parseInt(value), false)
        }}
        functionCalled={this.state.functionCalled}
        functionToBeCalled={this.state.functionToBeCalled}
        valuePassed={this.state.valuePassed}
        valueToBePassed={this.state.valueToBePassed}
        payload={this.state.payload}
        onPayloadChange={this.handlePayloadChange}
        sourcePrefix={this.source().prefix}
        sourcePostfix={this.source().postfix}
        sourcePayload={this.source().payload}
        source={this.src()}
        currentErrorDescription={this.state.currentErrorDescription}
        currentErrorLine={this.state.currentErrorLine}
      />
    );
  }

  renderMatch() {
    return (
      <Match
        currentLevel={this.state.filters.length + 1}
        maxLevel={App.MAX_LEVEL}
        onStop={() => {
          this.handleEndGame();
          this.setState({
            gameState: App.GAME_STATE_MATCH_OVER
          })}}
        functionCalled={this.state.functionCalled}
        functionToBeCalled={this.state.functionToBeCalled}
        valuePassed={this.state.valuePassed}
        valueToBePassed={this.state.valueToBePassed}
        payload={this.state.payload}
        onPayloadChange={this.handlePayloadChange}
        sourcePrefix={this.source().prefix}
        sourcePostfix={this.source().postfix}
        sourcePayload={this.source().payload}
        source={this.src()}
        currentErrorDescription={this.state.currentErrorDescription}
        currentErrorLine={this.state.currentErrorLine}
        secondsRemaining={this.state.secondsRemaining}
      />
    )
  }

  renderMatchOver() {
    return (
      <GameOver
        totalPoints={this.state.totalPoints}
        totalTimeSpent={this.state.totalTimeSpent}
        onPractice={() => this.handleStartGame(this.state.filters.length, false)}
        onMatch={() => this.handleStartGame(0)}
        shareMessage={`I just completed a game of the unescape() room to improve my XSS skills — I scored ${this.state.totalPoints} points and made it to level ${this.state.filters.length + 1}! https://unescape-room.jobertabma.nl`}
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

    this.setState({ gameState: App.GAME_STATE_MENU })
  }

  handleGoHowTo = () => {
    this.setState({ gameState: App.GAME_STATE_HOW_TO })
  }

  renderMatchLevelCompleted() {
    return (
      <LevelCompleted
        totalTimeRemaining={App.SECONDS_PER_LEVEL - this.state.secondsRemaining}
        totalPoints={this.state.totalPoints}
        onNextlevel={() => this.handleCreateLevel(this.state.filters.length + 1)}
        hasNextLevel={this.state.filters.length + 1 < App.MAX_LEVEL}
        onFinish={() => this.setState({ gameState: App.GAME_STATE_MATCH_OVER })}
      />
    );
  }

  render() {
    switch (this.state.gameState) {
      case App.GAME_STATE_MENU:
        return this.renderMenu();
      case App.GAME_STATE_HOW_TO:
        return this.renderHowTo();
      case App.GAME_STATE_PRACTICE:
        return this.renderPractice();
      case App.GAME_STATE_MATCH:
        return this.renderMatch();
      case App.GAME_STATE_MATCH_OVER:
        return this.renderMatchOver();
      case App.GAME_STATE_MATCH_LEVEL_COMPLETE:
        return this.renderMatchLevelCompleted();
      default:
        return <span />;
    }
  }
}

export default App;
