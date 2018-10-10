export class ApiError {

  constructor({ isNetworkError, isClientError, ...meta }) {
    this.isNetworkError = isNetworkError;
    this.isClientError = isClientError;
    this.meta = meta;
  }
}

export class Genre {

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

export class Movie {

  constructor(data) {
    this.adult = data.adult;
    this.genreIds = data.genre_ids;
    this.id = data.id;
    this.originalLanguage = data.original_language;
    this.originalTitle = data.original_title;
    this.overview = data.overview;
    this.popularity = data.popularity;
    this.posterPath = data.poster_path;
    this.releaseDate = data.release_date;
    this.title = data.title;
    this.video = data.video;
    this.voteAverage = data.vote_average;
    this.voteCount = data.vote_count;
  }
}
