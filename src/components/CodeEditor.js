import React, { Component } from 'react';
import classNames from 'classnames';

class CodeEditor extends Component {
  static VIEW_SOURCE = 'view-source';
  static VIEW_DOM = 'view-dom';

  constructor(props) {
    super(props);

    this.state = {
      view: CodeEditor.VIEW_SOURCE
    };
  }

  updateView(view) {
    this.setState({
      view: view
    });
  }

  render() {
    return (
      <div>
        <div className="section">
          <div>
            <div className="left-tab">
              <span
                className={classNames({ "button": this.state.view !== CodeEditor.VIEW_SOURCE })}
                onClick={() => this.updateView(CodeEditor.VIEW_SOURCE)}
              >
                View HTML source
              </span>
            </div>
            <div className="right-tab">
              <span
                className={classNames({ "button": this.state.view !== CodeEditor.VIEW_DOM })}
                onClick={() => this.updateView(CodeEditor.VIEW_DOM)}
              >
                View DOM
              </span>
            </div>
            <div className="clearfix" />
          </div>
          {this.state.view === CodeEditor.VIEW_SOURCE &&
            <div>
              <iframe title="sandbox" className="hidden" src={this.props.source} />

              <pre className="source language-html">
                <code>
                  {this.props.sourcePrefix}
                  <span className="userPayload label">{this.props.sourcePayload || '(payload)'}</span>
                  {this.props.sourcePostfix}
                </code>
              </pre>
            </div>}

          {this.state.view === CodeEditor.VIEW_DOM &&
            <iframe title="sandbox" className="no-border" src={this.props.source} />
          }

          {this.props.currentErrorDescription !== null &&
            <div className="error">
              <strong>Error</strong>:
              {" "}
              <code>{this.props.currentErrorDescription}</code>
              {" "}
              on line {this.props.currentErrorLine}.
            </div>}
        </div>
      </div>
    );
  }
}

export default CodeEditor;
