import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="section">
          Made with ❤️ for the hacker community by <a href="https://twitter.com/jobertabma" rel="noopener noreferrer" target="_blank">@jobertabma</a>
          {" "}of
          {" "}<a href="https://hackerone.com" rel="noopener noreferrer" target="_blank">HackerOne</a>
        </div>
      </footer>
    );
  }
}
