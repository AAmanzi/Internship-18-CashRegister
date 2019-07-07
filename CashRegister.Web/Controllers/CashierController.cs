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
    [Route("api/cashiers")]
    [ApiController]
    public class CashierController : ControllerBase
    {
        private readonly ICashierRepository _cashierRepository;

        public CashierController(ICashierRepository cashierRepository)
        {
            _cashierRepository = cashierRepository;
        }

        [HttpPost("add")]
        public IActionResult AddCashier(Cashier toAdd)
        {
            var wasAddSuccessful = _cashierRepository.AddCashier(toAdd);

            if (wasAddSuccessful)
            {
                return Ok();
            }

            return Forbid();
        }

        [HttpGet("all")]
        public IActionResult GetAllCashiers()
        {
            return Ok(_cashierRepository.GetAllCashiers());
        }

        [HttpGet("get-by-id")]
        public IActionResult GetCashierById(int id)
        {
            var cashier = _cashierRepository.GetCashierById(id);

            if (cashier == null)
            {
                return NotFound();
            }

            return Ok(cashier);
        }

        [HttpPost("validate-user")]
        public IActionResult ValidateCashier(Cashier toValidate)
        {
            var cashier = _cashierRepository.ValidateCashier(toValidate.Username, toValidate.Password);

            if (cashier == null)
            {
                return Forbid();
            }

            return Ok(new Cashier
            {
                Id = cashier.Id,
                FirstName = cashier.FirstName,
                LastName = cashier.LastName,
                Username = cashier.Username
            });
        }
    }
}