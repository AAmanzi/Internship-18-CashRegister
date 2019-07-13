using Microsoft.EntityFrameworkCore.Migrations;

namespace CashRegister.Data.Migrations
{
    public partial class dataseed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.Sql(
                @"USE [CashRegister]
                GO
                SET IDENTITY_INSERT [dbo].[Cashiers] ON 
                GO
                INSERT [dbo].[Cashiers] ([Id], [FirstName], [LastName], [Username], [Password]) VALUES (3, N'Bojana', N'Vunturiševic', N'bojana', N'3JOJCkGsDAg9EUBbC9me18Jsk6yBzyANAUZ2T72pEnrAy5e3')
                GO
                SET IDENTITY_INSERT [dbo].[Cashiers] OFF
                GO
                SET IDENTITY_INSERT [dbo].[CashRegisters] ON 
                GO
                INSERT [dbo].[CashRegisters] ([Id], [Name]) VALUES (1, N'Tommy01')
                GO
                SET IDENTITY_INSERT [dbo].[CashRegisters] OFF
                GO
                INSERT [dbo].[Receipts] ([Id], [CreatedOn], [PriceSubtotal], [TotalExciseTax], [TotalDirectTax], [PriceTotal], [CashierId], [CashRegisterId]) VALUES (N'd9b018de-4cf1-4e72-725f-08d707067949', CAST(N'2019-07-12T22:21:07.9010000' AS DateTime2), 199.04999999999998, 9.43, 2.59, 211.07, 3, 1)
                GO
                INSERT [dbo].[Receipts] ([Id], [CreatedOn], [PriceSubtotal], [TotalExciseTax], [TotalDirectTax], [PriceTotal], [CashierId], [CashRegisterId]) VALUES (N'46afa705-1d5f-4249-7260-08d707067949', CAST(N'2019-07-12T22:24:20.1030000' AS DateTime2), 10.35, 0, 2.59, 12.94, 3, 1)
                GO
                INSERT [dbo].[Receipts] ([Id], [CreatedOn], [PriceSubtotal], [TotalExciseTax], [TotalDirectTax], [PriceTotal], [CashierId], [CashRegisterId]) VALUES (N'575b15b7-b740-4183-7261-08d707067949', CAST(N'2019-07-12T22:25:11.8270000' AS DateTime2), 29.75, 0.39, 5.49, 35.63, 3, 1)
                GO
                INSERT [dbo].[Receipts] ([Id], [CreatedOn], [PriceSubtotal], [TotalExciseTax], [TotalDirectTax], [PriceTotal], [CashierId], [CashRegisterId]) VALUES (N'a3939c8f-4b33-4280-7262-08d707067949', CAST(N'2019-07-12T22:28:51.3210000' AS DateTime2), 1.9, 0, 0.48, 2.38, 3, 1)
                GO
                INSERT [dbo].[Receipts] ([Id], [CreatedOn], [PriceSubtotal], [TotalExciseTax], [TotalDirectTax], [PriceTotal], [CashierId], [CashRegisterId]) VALUES (N'af6dc570-ff52-4d9a-7263-08d707067949', CAST(N'2019-07-12T22:32:35.0920000' AS DateTime2), 74.85, 3.74, 0, 78.59, 3, 1)
                GO
                INSERT [dbo].[Receipts] ([Id], [CreatedOn], [PriceSubtotal], [TotalExciseTax], [TotalDirectTax], [PriceTotal], [CashierId], [CashRegisterId]) VALUES (N'c84c6d5a-df82-471f-7264-08d707067949', CAST(N'2019-07-12T23:14:23.0700000' AS DateTime2), 3.35, 0, 0.84, 4.19, 3, 1)
                GO
                SET IDENTITY_INSERT [dbo].[Products] ON 
                GO
                INSERT [dbo].[Products] ([Id], [Barcode], [Name], [Price], [TaxType], [InStock]) VALUES (1, N'1234567890000', N'Fini Tortellini', 10.5, 1, 498)
                GO
                INSERT [dbo].[Products] ([Id], [Barcode], [Name], [Price], [TaxType], [InStock]) VALUES (2, N'1234567890001', N'Pohana Šlapa', 24.95, 0, 494)
                GO
                INSERT [dbo].[Products] ([Id], [Barcode], [Name], [Price], [TaxType], [InStock]) VALUES (3, N'1234567890002', N'Mozambičke Gljive', 3.45, 1, 494)
                GO
                INSERT [dbo].[Products] ([Id], [Barcode], [Name], [Price], [TaxType], [InStock]) VALUES (4, N'1234567890003', N'Batak o'' Švrake', 12.65, 0, 491)
                GO
                INSERT [dbo].[Products] ([Id], [Barcode], [Name], [Price], [TaxType], [InStock]) VALUES (5, N'1234567890004', N'Coca-Cola Dark', 1.95, 0, 496)
                GO
                INSERT [dbo].[Products] ([Id], [Barcode], [Name], [Price], [TaxType], [InStock]) VALUES (6, N'1234567890005', N'Sirko Light', 0.95, 1, 497)
                GO
                INSERT [dbo].[Products] ([Id], [Barcode], [Name], [Price], [TaxType], [InStock]) VALUES (7, N'1234567890006', N'Žuti Camel', 3.35, 1, 499)
                GO
                INSERT [dbo].[Products] ([Id], [Barcode], [Name], [Price], [TaxType], [InStock]) VALUES (8, N'1234567890007', N'Frigani Čepun', 420.69, 0, 1)
                GO
                SET IDENTITY_INSERT [dbo].[Products] OFF
                GO
                INSERT [dbo].[ReceiptProducts] ([ProductId], [ReceiptId], [Quantity], [UnitPrice], [TaxType]) VALUES (2, N'd9b018de-4cf1-4e72-725f-08d707067949', 3, 24.95, 0)
                GO
                INSERT [dbo].[ReceiptProducts] ([ProductId], [ReceiptId], [Quantity], [UnitPrice], [TaxType]) VALUES (3, N'd9b018de-4cf1-4e72-725f-08d707067949', 3, 3.45, 1)
                GO
                INSERT [dbo].[ReceiptProducts] ([ProductId], [ReceiptId], [Quantity], [UnitPrice], [TaxType]) VALUES (4, N'd9b018de-4cf1-4e72-725f-08d707067949', 9, 12.65, 0)
                GO
                INSERT [dbo].[ReceiptProducts] ([ProductId], [ReceiptId], [Quantity], [UnitPrice], [TaxType]) VALUES (3, N'46afa705-1d5f-4249-7260-08d707067949', 3, 3.45, 1)
                GO
                INSERT [dbo].[ReceiptProducts] ([ProductId], [ReceiptId], [Quantity], [UnitPrice], [TaxType]) VALUES (1, N'575b15b7-b740-4183-7261-08d707067949', 2, 10.5, 1)
                GO
                INSERT [dbo].[ReceiptProducts] ([ProductId], [ReceiptId], [Quantity], [UnitPrice], [TaxType]) VALUES (5, N'575b15b7-b740-4183-7261-08d707067949', 4, 1.95, 0)
                GO
                INSERT [dbo].[ReceiptProducts] ([ProductId], [ReceiptId], [Quantity], [UnitPrice], [TaxType]) VALUES (6, N'575b15b7-b740-4183-7261-08d707067949', 1, 0.95, 1)
                GO
                INSERT [dbo].[ReceiptProducts] ([ProductId], [ReceiptId], [Quantity], [UnitPrice], [TaxType]) VALUES (6, N'a3939c8f-4b33-4280-7262-08d707067949', 2, 0.95, 1)
                GO
                INSERT [dbo].[ReceiptProducts] ([ProductId], [ReceiptId], [Quantity], [UnitPrice], [TaxType]) VALUES (2, N'af6dc570-ff52-4d9a-7263-08d707067949', 3, 24.95, 0)
                GO
                INSERT [dbo].[ReceiptProducts] ([ProductId], [ReceiptId], [Quantity], [UnitPrice], [TaxType]) VALUES (7, N'c84c6d5a-df82-471f-7264-08d707067949', 1, 3.35, 1)
                GO"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"DELETE FROM Cashiers;

                DELETE FROM CashRegisters;

                DELETE FROM Products;

                DELETE FROM ReceiptProducts;

                DELETE FROM Receipts;"
            );
        }
    }
}
