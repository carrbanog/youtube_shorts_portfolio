import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaList, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <nav className="left-icon">
          <ul>
            <Link to="/">
              <li>Logo</li>
              <li>Title</li>
            </Link>
          </ul>
        </nav>
        <nav className="right-icon">
          <ul>
            <li>
              <FaList />
            </li>
            <li>
              <FaUser />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
