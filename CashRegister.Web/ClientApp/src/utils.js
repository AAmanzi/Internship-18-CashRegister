export const debounce = require('lodash.debounce');

//  Product errors:
//    1: Invalid barcode
//    2: Invalid price
//    3: Invalid tax type

export const validateProduct = product => {
  if(!/^\d+$/.test(product.barcode)){
    return 1;
  }

  if(!/^\d*(\.\d{0,2}){0,1}$/.test(product.price)){
    return 2;
  }

  if(product.taxType !== "Direct" && product.taxType !== "Excise"){
    return 3;
  }

  return 0;
}