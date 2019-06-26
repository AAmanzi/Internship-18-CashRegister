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
    [Route("api/receipt-products")]
    [ApiController]
    public class ReceiptProductController : ControllerBase
    {
        private readonly IReceiptProductRepository _receiptProductRepository;

        public ReceiptProductController(IReceiptProductRepository receiptProductRepository)
        {
            _receiptProductRepository = receiptProductRepository;
        }

        [HttpGet("all")]
        public IActionResult GetAllReceiptProducts()
        {
            return Ok(_receiptProductRepository.GetAllReceiptProducts());
        }

        [HttpGet("filtered")]
        public IActionResult GetReceiptProductsByReceiptId(Guid receiptId)
        {
            return Ok(_receiptProductRepository.GetReceiptProductsByReceiptId(receiptId));
        }

        [HttpPost("add")]
        public IActionResult AddReceiptProduct(ReceiptProduct receiptProductToAdd)
        {
            var wasAddSuccessful = _receiptProductRepository.AddReceiptProduct(receiptProductToAdd);

            if (wasAddSuccessful)
            {
                return Ok();
            }

            return Forbid();
        }

        //[HttpPost("edit")]
        //public IActionResult EditReceiptProduct(ReceiptProduct editedReceiptProduct)
        //{
        //    var wasEditSuccessful = _receiptProductRepository.EditReceiptProduct(editedReceiptProduct);

        //    if (wasEditSuccessful)
        //    {
        //        return Ok();
        //    }

        //    return Forbid();
        //}
        
        [HttpDelete("delete/{receipt-id}/{product-id}")]
        public IActionResult DeleteReceiptProduct(Guid receiptId, int productId)
        {
            var wasDeleteSuccessful = _receiptProductRepository.DeleteReceiptProduct(receiptId, productId);
            if (wasDeleteSuccessful)
            {
                return Ok();
            }

            return NotFound();
        }

        [HttpGet("get-by-primary-key")]
        public IActionResult GetReceiptProductByPrimaryKey(Guid receiptId, int productId)
        {
            var receiptProduct = _receiptProductRepository.GetReceiptProductByPrimaryKey(receiptId, productId);

            if (receiptProduct == null)
            {
                return NotFound();
            }

            return Ok(receiptProduct);
        }
    }
}