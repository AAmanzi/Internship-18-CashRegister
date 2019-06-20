using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using CashRegister.Domain.Helpers;
using Microsoft.EntityFrameworkCore;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly CashRegisterContext _context;

        public ProductRepository(CashRegisterContext context)
        {
            _context = context;
        }

        public List<Product> GetAllProducts()
        {
            return _context.Products.ToList();
        }

        public List<Product> GetProductsWhereNameContains(string substring)
        {
            return _context.Products
                .Where(product => 
                    product.Name.ToLower()
                        .Contains(substring.ToLower()))
                .ToList();
;        }

        public List<Product> GetProductsWhereBarcodeContains(string substring)
        {
            return _context.Products
                .Where(product =>
                    product.Barcode
                        .Contains(substring))
                .ToList();
        }

        public bool AddProduct(Product productToAdd)
        {
            var doesProductExist = _context.Products.Any(product =>
                string.Equals
                (
                    product.Barcode, 
                    productToAdd.Barcode, 
                    StringComparison.CurrentCultureIgnoreCase)
                );
            if
            (
                doesProductExist ||
                !StringHelpers.IsDigitsOnly(productToAdd.Barcode) ||
                productToAdd.Barcode.Length != 13
            )
            {
                return false;
            }

            _context.Products.Add(productToAdd);
            _context.SaveChanges();
            return true;
        }

        public bool EditProduct(Product editedProduct)
        {
            var productToEdit = _context.Products.Find(editedProduct.Id);

            if (productToEdit == null)
            {
                return false;
            }

            var doesEditedProductExist = _context.Products.Any(product =>
                string.Equals(product.Barcode, editedProduct.Barcode) &&
                !string.Equals(product.Barcode, productToEdit.Barcode));

            if (!string.Equals(productToEdit.Name, editedProduct.Name) ||
                productToEdit.InStock != editedProduct.InStock ||
                doesEditedProductExist)
            {
                return false;
            }

            productToEdit.Barcode = editedProduct.Barcode;
            productToEdit.Price = editedProduct.Price;
            productToEdit.TaxType = editedProduct.TaxType;

            _context.SaveChanges();
            return true;
        }

        public bool IncreaseProductStock(int id, int increaseBy)
        {
            var productToEdit = _context.Products.Find(id);

            if (productToEdit == null)
            {
                return false;
            }

            productToEdit.InStock += increaseBy;

            _context.SaveChanges();
            return true;
        }

        public bool DecreaseProductStock(int id, int decreaseBy)
        {
            var productToEdit = _context.Products.Find(id);

            if (productToEdit == null ||
                decreaseBy > productToEdit.InStock)
            {
                return false;
            }

            productToEdit.InStock -= decreaseBy;

            _context.SaveChanges();
            return true;
        }

        public Product GetProductById(int id)
        {
            return _context.Products.Find(id);
        }

        public Product GetProductByBarcode(string barcode)
        {
            return _context.Products.FirstOrDefault(product => 
                string.Equals(product.Barcode, barcode));
        }
    }
}
