export const debounce = require("lodash.debounce");

export const isNullOrWhitespace = input => {
  if (typeof input === "undefined" || input == null) return true;

  return input.replace(/\s/g, "").length < 1;
};

export const formatDate = date => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

//  Product errors:
//    1: Invalid barcode
//    2: Invalid price
//    3: Invalid tax type
//    4: Invalid name
//    5: Invalid in stock amount

export const validateProduct = product => {
  if (!/^\d{13}$/.test(product.barcode)) {
    return 1;
  }

  if (!/^\d*(\.\d{0,2}){0,1}$/.test(product.price)) {
    return 2;
  }

  if (product.taxType !== "Direct" && product.taxType !== "Excise") {
    return 3;
  }

  if (isNullOrWhitespace(product.name)) {
    return 4;
  }

  if (!/^\d+$/.test(product.inStock) || product.inStock <= 0) {
    return 5;
  }

  return 0;
};
