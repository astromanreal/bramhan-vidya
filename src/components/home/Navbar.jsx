import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("Token");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-items">
          <ul className={`navbar-nav ${isOpen ? "nav-open" : ""}`}>
            <li>
              <Link to="community" className="nav-link">
                Community
              </Link>
            </li>
            {token ? (
              <>
                <li>
                  <Link to="mycommunity" className="nav-link">
                    My Community
                  </Link>
                </li>
                <li>
                  <Link to="myprofile" className="nav-link">
                    My profile
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="user/signup" className="nav-link">
                  Join Now
                </Link>
              </li>
            )}
            <li>
              <Link to="more" className="nav-link">
                More
              </Link>
            </li>
          </ul>
          <div className="navbar-toggler">
            <input
              id="checkbox"
              type="checkbox"
              checked={isOpen}
              onChange={handleToggle}
            />
            <label className="nav-toggle" htmlFor="checkbox">
              <div id="bar1" className="nav-bars"></div>
              <div id="bar2" className="nav-bars"></div>
              <div id="bar3" className="nav-bars"></div>
            </label>
          </div>
        </div>
      </nav>
    </>
  );
}
