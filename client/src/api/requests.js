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

// const getResource = (url, headers = {}, options = {}) => {
//   return fetch(hostUrl + url, {
//     method: "get",
//     headers: {
//       ...defaultRequestHeaders,
//       ...headers,
//     },
//   });
// };

// const putResource = (url, headers = {}, body = {}, options = {}) => {
//   return fetch(hostUrl + url, {
//     method: "PUT",
//     headers: {
//       ...defaultRequestHeaders,
//       ...headers,
//     },
//     body: JSON.stringify(body),
//   });
// };

// const postResource = (url, headers = {}, body = {}, options = {}) => {
//   return fetch(hostUrl + url, {
//     method: "post",
//     headers: {
//       ...defaultRequestHeaders,
//       ...headers,
//     },
//     body: JSON.stringify(body),
//   });
// };
