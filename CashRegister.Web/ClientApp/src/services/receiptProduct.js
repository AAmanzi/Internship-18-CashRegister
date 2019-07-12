import * as api from "./index";
import { CONTROLLER } from "../constants";

// export const getAllReceiptProducts = async () => {
//   return api.getAll(CONTROLLER.RECEIPT_PRODUCT).then(response => response.data);
// };

export const getReceiptProductsByReceiptId = async receiptId => {
  return api
    .getFiltered(CONTROLLER.RECEIPT_PRODUCT, { receiptId })
    .then(response => response.data);
};

// export const addReceiptProduct = async receiptProduct => {
//   return api.post(CONTROLLER.RECEIPT_PRODUCT, receiptProduct);
// };

export const addReceiptProductList = async receiptProducts => {
  return api.postList(CONTROLLER.RECEIPT_PRODUCT, receiptProducts);
};
