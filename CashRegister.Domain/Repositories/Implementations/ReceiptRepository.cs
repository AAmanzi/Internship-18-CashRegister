using System;
using System.Collections.Generic;
using System.Linq;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class ReceiptRepository : IReceiptRepository
    {
        private readonly CashRegisterContext _context;

        public ReceiptRepository(CashRegisterContext context)
        {
            _context = context;
        }

        public List<Receipt> GetAllReceipts()
        {
            return _context.Receipts.ToList();
        }

        public List<Receipt> GetReceiptsByCreationDate(DateTime dateOfReceipt)
        {
            return _context.Receipts
                .Where(receipt => DateTime.Compare(dateOfReceipt, receipt.CreatedOn.Date) == 0)
                .ToList();
        }

        public bool AddReceipt(Receipt receiptToAdd)
        {
            if (receiptToAdd.CashierId == 0 || 
                receiptToAdd.CashRegisterId == 0)
            {
                return false;
            }

            _context.Receipts.Add(receiptToAdd);
            _context.SaveChanges();
            return true;
        }

        public Receipt GetReceiptById(Guid id)
        {
            return _context.Receipts.Find(id);
        }
    }
}