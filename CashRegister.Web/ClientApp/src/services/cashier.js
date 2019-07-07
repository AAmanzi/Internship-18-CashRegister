import * as api from "./index";
import { CONTROLLER } from "../constants";

export const getAllCashiers = async () => {
  return api.getAll(CONTROLLER.CASHIER).then(response => response.data);
};

export const addCashier = async cashier => {
  return api.post(CONTROLLER.CASHIER, cashier);
};

export const getCashierById = async id => {
  return api.getById(CONTROLLER.CASHIER, id).then(response => response.data);
};

export const validateCashier = async (username, password) => {
  return api
    .validateUser(CONTROLLER.CASHIER, { username, password })
    .then(response => response.data);
};
