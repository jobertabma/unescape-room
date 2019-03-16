import React, { Component } from 'react';

import CodeEditor from './CodeEditor.js';

class Sandbox extends Component {
  render() {
    return (
      <div>
        <div>
          <input
            className="userPayloadInput"
            type="text"
            value={this.props.payload}
            onChange={this.props.onPayloadChange}
            placeholder='(payload)'
            autoFocus={true}
          />
        </div>

        <CodeEditor
          sourcePrefix={this.props.sourcePrefix}
          sourcePostfix={this.props.sourcePostfix}
          sourcePayload={this.props.sourcePayload}
          source={this.props.source}
          currentErrorDescription={this.props.currentErrorDescription}
          currentErrorLine={this.props.currentErrorLine}
        />
      </div>
    )
  }
}

export default Sandbox;
