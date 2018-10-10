import React, { Component } from 'react';
import './TopBar.css';

/**
 * Displays the top bar of application. Forwards the user to '/' (reloads the page) when title is clicked.
 */
class TopBar extends Component {

  render() {
    return (
      <header className="top-bar">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="bar">
                <a href="/"><b>TMDb Showcase</b></a>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default TopBar;
