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
        <NavLink to="/simonsays">Simon Says</NavLink>
      </li>
      <li>
        <NavLink to="/connect4">Connect4</NavLink>
      </li>
    </ul>
  </header>
);

export default Header;
