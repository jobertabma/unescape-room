import React, { Component } from 'react';

class FormattedTime extends Component {
  minutes() {
    return String(Math.floor(this.props.seconds / 60)).padStart(2, '0');
  }

  seconds() {
    return String(this.props.seconds % 60).padStart(2, '0')
  }

  render() {
    return (
      <span>
        {this.minutes()}:{this.seconds()}s
      </span>
    );
  }
}

export default FormattedTime;
