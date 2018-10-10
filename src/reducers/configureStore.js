import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import config from '../config';
import rootReducer from './index';
import { addAuthInterceptor } from '../api/apiAuthInjector';

export default function configureStore(initialState) {

  // add the api key of TMDb for all requests
  addAuthInterceptor(config.tmdb.apiKey);

  const middlewares = [
    // thunk middleware lets us return functions in actions instead of objects. useful for async actions
    thunkMiddleware,
  ]

  if (config.logger) {
    // add logger middleware if allowed in config
    // logger middleware logs the redux actions
    middlewares.push(createLogger({ collapsed: true }));
  }

  return createStore(
    // add all of the stores in the app
    rootReducer,

    // set the initial state of the redux store
    initialState,

    applyMiddleware(...middlewares),
  );
}