// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import logo from "./logo.png";
// import "./Navbar.css";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const token = localStorage.getItem("Token");

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     setIsOpen(false);
//   }, [location]);

//   return (
//     <>
//       <nav className="navbar">
//         <div className="navbar-brand">
//           <Link to="/">
//             <img src={logo} alt="" />
//           </Link>
//         </div>
//         <div className="navbar-items">
//           <ul className={`navbar-nav ${isOpen ? "nav-open" : ""}`}>
//             {" "}
//             {token ? (
//               <>
//                 <li>
//                   <Link to="myprofile" className="nav-link">
//                     My profile
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <li>
//                 <Link to="user/signup" className="nav-link">
//                   Join Now
//                 </Link>
//               </li>
//             )}
//             <li>
//               <Link to="festival" className="nav-link">
//                 Festivals
//               </Link>
//             </li>
//             <li>
//               <Link to="temple" className="nav-link">
//                 Temples
//               </Link>
//             </li>
//             <li>
//               <Link to="event" className="nav-link">
//                 Events
//               </Link>
//             </li>
//             <li>
//               <Link to="topic" className="nav-link">
//                 Topics
//               </Link>
//             </li>
//             <li>
//               <Link to="place" className="nav-link">
//                 Sites
//               </Link>
//             </li>
//             <li>
//               <Link to="profile" className="nav-link">
//                 Charecters
//               </Link>
//             </li>
//             <li>
//               <Link to="tech" className="nav-link">
//                 Technology
//               </Link>
//             </li>
//             <li>
//               <Link to="organisation" className="nav-link">
//                 Organisations
//               </Link>
//             </li>
//           </ul>
//           <div className="navbar-toggler">
//             <input
//               id="checkbox"
//               type="checkbox"
//               checked={isOpen}
//               onChange={handleToggle}
//             />
//             <label className="nav-toggle" htmlFor="checkbox">
//               <div id="bar1" className="nav-bars"></div>
//               <div id="bar2" className="nav-bars"></div>
//               <div id="bar3" className="nav-bars"></div>
//             </label>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserPlus,
  faCalendarDays,
  faBell,
  faBook,
  faLocationDot,
  faAddressCard,
  faRobot,
  faBuilding,
  faPlaceOfWorship,
} from "@fortawesome/free-solid-svg-icons";
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

  const CustomIcon = ({ icon, ...props }) => {
    return (
      <FontAwesomeIcon
        icon={icon}
        style={{ color: "698aea", fontSize: "20px" }}
        fixedWidth
        {...props}
      />
    );
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
          <ul className={`navbar-nav ${isOpen ? "nav-open" : ""}`}>
            {" "}
            {token ? (
              <>
                <li>
                  <Link to="myprofile" className="nav-link">
                    <CustomIcon icon={faUser} /> My profile
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="user/signup" className="nav-link">
                  <CustomIcon icon={faUserPlus} /> Join Now
                </Link>
              </li>
            )}
            <li>
              <Link to="festival" className="nav-link">
                <CustomIcon icon={faCalendarDays} /> Festivals
              </Link>
            </li>
            <li>
              <Link to="temple" className="nav-link">
                <CustomIcon icon={faPlaceOfWorship} /> Temples
              </Link>
            </li>
            <li>
              <Link to="event" className="nav-link">
                <CustomIcon icon={faBell} /> Events
              </Link>
            </li>
            <li>
              <Link to="topic" className="nav-link">
                <CustomIcon icon={faBook} /> Topics
              </Link>
            </li>
            <li>
              <Link to="place" className="nav-link">
                <CustomIcon icon={faLocationDot} /> Sites
              </Link>
            </li>
            <li>
              <Link to="profile" className="nav-link">
                <CustomIcon icon={faAddressCard} /> Charecters
              </Link>
            </li>
            <li>
              <Link to="tech" className="nav-link">
                <CustomIcon icon={faRobot} /> Technology
              </Link>
            </li>
            <li>
              <Link to="organisation" className="nav-link">
                <CustomIcon icon={faBuilding} /> Organisations
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
