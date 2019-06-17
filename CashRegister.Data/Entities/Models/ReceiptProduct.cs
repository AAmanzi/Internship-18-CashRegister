using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Data.Entities.Models
{
    public class ReceiptProduct
    {
        public int Quantity { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
        public Guid ReceiptId { get; set; }
        public Receipt Receipt { get; set; }
    }
}
