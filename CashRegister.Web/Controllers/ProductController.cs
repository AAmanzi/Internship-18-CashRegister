using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CashRegister.Web.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet("all")]
        public IActionResult GetAllProducts()
        {
            return Ok(_productRepository.GetAllProducts());
        }

        [HttpGet("filtered")]
        public IActionResult GetFilteredProducts(string filter)
        {
            var productsFilteredByName = _productRepository.GetProductsWhereNameContains(filter);
            var productsFilteredByBarcode = _productRepository.GetProductsWhereBarcodeContains(filter);

            var filteredProducts = productsFilteredByName.Union(productsFilteredByBarcode).ToList();

            return Ok(filteredProducts);
        }

        [HttpPost("add")]
        public IActionResult AddProduct(Product productToAdd)
        {
            var wasAddSuccessful = _productRepository.AddProduct(productToAdd);

            if (wasAddSuccessful)
            {
                return Ok();
            }

            return Forbid();
        }

        [HttpPost("edit")]
        public IActionResult EditProduct(Product editedProduct)
        {
            var wasEditSuccessful = _productRepository.EditProduct(editedProduct);

            if (wasEditSuccessful)
            {
                return Ok();
            }

            return Forbid();
        }

        [HttpPost("increase-stock")]
        public IActionResult IncreaseProductStock(int id, int increaseBy)
        {
            var wasIncreaseSuccessful = _productRepository.IncreaseProductStock(id, increaseBy);

            if (wasIncreaseSuccessful)
            {
                return Ok();
            }

            return Forbid();
        }

        [HttpGet("get-by-id")]
        public IActionResult GetProductById(int id)
        {
            var product = _productRepository.GetProductById(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpGet("get-by-barcode")]
        public IActionResult GetProductByBarcode(string barcode)
        {
            var product = _productRepository.GetProductByBarcode(barcode);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
    }
}