import React, { Component } from 'react';

import TopBar from '../TopBar';
import MovieList from '../MovieList';

/**
 * The root component of the app.
 */
class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <MovieList />
      </div>
    );
  }
}

export default App;
