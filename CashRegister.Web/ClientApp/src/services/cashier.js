import * as api from "./index";
import { CONTROLLER } from "../constants";

export const getAllCashiers = async () => {
  return api.getAll(CONTROLLER.CASHIER).then(response => response.data);
};

export const getCashierById = async id => {
  return api.getById(CONTROLLER.CASHIER, id).then(response => response.data);
};
