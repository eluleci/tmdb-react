export default function () {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        TMDbApiKey: '968cca12b1a8492036b1e1e05af57e3f',
      }
    case 'production':
    default:
      return {
        // change this for production
        TMDbApiKey: '968cca12b1a8492036b1e1e05af57e3f',
      }
  }
}
