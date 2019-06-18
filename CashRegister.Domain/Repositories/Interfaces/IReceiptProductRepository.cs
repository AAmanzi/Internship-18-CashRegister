using System;
using System.Collections.Generic;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IReceiptProductRepository
    {
        List<ReceiptProduct> GetAllReceiptProducts();
        List<ReceiptProduct> GetReceiptProductsByReceiptId(Guid receiptId);

        bool AddReceiptProduct(ReceiptProduct receiptProductToAdd);
        bool EditReceiptProduct(ReceiptProduct editedReceiptProduct);
        bool DeleteReceiptProduct(Guid receiptId, int productId);

        ReceiptProduct GetReceiptProductByPrimaryKey(Guid receiptId, int productId);
    }
}