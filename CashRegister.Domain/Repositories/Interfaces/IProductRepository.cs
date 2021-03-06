﻿using System;
using System.Collections.Generic;
using System.Text;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IProductRepository
    {
        List<Product> GetProductsWhereNameContains(string substring);
        List<Product> GetProductsWhereBarcodeContains(string substring);

        bool AddProduct(Product productToAdd);
        bool EditProduct(Product editedProduct);

        Product GetProductById(int id);
        Product GetProductByBarcode(string barcode);
    }
}
