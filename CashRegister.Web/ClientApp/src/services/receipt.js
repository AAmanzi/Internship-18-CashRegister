import * as api from "./index";
import { CONTROLLER } from "../constants";

export const getAllReceipts = async () => {
  return api.getAll(CONTROLLER.RECEIPT).then(response => response.data);
};

export const getFilteredReceipts = async dateOfReceipt => {
  return api
    .getFiltered(CONTROLLER.RECEIPT, { dateOfReceipt })
    .then(response => response.data);
};

export const addReceipt = async receipt => {
  return api.post(CONTROLLER.RECEIPT, receipt).then(response => response.data);
};

export const getReceiptById = async id => {
  return api.getById(CONTROLLER.RECEIPT, id).then(response => response.data);
};
