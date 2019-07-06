using System;
using System.Collections.Generic;
using System.Text;
using CashRegister.Data.Entities.Enums;

namespace CashRegister.Data.Entities.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Barcode { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public TaxType TaxType { get; set; }
        public int InStock { get; set; }

        public ICollection<ReceiptProduct> ReceiptProducts { get; set; }
    }
}
