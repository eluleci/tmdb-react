import {
  FETCH_MOVIES,

  STATUS_START,
  STATUS_SUCCESS,
  STATUS_ERROR, FETCH_GENRES,
} from '../constants/actions';

import { ApiError, Genre, Movie } from '../models';

export const initialState = {
  moviesNowPlaying: {
    error: undefined,
    isPending: false,
    list: undefined,
  },
  genres: {
    error: undefined,
    genresByIds: undefined,
    isPending: false,
  },
}

/**
 * Returns a new store based on the given state and the action.
 * @param state to evaluate action for.
 * @param action to handle.
 * @returns new state.
 */
export function store(state = initialState, action) {

  const { payload, status, type } = action;

  switch (type) {
    case FETCH_MOVIES:
      switch (status) {
        case STATUS_START: {

          // update moviesNowPlaying.isPending
          return {
            ...state,
            moviesNowPlaying: {
              ...state.moviesNowPlaying,
              isPending: true,
              error: undefined,
            },
          };
        }
        case STATUS_SUCCESS: {

          // update moviesNowPlaying.list and moviesNowPlaying.isPending
          return {
            ...state,
            moviesNowPlaying: {
              ...state.moviesNowPlaying,
              isPending: false,
              list: (payload.results || []).map(data => new Movie(data)),
            },
          };
        }
        case STATUS_ERROR: {

          // update moviesNowPlaying.error and moviesNowPlaying.isPending
          return {
            ...state,
            moviesNowPlaying: {
              ...state.moviesNowPlaying,
              isPending: false,
              error: new ApiError(payload.error),
            },
          };
        }
        default:
          return state;
      }

    case FETCH_GENRES:
      switch (status) {
        case STATUS_START: {

          // update genres.isPending
          return {
            ...state,
            genres: {
              ...state.genres,
              isPending: true,
              error: undefined,
            },
          };
        }
        case STATUS_SUCCESS: {

          // update genres.isPending and genres.genresByIds
          const genresByIds = {};
          (payload.results || []).forEach(data => genresByIds[data.id] = new Genre(data));

          return {
            ...state,
            genres: {
              ...state.genres,
              isPending: false,
              genresByIds,
            },
          };
        }
        case STATUS_ERROR: {

          // update genres.isPending and genres.error
          return {
            ...state,
            genres: {
              ...state.genres,
              isPending: false,
              error: new ApiError(payload.error),
            },
          };
        }
        default:
          return state;
      }

    default:
      return state;
  }
}
