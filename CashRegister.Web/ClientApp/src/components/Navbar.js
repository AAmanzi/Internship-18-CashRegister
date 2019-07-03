import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav>
        <ul className="NavLinks">
          <li className="NavItem">
            <button>Main</button>
          </li>
          <li className="NavItem">
            <button>Products</button>
          </li>
          <li className="NavItem">
            <button>Receipts</button>
          </li>
          <li className="NavItem">
            <button>Log out</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
