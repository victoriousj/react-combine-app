import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <header className="navbar">
    <span className="logo">
      <NavLink exact to="/">
        <i className="logo" />
      </NavLink>
    </span>
    <ul className="main-nav">
      <li className="nav-links">
        <NavLink to="/simonsays">Simon Says</NavLink>
      </li>
      <li className="nav-links">
        <NavLink to="/connect4">Connect4</NavLink>
      </li>
    </ul>
  </header>
);

export default Header;
