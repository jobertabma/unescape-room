import _ from 'underscore';
import React, { Component } from 'react';

import CodeEditor from './CodeEditor.js';

import Atob from '../filters/Atob.js';

class Sandbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payload: ''
    };

    this.transformPayload = this.transformPayload.bind(this);
  }

  hasAtobFilter() {
    return _.some(this.props.filters, (item) => (
      item instanceof Atob
    ));
  }

  transformPayload(event) {
    this.setState({
      payload: event.target.value
    });

    this.props.onPayloadChange(btoa(event.target.value));
  }

  render() {
    return (
      <div>
        <div>
          {this.hasAtobFilter() &&
            <input
              className="userPayloadInput"
              type="text"
              value={this.state.payload}
              onChange={this.transformPayload}
              style={{ marginBottom: "15px" }}
              placeholder='(payload)'
            />}

          <input
            className="userPayloadInput"
            type="text"
            value={this.props.payload}
            onChange={(event) => this.props.onPayloadChange(event.target.value)}
            placeholder={this.hasAtobFilter() ? '(transformed payload)' : '(payload)'}
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
