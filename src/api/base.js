import axios from 'axios';
import { ApiError } from '../models'

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export default class APIBase {

  constructor(endpoint, headers = {}) {
    this.axios = axios.create({
      baseURL: endpoint,
      headers: { ...defaultHeaders, ...headers },
      timeout: 10000,
    });
  }

  post(url, body) {
    return this.send('post', `/${url}`, body);
  }

  put(url, body) {
    return this.send('put', `/${url}`, body);
  }

  delete(url) {
    return this.send('delete', `/${url}`);
  }

  get(url, params = {}) {
    return this.send('get', `/${url}`, params);
  }

  send(method, url, data) {

    // join array fields with ',' in query
    const param = method === 'get' ? data : null;
    if (param) {
      Object.keys(param).forEach(key => {
        if (param[key] instanceof Array) {
          param[key] = param[key].join(',');
        }
      });
    }

    return this.axios.request({
      data: method !== 'get' ? data : null,
      headers: this.headers,
      method,
      params: method === 'get' ? data : null,
      url,
    }).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new ApiError(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new ApiError({ isNetworkError: true });
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new ApiError({ isNetworkError: false, isClientError: true });
      }
    });
  }
}
