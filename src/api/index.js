import APIBase from './base';
import config from '../config';

export const base = new APIBase(config.tmdb.endpoint);

/**
 * Returns the path for loading poster images.
 *
 * @param posterPath of the movie.
 * @returns {string} full path.
 */
export function getPosterEndpoint(posterPath) {
  return `${config.tmdb.endpointPoster}/${posterPath}`
}

export default {
  /**
   * Fetches the now playing movie list which is sorted by popularity.
   * @returns {*}
   */
  getNowPlayingMovies: () => base.get('movie/now_playing', {
    'sort_by': 'popularity.desc',
  }),

  /**
   * Fetches the all genre list.
   * @returns {*}
   */
  getGenreList: () => base.get('genre/movie/list'),
}
