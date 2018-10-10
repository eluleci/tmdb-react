import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchGenres, fetchMovies } from '../../actions/movies';
import { filterMovies } from '../../utils/FilterUtils';
import MovieCell from '../MovieCell'
import { ApiError, Movie } from '../../models';
import MovieListFilter from '../MovieListFilter'

/**
 * Shows the movie filter and the list. Loads the genres and the movie list.
 */
export class MovieList extends Component {

  static propTypes = {
    error: PropTypes.instanceOf(ApiError),
    fetchGenres: PropTypes.func.isRequired,
    fetchMovies: PropTypes.func.isRequired,
    isPending: PropTypes.bool,
    movies: PropTypes.arrayOf(PropTypes.instanceOf(Movie)),
    genres: PropTypes.object,
  }

  static defaultProps = {
    error: undefined,
    isPending: false,
    movies: undefined,
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate() {
    this.fetchData();
  }

  /**
   * Fetches the movie and genre list if needed.
   */
  fetchData() {
    const { error, genres, isPending, movies } = this.props;

    if (!error && !isPending) {
      if (!movies) {
        this.props.fetchMovies();
      } else if (!genres) {
        this.props.fetchGenres();
      }
    }
  }

  render() {
    const { error, genres, isPending, movies } = this.props;

    return (
      <div className="container">
        {isPending &&
        <div className="progress text-center with-padding">
          Loading ...
        </div>
        }

        {error &&
        <div className="error text-center text-error with-padding">
          Movie list couldn't be fetched.
        </div>
        }

        {genres && movies &&
        <div className="row">
          <div className="col-sm-12">
            <MovieListFilter />
          </div>
        </div>
        }

        {genres && movies &&
        <div className="row ">
          {movies.map(movie => (
            <div className="col-sm-12 col-md-4 col-lg-3" key={movie.id}>
              <MovieCell genres={genres} movie={movie} />
            </div>
          ))}
        </div>
        }

      </div>
    )
  }
}

/**
 * Gets the values from the redux store and passes as props to the component.
 * @param state is the redux store state.
 */
const mapStateToProps = state => {
  return {
    error: state.movies.moviesNowPlaying.error || state.movies.genres.error,
    genres: state.movies.genres.genresByIds,
    isPending: state.movies.moviesNowPlaying.isPending || state.movies.genres.isPending,
    movies: filterMovies(state.movies.moviesNowPlaying.list, state.ui.movieFilter),
  }
}

/**
 * Passes the actions to the component.
 * @type {{fetchGenres: fetchGenres, fetchMovies: fetchMovies}}
 */
const mapDispatchToProps = {
  fetchGenres,
  fetchMovies,
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
