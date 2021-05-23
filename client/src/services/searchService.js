import requests from "../api/requests";
import { getSearchUrl } from "../api/urls";

export const getSearchResult = (searchKey) => {
  return requests.get(getSearchUrl(searchKey));
};
