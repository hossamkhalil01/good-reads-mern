import { getAxiosObj } from '../services/authService';


const requests = {

  create: async function (url, body = {}, params = {}) {
    return getAxiosObj().post(url, body, { params });
  },

  update: async function (url, body = {}, params = {}) {
    return getAxiosObj().patch(url, body, { params });
  },

  get: async function (url, params = {}) {
    return getAxiosObj().get(url, { params });
  },

  delete: async function (url, params = {}) {
    return getAxiosObj().delete(url, { params });
  }
};

export default requests;