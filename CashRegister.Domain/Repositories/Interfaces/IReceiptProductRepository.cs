using System;
using System.Collections.Generic;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IReceiptProductRepository
    {
        List<ReceiptProduct> GetReceiptProductsByReceiptId(Guid receiptId);

        bool AddReceiptProductList(List<ReceiptProduct> receiptProductsToAdd);
    }
}