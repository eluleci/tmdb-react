import * as ui from './ui';
import { SET_GENRE_FILTER, SET_RATING_FILTER } from '../constants/actions'

describe('ui store', () => {

  it('updates genre filter only', () => {
    const state = {
      movieFilter: {
        genres: [],
        rating: 3,
      },
    };

    const action = {
      type: SET_GENRE_FILTER,
      payload: {
        genres: [1],
      },
    };

    const newState = ui.store(state, action)
    expect(newState.movieFilter.genres).toEqual([1]);
    expect(newState.movieFilter.rating).toEqual(3);
  });

  it('updates rating filter only', () => {
    const state = {
      movieFilter: {
        genres: [],
        rating: 3,
      },
    };

    const action = {
      type: SET_RATING_FILTER,
      payload: {
        rating: 7,
      },
    };

    const newState = ui.store(state, action)
    expect(newState.movieFilter.genres).toEqual([]);
    expect(newState.movieFilter.rating).toEqual(7);
  });
})
