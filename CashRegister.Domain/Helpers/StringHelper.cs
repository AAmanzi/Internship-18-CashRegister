using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Domain.Helpers
{
    public static class StringHelper
    {
        public static bool IsDigitsOnly(string toTest)
        {
            foreach (var character in toTest)
            {
                if (character < '0' || character > '9')
                    return false;
            }

            return true;
        }
    }
}
