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
    [Route("api/receipts")]
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        private readonly IReceiptRepository _receiptRepository;

        public ReceiptController(IReceiptRepository receiptRepository)
        {
            _receiptRepository = receiptRepository;
        }

        [HttpGet("all")]
        public IActionResult GetAllReceipts()
        {
            return Ok(_receiptRepository.GetAllReceipts());
        }

        [HttpGet("filtered")]
        public IActionResult GetFilteredReceipts(DateTime dateOfReceipt)
        {
            return Ok(_receiptRepository.GetReceiptsByCreationDate(dateOfReceipt));
        }

        [HttpPost("add")]
        public IActionResult AddReceipt(Receipt receiptToAdd)
        {
            var wasAddSuccessful = _receiptRepository.AddReceipt(receiptToAdd);

            if (wasAddSuccessful)
            {
                return Ok();
            }

            return Forbid();
        }

        [HttpGet("get-by-id")]
        public IActionResult GetReceiptById(Guid id)
        {
            var receipt = _receiptRepository.GetReceiptById(id);

            if (receipt == null)
            {
                return NotFound();
            }

            return Ok(receipt);
        }
    }
}