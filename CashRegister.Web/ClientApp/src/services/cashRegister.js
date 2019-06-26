import * as api from "./index";
import { CONTROLLER } from "../constants";

export const getAllCashRegisters = async () => {
  return api.getAll(CONTROLLER.CASH_REGISTER).then(response => response.data);
};

export const getCashRegisterById = async id => {
  return api
    .getById(CONTROLLER.CASH_REGISTER, id)
    .then(response => response.data);
};
