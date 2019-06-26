﻿// <auto-generated />
using System;
using CashRegister.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CashRegister.Data.Migrations
{
    [DbContext(typeof(CashRegisterContext))]
    partial class CashRegisterContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CashRegister.Data.Entities.Models.CashRegister", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("CashRegisters");
                });

            modelBuilder.Entity("CashRegister.Data.Entities.Models.Cashier", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Cashiers");
                });

            modelBuilder.Entity("CashRegister.Data.Entities.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Barcode");

                    b.Property<int>("InStock");

                    b.Property<string>("Name");

                    b.Property<double>("Price");

                    b.Property<int>("TaxType");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("CashRegister.Data.Entities.Models.Receipt", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CashRegisterId");

                    b.Property<int>("CashierId");

                    b.Property<DateTime>("CreatedOn");

                    b.Property<double>("PriceSubtotal");

                    b.Property<double>("PriceTotal");

                    b.Property<double>("TotalDirectTax");

                    b.Property<double>("TotalExciseTax");

                    b.HasKey("Id");

                    b.HasIndex("CashRegisterId");

                    b.HasIndex("CashierId");

                    b.ToTable("Receipts");
                });

            modelBuilder.Entity("CashRegister.Data.Entities.Models.ReceiptProduct", b =>
                {
                    b.Property<Guid>("ReceiptId");

                    b.Property<int>("ProductId");

                    b.Property<int>("Quantity");

                    b.Property<double>("UnitPrice");

                    b.HasKey("ReceiptId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("ReceiptProducts");
                });

            modelBuilder.Entity("CashRegister.Data.Entities.Models.Receipt", b =>
                {
                    b.HasOne("CashRegister.Data.Entities.Models.CashRegister", "CashRegister")
                        .WithMany("Receipts")
                        .HasForeignKey("CashRegisterId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CashRegister.Data.Entities.Models.Cashier", "Cashier")
                        .WithMany("Receipts")
                        .HasForeignKey("CashierId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CashRegister.Data.Entities.Models.ReceiptProduct", b =>
                {
                    b.HasOne("CashRegister.Data.Entities.Models.Product", "Product")
                        .WithMany("ReceiptProducts")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CashRegister.Data.Entities.Models.Receipt", "Receipt")
                        .WithMany("ReceiptProducts")
                        .HasForeignKey("ReceiptId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
