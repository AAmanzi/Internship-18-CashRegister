import * as api from "./index";
import { CONTROLLER } from "../constants";

export const getAllProducts = async () => {
  return api.getAll(CONTROLLER.PRODUCT).then(response => response.data);
};

export const getFilteredProducts = async filter => {
  return api
    .getFiltered(CONTROLLER.PRODUCT, { filter })
    .then(response => response.data);
};

export const addProduct = async product => {
  return api.post(CONTROLLER.PRODUCT, product).then(response => response.data);
};

export const getProductById = async id => {
  return api.getById(CONTROLLER.PRODUCT, id).then(response => response.data);
};

export const editProduct = async editedProduct => {
  return api
    .edit(CONTROLLER.PRODUCT, editedProduct)
    .then(response => response.data);
};
