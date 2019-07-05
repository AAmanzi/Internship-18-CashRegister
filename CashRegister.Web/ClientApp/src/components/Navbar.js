import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav>
        <ul className="NavLinks">
          <li className="NavItem">
            <Link to="/">
              <button>Main</button>
            </Link>
          </li>
          <li className="NavItem">
            <Link to="/products">
              <button>Products</button>
            </Link>
          </li>
          <li className="NavItem">
            <Link to="/receipts">
              <button>Receipts</button>
            </Link>
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
