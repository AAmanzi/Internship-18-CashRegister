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

        [HttpGet("filtered")]
        public IActionResult GetReceiptProductsByReceiptId(Guid receiptId)
        {
            return Ok(_receiptProductRepository.GetReceiptProductsByReceiptId(receiptId));
        }

        [HttpPost("add-list")]
        public IActionResult AddReceiptProductList(List<ReceiptProduct> receiptProductsToAdd)
        {
            var wasAddSuccessful = _receiptProductRepository.AddReceiptProductList(receiptProductsToAdd);

            if (wasAddSuccessful)
            {
                return Ok();
            }

            return Forbid();
        }
    }
}