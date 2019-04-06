import React, { Component } from "react";
import classNames from "classnames";

class Challenge extends Component {
  render() {
    return (
      <div>
        <strong>Challenge:</strong> call the{" "}
        <code
          className={classNames("label", {
            isCompleted: this.props.functionCalled,
            isPending: !this.props.functionCalled
          })}
        >
          {this.props.functionToBeCalled}
        </code>{" "}
        function with argument{" "}
        <code
          className={classNames("label", {
            isCompleted: this.props.valuePassed,
            isPending: !this.props.valuePassed
          })}
        >
          {this.props.valueToBePassed}
        </code>{" "}
        (<code>{typeof this.props.valueToBePassed}</code>) by exploiting the{" "}
        <strong>XSS</strong> vulnerability.
      </div>
    );
  }
}

export default Challenge;
