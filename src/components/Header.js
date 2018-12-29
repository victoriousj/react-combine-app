import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <ul className="navbar">
      <li className="nav-links">
        <NavLink exact={true} to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-links">
        <NavLink to="about">about</NavLink>
      </li>
      <li className="nav-links">
        <NavLink to="about">Resume</NavLink>
      </li>
      <li className="name">Victor Johnson</li>
      <li className="nav-links">
        <NavLink to="/simonsays">Simon Says</NavLink>
      </li>
      <li className="nav-links">
        <NavLink to="/connect4">Connect4</NavLink>
      </li>
      <li className="nav-links">
        <NavLink to="/spacebarrage">Space Barrage</NavLink>
      </li>
    </ul>
  </header>
);

export default Header;
