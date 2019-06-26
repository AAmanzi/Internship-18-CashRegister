import * as api from "./index";
import { CONTROLLER } from "../constants";

export const getAllReceiptProducts = async () => {
  return api.getAll(CONTROLLER.RECEIPT_PRODUCT).then(response => response.data);
};

export const getFilteredReceiptProducts = async receiptId => {
  return api
    .getFiltered(CONTROLLER.RECEIPT_PRODUCT, { receiptId })
    .then(response => response.data);
};

export const addReceiptProduct = async receiptProduct => {
  return api.post(CONTROLLER.RECEIPT_PRODUCT, receiptProduct);
};

export const getReceiptProductByPrimaryKey = async id => {};

// export const editReceiptProduct = async editedReceiptProduct => {
//   return api.edit(CONTROLLER.RECEIPT_PRODUCT, editedReceiptProduct);
// };
