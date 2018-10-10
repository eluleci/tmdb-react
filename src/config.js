/**
 * Contains the configuration of the app. Configuration is detected based on the process environment.
 */
let config;
switch (process.env.NODE_ENV) {
  case 'development':
    config = {
      logger: true,
      tmdb: {
        apiKey: '968cca12b1a8492036b1e1e05af57e3f',
        endpoint: 'https://api.themoviedb.org/3/',
        endpointPoster: 'http://image.tmdb.org/t/p/w500/',
      }
    }
    break;
  case 'production':
  default:
    config = {
      logger: false,
      tmdb: {
        apiKey: '968cca12b1a8492036b1e1e05af57e3f',
        endpoint: 'https://api.themoviedb.org/3/',
        endpointPoster: 'http://image.tmdb.org/t/p/w500/',
      }
    }
}

export default config;
