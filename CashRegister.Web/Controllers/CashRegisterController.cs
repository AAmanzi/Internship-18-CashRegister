using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CashRegister.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CashRegister.Web.Controllers
{
    [Route("api/cash-registers")]
    [ApiController]
    public class CashRegisterController : ControllerBase
    {
        private readonly ICashRegisterRepository _cashRegisterRepository;

        public CashRegisterController(ICashRegisterRepository cashRegisterRepository)
        {
            _cashRegisterRepository = cashRegisterRepository;
        }

        [HttpGet("all")]
        public IActionResult GetAllCashRegisters()
        {
            return Ok(_cashRegisterRepository.GetAllCashRegisters());
        }

        [HttpGet("get-by-id")]
        public IActionResult GetCashRegisterById(int id)
        {
            var cashRegister = _cashRegisterRepository.GetCashRegisterById(id);

            if (cashRegister == null)
            {
                return NotFound();
            }

            return Ok(cashRegister);
        }
    }
}