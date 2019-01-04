import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="header">
      <ul className="navbar">
        <li>
          <NavLink exact={true} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="about">about</NavLink>
        </li>
        <li>
          <NavLink to="about">Resume</NavLink>
        </li>
        <li className="name">Victor Johnson</li>
        <li>
          <NavLink to="/simonsays">Simon Says</NavLink>
        </li>
        <li>
          <NavLink to="/connect4">Connect4</NavLink>
        </li>
        <li>
          <NavLink to="/spacebarrage">Space Barrage</NavLink>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
