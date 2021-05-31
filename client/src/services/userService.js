import requests from "../api/requests";
import { usersBase } from "../api/urls";

export const getUser = async (id) => {
  return await requests.get(`${usersBase}${id}`);
};


export const updateUser = async (id, body) => {
  return await requests.update(usersBase + id, body);
};