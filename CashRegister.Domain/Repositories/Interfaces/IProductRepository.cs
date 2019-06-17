using System;
using System.Collections.Generic;
using System.Text;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IProductRepository
    {
        List<Product> GetAllProducts();
        List<Product> GetProductsWhereNameLike(string nameSubstring);
        bool AddProduct(Product productToAdd);
        bool EditProduct(Product editedProduct);
        bool DeleteProduct(int idOfProductToDelete);
        Product GetProductById(int id);
    }
}
