import axios from "axios";
import { API_ROUTE } from "../constants";

export const getAll = controller => {
  return axios.get(`${API_ROUTE}/${controller}/all`);
};

export const getById = (controller, id) => {
  return axios.get(`${API_ROUTE}/${controller}/get-by-id`, {
    params: {
      id
    }
  });
};

export const post = (controller, data) => {
  return axios.post(`${API_ROUTE}/${controller}/add`, {
    ...data
  });
};
