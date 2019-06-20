using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    }
}