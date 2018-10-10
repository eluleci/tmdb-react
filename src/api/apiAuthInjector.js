import { base } from './index';

/**
 * Intercepts the HTTP request and adds the 'api_key' which is required by the TMDb.
 * @param TMDbApiKey
 */
export const addAuthInterceptor = (TMDbApiKey) => {
  base.axios.interceptors.request.use((config) => {
    config.params = { ...(config.params || {}), 'api_key': TMDbApiKey };
    return config;
  });
};
