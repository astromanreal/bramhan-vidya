import { useState } from "react";
import "./Navbar.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-items">
          <ul className={`navbar-nav ${isOpen ? "open" : ""}`}>
            <li className="nav-item">
              <Link to="community" className="nav-link">
                Community
              </Link>
            </li>
            <li className="nav-item">
              <Link to="mycommunity" className="nav-link">
                My Community
              </Link>
            </li>
            <li className="nav-item">
              <Link to="myprofile" className="nav-link">
                My profile
              </Link>
            </li>
          </ul>
          <div className="navbar-toggler">
            <button
              className="toggler-button"
              aria-label="Toggle navigation"
              onClick={handleToggle}
            >
              <span className="toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
