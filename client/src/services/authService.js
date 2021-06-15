import axios from "axios";
import moment from "moment";
import { hostUrl } from "../api/urls";

export function setLocalStorage(responseObj) {
  const expires = moment().add(Number.parseInt(responseObj.expiresIn), "days");
  localStorage.setItem("token", responseObj.token);
  localStorage.setItem("expiresIn", JSON.stringify(expires.valueOf()));
  localStorage.setItem("user", JSON.stringify(responseObj.user));
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("user");
}

function getExpiration() {
  const expires = JSON.parse(localStorage.getItem("expiresIn"));
  return moment(expires);
}

export function checkTokenValid() {
  if (!moment().isBefore(getExpiration(), "second")) {
    logout();
  }
}

const accessToken = localStorage.getItem("token");

export const currentUser = JSON.parse(localStorage.getItem("user"));

export let authAxios = null

export const getAxiosObj = () => {

  if (!authAxios) {
    authAxios = (axios.create({
      baseURL: hostUrl,
      headers: {
        Authorization: accessToken,
      },
    }))
  }
  return authAxios;
}