using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CashRegister.Data.Entities;
using CashRegister.Domain.Repositories.Interfaces;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class CashRegisterRepository : ICashRegisterRepository
    {
        private readonly CashRegisterContext _context;

        public CashRegisterRepository(CashRegisterContext context)
        {
            _context = context;
        }

        public List<Data.Entities.Models.CashRegister> GetAllCashRegisters()
        {
            return _context.CashRegisters.ToList();
        }

        public Data.Entities.Models.CashRegister GetCashRegisterById(int id)
        {
            return _context.CashRegisters.Find(id);
        }
    }
}
