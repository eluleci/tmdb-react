import {
  SET_GENRE_FILTER,
  SET_RATING_FILTER,
} from '../constants/actions';

export const initialState = {
  movieFilter: {
    genres: [],
    rating: 3,
  },
}

/**
 * Returns a new store based on the given state and the action.
 * @param state to evaluate action for.
 * @param action to handle.
 * @returns new state.
 */
export function store(state = initialState, action) {

  const { payload, type } = action;

  switch (type) {

    case SET_GENRE_FILTER:

      // update movieFilter.genres
      return {
        ...state,
        movieFilter: {
          ...state.movieFilter,
          genres: payload.genres,
        }
      };

    case SET_RATING_FILTER:

      // update movieFilter.rating
      return {
        ...state,
        movieFilter: {
          ...state.movieFilter,
          rating: payload.rating,
        }
      };
    default:
      return state;
  }
}
