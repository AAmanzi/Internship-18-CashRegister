using System;
using System.Collections.Generic;
using System.Text;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface ICashierRepository
    {
        List<Cashier> GetAllCashiers();

        bool AddCashier(Cashier toAdd);

        Cashier GetCashierById(int id);
        Cashier ValidateCashier(string username, string password);
    }
}
