using System;
using System.Collections.Generic;
using System.Text;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface ICashierRepository
    {
        List<Cashier> GetAllCashiers();

        Cashier GetCashierById(int id);
    }
}
