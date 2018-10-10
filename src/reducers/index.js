import { combineReducers } from 'redux';

import * as movies from './movies';
import * as ui from './ui';

// Combine all reducers into the store
export default combineReducers({
  movies: movies.store,
  ui: ui.store,
});

// Generate initial state by getting initial state of each store
export const initialState = {
  movies: movies.initialState,
  ui: ui.initialState,
}
