import React from "react";
import "./Navbar2.css";
import { Link } from "react-router-dom";
import { FaList, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <nav className="left-icon">
          <Link to="/">
            <ul>
              <div class="title">
                <span>K</span>
                <span>i</span>
                <span>u</span>
                <span>T</span>
                <span>u</span>
                <span>b</span>
                <span>e</span>
              </div>
            </ul>
          </Link>
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
