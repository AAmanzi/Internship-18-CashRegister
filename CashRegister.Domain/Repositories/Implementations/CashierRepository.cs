using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Helpers;
using CashRegister.Domain.Repositories.Interfaces;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class CashierRepository : ICashierRepository
    {
        private readonly CashRegisterContext _context;

        public CashierRepository(CashRegisterContext context)
        {
            _context = context;
        }

        public List<Cashier> GetAllCashiers()
        {
            return _context.Cashiers.ToList();
        }

        public bool AddCashier(Cashier toAdd)
        {
            var alreadyExists = _context.Cashiers.Any(cashier =>
                string.Equals(cashier.Username, toAdd.Username, StringComparison.CurrentCulture));

            if (alreadyExists ||
                toAdd.Username.Length < 5 ||
                toAdd.Password.Length < 3)
            {
                return false;
            }

            var cashierToBeAdded = new Cashier
            {
                FirstName = toAdd.FirstName,
                LastName = toAdd.LastName,
                Username = toAdd.Username,
                Password = HashHelper.Hash(toAdd.Password)
            };

            _context.Cashiers.Add(cashierToBeAdded);
            _context.SaveChanges();
            return true;
        }

        public Cashier GetCashierById(int id)
        {
            return _context.Cashiers.Find(id);
        }

        public Cashier ValidateCashier(string username, string password)
        {
            var cashierToValidate = _context.Cashiers.FirstOrDefault(cashier =>
                string.Equals(cashier.Username, username, StringComparison.CurrentCulture));
            if (cashierToValidate == null)
            {
                return null;
            }

            var isPasswordCorrect = HashHelper.ValidatePassword(password, cashierToValidate.Password);

            return isPasswordCorrect ? cashierToValidate : null;
        }
    }
}
