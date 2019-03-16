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
            <div style={{ width: "50%", float: "left", textAlign: "center" }}>
              <span
                className={classNames({ "button": this.state.view !== CodeEditor.VIEW_SOURCE })}
                onClick={() => this.updateView(CodeEditor.VIEW_SOURCE)}
              >
                View HTML source
              </span>
            </div>
            <div style={{ width: "50%", float: "right", textAlign: "center" }}>
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
              <iframe title="sandbox" style={{ display: 'none' }} src={this.props.source} />

              <pre className="source language-html">
                <code>
                  {this.props.sourcePrefix}
                  <span className="userPayload label">{this.props.sourcePayload || '(payload)'}</span>
                  {this.props.sourcePostfix}
                </code>
              </pre>
            </div>}

          {this.state.view === CodeEditor.VIEW_DOM &&
            <iframe title="sandbox" style={{ border: 0 }} src={this.props.source} />
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
