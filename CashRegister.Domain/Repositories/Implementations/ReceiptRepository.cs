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

        public Guid AddReceipt(Receipt receiptToAdd)
        {
            var cashier = _context.Cashiers.Find(receiptToAdd.CashierId);
            var cashRegister = _context.CashRegisters.Find(receiptToAdd.CashRegisterId);
            if (cashier == null || cashRegister == null)
            {
                return Guid.Empty;
            }

            _context.Receipts.Add(receiptToAdd);
            _context.SaveChanges();
            return receiptToAdd.Id;
        }

        public Receipt GetReceiptById(Guid id)
        {
            return _context.Receipts.Find(id);
        }
    }
}