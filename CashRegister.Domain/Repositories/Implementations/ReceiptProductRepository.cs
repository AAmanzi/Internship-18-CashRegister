using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Enums;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class ReceiptProductRepository : IReceiptProductRepository
    {
        private readonly CashRegisterContext _context;

        public ReceiptProductRepository(CashRegisterContext context)
        {
            _context = context;
        }

        public List<ReceiptProduct> GetAllReceiptProducts()
        {
            return _context.ReceiptProducts.ToList();
        }

        public List<ReceiptProduct> GetReceiptProductsByReceiptId(Guid receiptId)
        {
            return _context.ReceiptProducts.Where(receiptProduct => 
                receiptProduct.ReceiptId == receiptId)
                .ToList();
        }

        public bool AddReceiptProduct(ReceiptProduct receiptProductToAdd)
        {
            var receipt = _context.Receipts.Find(receiptProductToAdd.ReceiptId);
            var product = _context.Products.Find(receiptProductToAdd.ProductId);
            var alreadyExists =
                _context.ReceiptProducts.Any(rp => rp.ReceiptId == receiptProductToAdd.ReceiptId && 
                                                   rp.ProductId == receiptProductToAdd.ProductId);

            if (alreadyExists || 
                receiptProductToAdd.Quantity == 0 ||
                receipt == null ||
                product == null ||
                product.InStock < receiptProductToAdd.Quantity)
            {
                return false;
            }

            receiptProductToAdd.UnitPrice = product.Price;

            receipt.PriceSubtotal += receiptProductToAdd.UnitPrice * receiptProductToAdd.Quantity;

            if (product.TaxType == TaxType.Excise)
            {
                receipt.TotalExciseTax += receiptProductToAdd.UnitPrice * 
                                          0.05 * 
                                          receiptProductToAdd.Quantity;
            }
            else
            {
                receipt.TotalDirectTax += receiptProductToAdd.UnitPrice * 0.25 * receiptProductToAdd.Quantity;
            }

            receipt.PriceTotal = receipt.PriceSubtotal + 
                                 receipt.TotalExciseTax + 
                                 receipt.TotalDirectTax;

            product.InStock -= receiptProductToAdd.Quantity;

            _context.ReceiptProducts.Add(receiptProductToAdd);
            _context.SaveChanges();
            return true;
        }

        //public bool EditReceiptProduct(ReceiptProduct editedReceiptProduct)
        //{
        //    var receipt = _context.Receipts.Find(editedReceiptProduct.ReceiptId);
        //    var product = _context.Products.Find(editedReceiptProduct.ProductId);
        //    var receiptProductToEdit = _context.ReceiptProducts.Find
        //    (
        //        editedReceiptProduct.ReceiptId,
        //        editedReceiptProduct.ProductId
        //    );
        //    if (receiptProductToEdit == null)
        //    {
        //        return false;
        //    }

        //    var quantityDifference = editedReceiptProduct.Quantity - receiptProductToEdit.Quantity;

        //    product.InStock -= quantityDifference;

        //    if (editedReceiptProduct.Quantity == 0)
        //    {
        //        return DeleteReceiptProduct
        //        (
        //            editedReceiptProduct.ReceiptId, 
        //            editedReceiptProduct.ProductId
        //        );
        //    }

        //    receiptProductToEdit.Quantity = editedReceiptProduct.Quantity;

        //    _context.SaveChanges();
        //    return true;
        //}

        public bool DeleteReceiptProduct(Guid receiptId, int productId)
        {
            var receiptProductToDelete = _context.ReceiptProducts.Find(receiptId, productId);

            if (receiptProductToDelete == null)
            {
                return false;
            }

            _context.ReceiptProducts.Remove(receiptProductToDelete);

            _context.SaveChanges();
            return true;
        }

        public ReceiptProduct GetReceiptProductByPrimaryKey(Guid receiptId, int productId)
        {
            return _context.ReceiptProducts.Find(receiptId, productId);
        }
    }
}
