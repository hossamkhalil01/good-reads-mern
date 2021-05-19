import { hostUrl } from "./urls";

const defaultRequestHeaders = {
  Authorization: "",
  Accept: "application/json",
  "Content-Type": "application/json",
};

const getResource = (url, headers = {}, options = {}) => {
  return fetch(hostUrl + url, {
    method: "get",
    headers: {
      ...defaultRequestHeaders,
      ...headers,
    },
  });
};

const putResource = (url, headers = {}, body = {}, options = {}) => {
  return fetch(hostUrl + url, {
    method: "PUT",
    headers: {
      ...defaultRequestHeaders,
      ...headers,
    },
    body: JSON.stringify(body),
  });
};

const postResource = (url, headers = {}, body = {}, options = {}) => {
  return fetch(hostUrl + url, {
    method: "post",
    headers: {
      ...defaultRequestHeaders,
      ...headers,
    },
    body: JSON.stringify(body),
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getResource,
  putResource,
  postResource,
};
