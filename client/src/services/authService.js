import axios from "axios";
import moment from "moment";
import { BaseURL } from "../api/urls";

export default function setLoclaStorage(responseObj) {
  const expires = moment().add(responseObj.expiresIn);

  localStorage.setItem("token", responseObj.token);
  localStorage.setItem("expiresIn", JSON.stringify(expires.valueOf()));
  localStorage.setItem("user", JSON.stringify(responseObj.user));
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expires");
  localStorage.removeItem("user");
}

function getExpiration() {
  const expires = JSON.parse(localStorage.getItem("expires"));
  return moment(expires);
}

const accessToken = localStorage.getItem("token");
export const user = JSON.parse(localStorage.getItem("user"));

export const authAxios = axios.create({
  baseURL: BaseURL,
  headers: {
    Authorization: accessToken,
  },
});
