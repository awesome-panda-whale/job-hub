import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import "./styleCSS/navbar.css";

const Navbar = () => {
  const { isAuth, username, logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/application" className="navbar-logo">
          JobHub
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="users/dashboard" className="navbar-link">
              Dashboard
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/application" className="navbar-link">
              Application
            </Link>
          </li>
          {isAuth && (
            <>
              <li className="navbar-item navbar-username">Hi, {username}</li>
              <li className="navbar-item">
                <Link to="" onClick={logout} className="navbar-link">
                  Logout
                </Link>
              </li>
            </>
          )}
          {!isAuth && (
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
