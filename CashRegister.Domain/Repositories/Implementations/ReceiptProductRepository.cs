using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CashRegister.Data.Entities;
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
            if (receiptProductToAdd.Quantity == 0 ||
                receiptProductToAdd.Receipt == null ||
                receiptProductToAdd.Product == null)
            {
                return false;
            }

            _context.ReceiptProducts.Add(receiptProductToAdd);
            _context.SaveChanges();
            return true;
        }

        public bool EditReceiptProduct(ReceiptProduct editedReceiptProduct)
        {
            var receiptProductToEdit = _context.ReceiptProducts.Find
            (
                editedReceiptProduct.ProductId,
                editedReceiptProduct.ReceiptId
            );
            if (receiptProductToEdit == null)
            {
                return false;
            }

            if (editedReceiptProduct.Quantity == 0)
            {
                return DeleteReceiptProduct
                (
                    editedReceiptProduct.ReceiptId, 
                    editedReceiptProduct.ProductId
                );
            }

            receiptProductToEdit.Quantity = editedReceiptProduct.Quantity;

            _context.SaveChanges();
            return true;
        }

        public bool DeleteReceiptProduct(Guid receiptId, int productId)
        {
            var receiptProductToDelete = _context.ReceiptProducts.Find(productId, receiptId);

            if (receiptProductToDelete == null)
            {
                return false;
            }

            _context.ReceiptProducts.Remove(receiptProductToDelete);

            return true;
        }

        public ReceiptProduct GetReceiptProductByPrimaryKey(Guid receiptId, int productId)
        {
            return _context.ReceiptProducts.Find(productId, receiptId);
        }
    }
}
