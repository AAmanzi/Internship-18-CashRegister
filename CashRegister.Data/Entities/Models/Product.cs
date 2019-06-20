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

        public override bool Equals(object obj)
        {
            var other = (Product) obj;
            return Id == other.Id &&
                   string.Equals(Barcode, other.Barcode) &&
                   string.Equals(Name, other.Name) &&
                   Price.Equals(other.Price) &&
                   TaxType == other.TaxType &&
                   InStock == other.InStock;
        }

        protected bool Equals(Product other)
        {
            return Id == other.Id && 
                   string.Equals(Barcode, other.Barcode) && 
                   string.Equals(Name, other.Name) && 
                   Price.Equals(other.Price) && 
                   TaxType == other.TaxType && 
                   InStock == other.InStock && 
                   Equals(ReceiptProducts, other.ReceiptProducts);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                var hashCode = Id;
                hashCode = (hashCode * 397) ^ (Barcode != null ? Barcode.GetHashCode() : 0);
                hashCode = (hashCode * 397) ^ (Name != null ? Name.GetHashCode() : 0);
                hashCode = (hashCode * 397) ^ Price.GetHashCode();
                hashCode = (hashCode * 397) ^ (int) TaxType;
                hashCode = (hashCode * 397) ^ InStock;
                hashCode = (hashCode * 397) ^ (ReceiptProducts != null ? ReceiptProducts.GetHashCode() : 0);
                return hashCode;
            }
        }
    }
}
