import React, { Component } from 'react';

class CodeEditor extends Component {
  render() {
    return (
      <div>
        <div className="section">
          <pre className="source language-html">
            <code>
              {this.props.sourcePrefix}
              <span className="userPayload label">{this.props.sourcePayload || '(payload)'}</span>
              {this.props.sourcePostfix}
            </code>
          </pre>

          {this.props.currentErrorDescription !== null &&
            <div className="error">
              <strong>Error</strong>:
              {" "}
              <code>{this.props.currentErrorDescription}</code>
              {" "}
              on line {this.props.currentErrorLine}.
            </div>}
        </div>

        <iframe title="sandbox" style={{ display: 'none' }} src={this.props.source} />
      </div>
    );
  }
}

export default CodeEditor;
