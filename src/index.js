import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import configureStore from './reducers/configureStore';

import './index.css';
import App from './components/App/App';

// Configure store that will be bassed to the Provider component.
const store = configureStore(reducers.initialState);

// Render the app.
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);
