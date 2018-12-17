import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <header>
    <span className="">
      <NavLink exact to="/">
        <i className=""> &lt; / &gt; </i>
      </NavLink>
    </span>
    <ul className="">
      <li>
        <NavLink exact to="/connect4">
          connect4
        </NavLink>
      </li>
    </ul>
  </header>
);

export default Header;
