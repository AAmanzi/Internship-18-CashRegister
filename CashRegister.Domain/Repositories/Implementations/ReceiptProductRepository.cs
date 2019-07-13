using System;
using System.Collections.Generic;
using System.Linq;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Enums;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            return _context.ReceiptProducts
                .Where(receiptProduct => receiptProduct.ReceiptId == receiptId)
                .Include(receiptProduct => receiptProduct.Product)
                .ToList();
        }

        public bool AddReceiptProductList(List<ReceiptProduct> receiptProductsToAdd)
        {
            foreach (var receiptProduct in receiptProductsToAdd)
            {
                var receipt = _context.Receipts.Find(receiptProduct.ReceiptId);
                var product = _context.Products.Find(receiptProduct.ProductId);
                var alreadyExists =
                    _context.ReceiptProducts.Any(rp => rp.ReceiptId == receiptProduct.ReceiptId && 
                                                       rp.ProductId == receiptProduct.ProductId);

                if (alreadyExists || 
                    receiptProduct.Quantity == 0 ||
                    receipt == null ||
                    product == null ||
                    product.InStock < receiptProduct.Quantity)
                {
                    return false;
                }

                receiptProduct.UnitPrice = product.Price;
                receiptProduct.TaxType = product.TaxType;

                receipt.PriceSubtotal += Math.Round(
                    receiptProduct.UnitPrice * receiptProduct.Quantity, 
                    2, 
                    MidpointRounding.AwayFromZero);

                if (product.TaxType == TaxType.Excise)
                {
                    receipt.TotalExciseTax += Math.Round(
                        receiptProduct.UnitPrice * 0.05 * receiptProduct.Quantity, 
                        2, 
                        MidpointRounding.AwayFromZero);
                }
                else
                {
                    receipt.TotalDirectTax += Math.Round(
                        receiptProduct.UnitPrice * 0.25 * receiptProduct.Quantity, 
                        2, 
                        MidpointRounding.AwayFromZero);
                }

                receipt.PriceTotal = Math.Round(
                    receipt.PriceSubtotal + receipt.TotalExciseTax + receipt.TotalDirectTax, 
                    2, 
                    MidpointRounding.AwayFromZero);

                product.InStock -= receiptProduct.Quantity;
                
                _context.ReceiptProducts.Add(receiptProduct);
            }

            _context.SaveChanges();
            return true;
        }
    }
}
