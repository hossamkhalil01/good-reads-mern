import { getAxiosObj } from '../services/authService';


const requests = {

  post: async function (url, body = {}, params = {}) {
    return getAxiosObj().post(url, body, { params });
  },

  patch: async function (url, body = {}, params = {}) {
    return getAxiosObj().patch(url, body, { params });
  },

  get: async function (url, params = {}) {
    return getAxiosObj().get(url, { params });
  },

  delete: async function (url, params = {}) {
    return getAxiosObj().get(url, { params });
  }
};

export default requests;