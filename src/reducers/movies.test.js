import * as movies from './movies';
import { FETCH_GENRES, FETCH_MOVIES, STATUS_ERROR, STATUS_START, STATUS_SUCCESS } from '../constants/actions'
import { ApiError, Genre, Movie } from '../models'

describe('modification of genre in movie store', () => {

  it('updates isPending and error of genres', () => {
    const state = {
      moviesNowPlaying: {
        error: new ApiError({}),
        isPending: false,
        list: undefined,
      },
      genres: {
        error: undefined,
        genresByIds: undefined,
        isPending: false,
      },
    };

    const action = {
      type: FETCH_GENRES,
      status: STATUS_START,
      payload: {},
    };

    const newState = movies.store(state, action)
    expect(newState.genres.isPending).toBe(true);
    expect(newState.genres.error).toBe(state.genres.error);
    expect(newState.genres.genresByIds).toBe(state.genres.genresByIds);
    expect(newState.moviesNowPlaying).toEqual(state.moviesNowPlaying);
  });

  it('updates isPending and genresByIds of genres', () => {
    const state = {
      moviesNowPlaying: {
        error: undefined,
        isPending: true,
        list: undefined,
      },
      genres: {
        error: undefined,
        genresByIds: undefined,
        isPending: false,
      },
    };

    const genre = new Genre({ id: 1, name: 'Drama' });
    const action = {
      type: FETCH_GENRES,
      status: STATUS_SUCCESS,
      payload: { results: [genre] },
    };

    const newState = movies.store(state, action)
    expect(newState.genres.isPending).toBe(false);
    expect(newState.genres.error).toBe(state.genres.error);
    expect(newState.genres.genresByIds).toEqual({ 1: genre });
    expect(newState.moviesNowPlaying).toEqual(state.moviesNowPlaying);
  });

  it('updates isPending and error of genres', () => {
    const state = {
      moviesNowPlaying: {
        error: undefined,
        isPending: true,
        list: undefined,
      },
      genres: {
        error: undefined,
        genresByIds: undefined,
        isPending: false,
      },
    };

    const error = { a: 'b' };
    const action = {
      type: FETCH_GENRES,
      status: STATUS_ERROR,
      payload: { error },
    };

    const newState = movies.store(state, action)
    expect(newState.genres.isPending).toBe(false);
    expect(newState.genres.error).toEqual(new ApiError({ a: 'b' }));
    expect(newState.genres.genresByIds).toEqual(state.genres.genresByIds);
    expect(newState.moviesNowPlaying).toEqual(state.moviesNowPlaying);
  });
})

describe('modification of moviesNowPlaying in movie store', () => {

  it('updates isPending and error of moviesNowPlaying', () => {
    const state = {
      moviesNowPlaying: {
        error: undefined,
        isPending: false,
        list: undefined,
      },
      genres: {
        error: new ApiError({}),
        genresByIds: undefined,
        isPending: false,
      },
    };

    const action = {
      type: FETCH_MOVIES,
      status: STATUS_START,
      payload: {},
    };

    const newState = movies.store(state, action)
    expect(newState.moviesNowPlaying.isPending).toBe(true);
    expect(newState.moviesNowPlaying.error).toBe(state.moviesNowPlaying.error);
    expect(newState.moviesNowPlaying.list).toEqual(state.moviesNowPlaying.list);
    expect(newState.genres).toEqual(state.genres);
  });

  it('updates isPending and list of moviesNowPlaying', () => {
    const state = {
      moviesNowPlaying: {
        error: undefined,
        isPending: true,
        list: undefined,
      },
      genres: {
        error: undefined,
        genresByIds: undefined,
        isPending: false,
      },
    };

    const movie = new Movie({ id: 1, title: 'Inception' });
    const action = {
      type: FETCH_MOVIES,
      status: STATUS_SUCCESS,
      payload: { results: [movie] },
    };

    const newState = movies.store(state, action)
    expect(newState.moviesNowPlaying.isPending).toBe(false);
    expect(newState.moviesNowPlaying.error).toBe(state.moviesNowPlaying.error);
    expect(newState.moviesNowPlaying.list).toEqual([movie]);
    expect(newState.genres).toEqual(state.genres);
  });

  it('updates isPending and error of moviesNowPlaying', () => {
    const state = {
      moviesNowPlaying: {
        error: undefined,
        isPending: true,
        list: undefined,
      },
      genres: {
        error: undefined,
        genresByIds: undefined,
        isPending: false,
      },
    };

    const error = { a: 'b' };
    const action = {
      type: FETCH_MOVIES,
      status: STATUS_ERROR,
      payload: { error },
    };

    const newState = movies.store(state, action)
    expect(newState.moviesNowPlaying.isPending).toBe(false);
    expect(newState.moviesNowPlaying.error).toEqual(new ApiError({ a: 'b' }));
    expect(newState.moviesNowPlaying.genresByIds).toEqual(state.moviesNowPlaying.list);
    expect(newState.genres).toEqual(state.genres);
  });
})
