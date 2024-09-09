import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./Navbar.css";

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
            {" "}
            {token ? (
              <>
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
              <Link to="event" className="nav-link">
                Events
              </Link>
            </li>
            <li>
              <Link to="topic" className="nav-link">
                Topics
              </Link>
            </li>
            <li>
              <Link to="tech" className="nav-link">
                Technology
              </Link>
            </li>
            <li>
              <Link to="place" className="nav-link">
                Temples
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
