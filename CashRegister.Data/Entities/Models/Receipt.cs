using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Data.Entities.Models
{
    public class Receipt
    {
        public Guid Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public double PriceSubtotal { get; set; }
        public double TotalExciseTax { get; set; }
        public double TotalDirectTax { get; set; }
        public double PriceTotal { get; set; }

        public ICollection<ReceiptProduct> ReceiptProducts { get; set; }
        public int CashierId { get; set; }
        public Cashier Cashier { get; set; }
        public int CashRegisterId { get; set; }
        public CashRegister CashRegister { get; set; }
    }
}
