using System;
using System.Collections.Generic;
using System.Text;
using CashRegister.Data.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace CashRegister.Data.Entities
{
    public class CashRegisterContext : DbContext
    {
        public CashRegisterContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ReceiptProduct> ReceiptProducts { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<Cashier> Cashiers { get; set; }
        public DbSet<Models.CashRegister> CashRegisters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ReceiptProduct>()
                .HasKey(rp => new {rp.ReceiptId, rp.ProductId});
            modelBuilder.Entity<ReceiptProduct>()
                .HasOne(rp => rp.Receipt)
                .WithMany(r => r.ReceiptProducts)
                .HasForeignKey(rp => rp.ReceiptId);
            modelBuilder.Entity<ReceiptProduct>()
                .HasOne(rp => rp.Product)
                .WithMany(p => p.ReceiptProducts)
                .HasForeignKey(rp => rp.ProductId);
        }
    }
}
