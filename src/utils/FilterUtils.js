/**
 * Checks if the movie satisfies the genre filter.
 * @param genreFilter to check against.
 * @param movie to check.
 * @returns {boolean} true if satisfies.
 */
export const satisfiesGenreFilter = (genreFilter = [], movie) => {
  for (let i = 0; i < genreFilter.length; i++) {
    if ((movie.genreIds || []).indexOf(genreFilter[i]) === -1) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if the movie's rating is greater than or equal to the given rating.
 * @param rating to check against.
 * @param movie to check.
 * @returns {boolean} true if satisfies.
 */
export const satisfiesRatingFilter = (rating = 3, movie) => {
  return movie.voteAverage >= rating;
}

/**
 * Filters the movies based on the given filter.
 * @param movies to filter.
 * @param filter to filter the movies against.
 * @returns {*}
 */
export const filterMovies = (movies, filter) => {
  if (!movies) {
    return movies;
  }
  return movies.filter(movie => (
    satisfiesGenreFilter(filter.genres, movie) && satisfiesRatingFilter(filter.rating, movie))
  );
}

/**
 * Returns the ids of the genres of the given movies.
 * @param movies
 * @returns {Array}
 */
export const getAvailableGenreIdsFromMovies = (movies = []) => {
  // stores the ids already put in the list
  const idMap = {};

  // stores the unique genre id list
  const genreIds = [];

  movies.forEach(movie => {
    movie.genreIds.forEach(genreId => {

      if (!idMap[genreId]) {
        // add the genre id if not added before
        idMap[genreId] = true;
        genreIds.push(genreId);
      }
    })
  })

  return genreIds;
}
