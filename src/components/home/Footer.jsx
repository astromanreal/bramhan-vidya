import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-container">
          <div className="footer-intro">
            <h2>Hinduism: A Journey of Discovery</h2>
            <p>
              Discover the amazing story of Hinduism and explore its rich and
              diverse world, with its ancient roots, incredible history,
              fascinating beliefs, traditions, and practices that have been
              passed down for thousands of years, bringing joy, comfort, and
              meaning to millions of people's lives around the world.
            </p>
          </div>
          <div className="footer-section">
            <h2>Explore</h2>
            <ul>
              <Link to="profile">Deities</Link>
              <Link to="book">Scriptures</Link>
              <Link to="place">Temples</Link>
              <Link to="tech">Technology</Link>
              <Link to="event">Events</Link>
            </ul>
          </div>
          <div className="footer-section">
            <h2>Features</h2>
            <ul>
              <Link to="blog">Blogs</Link>
              <Link to="community">Community</Link>
              <Link to="user">user guide</Link>
              <Link to="user/signup">Join now!</Link>
            </ul>
          </div>
          <div className="footer-section">
            <h2>Resources</h2>
            <ul>
              <Link to="myprofile">My Account</Link>
              <Link to="mycommunity">My community</Link>
              <Link>Contact & Support</Link>
              <Link>Privacy policy</Link>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <ul>
            <Link to="">Home</Link>
            <Link to="about">About</Link>
            <Link to="explore">More...</Link>
          </ul>
          <p>&copy; 2024 Hinduism App</p>
        </div>
      </footer>
    </>
  );
}
