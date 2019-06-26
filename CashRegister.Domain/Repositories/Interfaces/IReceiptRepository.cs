using System;
using System.Collections.Generic;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IReceiptRepository
    {
        List<Receipt> GetAllReceipts();
        List<Receipt> GetReceiptsByCreationDate(DateTime dateOfReceipt);

        Guid AddReceipt (Receipt receiptToAdd);

        Receipt GetReceiptById (Guid id);
    }
}