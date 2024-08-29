import "./Home.css";
import { Link } from "react-router-dom";
import Page2 from "./Page2";

export default function Home() {
  return (
    <>
      <Page2 />
      <HomeHeader />
    </>
  );
}

export function HomeHeader() {
  return (
    <>
      <img
        src="https://i.postimg.cc/fTKCFdTw/home-header.jpg"
        alt="Lush Green Fields"
        className="HomeHeader-hero-image"
      />
      <section className="HomeHeader-introduction">
        <p>
          Explore the timeless wisdom and spiritual heritage of Hinduism, a
          journey that will transform your understanding of the universe and
          yourself.
        </p>
        <p>
          Our application is a gateway to the ancient knowledge, sacred texts,
          and spiritual practices that have shaped the lives of millions.
        </p>
      </section>

      <section className="HomeHeader-how-we-help">
        <h2>How we guide your spiritual journey</h2>
        <div className="HomeHeader-help-cards">
          <div className="HomeHeader-help-card">
            <img
              src="https://i.postimg.cc/FRDXz8Fq/Personal-Growth.jpg"
              alt="Personal Growth Icon"
              className="HomeHeader-help-icon"
            />
            <h3>Personal Growth</h3>
            <p>
              Discover practical wisdom and spiritual practices to enhance your
              daily life, cultivating inner peace, and self-awareness.
            </p>
          </div>
          <div className="HomeHeader-help-card">
            <img
              src="https://i.postimg.cc/j21VQf74/Community-Support.jpg"
              alt="Community Support Icon"
              className="HomeHeader-help-icon"
            />
            <h3>Community Support</h3>
            <p>
              Connect with like-minded individuals and spiritual seekers,
              sharing knowledge, experiences, and growth.
            </p>
          </div>

          <div className="HomeHeader-help-card">
            <img
              src="https://i.postimg.cc/fLwhwDsm/Authentic-Resources.jpg"
              alt="Spiritual Guidance Icon"
              className="HomeHeader-help-icon"
            />
            <h3>Authentic Resources</h3>
            <p>
              Access a vast library of sacred texts, scriptures, and spiritual
              teachings from renowned gurus and scholars.
            </p>
          </div>
          <div className="HomeHeader-help-card">
            <img
              src="https://i.postimg.cc/PqnjR1F6/Cultural-Heritage.jpg"
              alt="Cultural Heritage Icon"
              className="HomeHeader-help-icon"
            />
            <h3>Cultural Heritage</h3>
            <p>
              Explore the rich cultural heritage of Hinduism, including its
              history, art, architecture, and festivals.
            </p>
          </div>
        </div>
      </section>

      <section className="HomeHeader-redirect">
        <h2>
          Explore the wisdom of Sanatan Dharma ❤️
          <br />
          Discover the timeless traditions
        </h2>
        <p>
          BROWSE OUR LIBRARY OF SACRED TEXTS, SPIRITUAL PRACTICES, AND CULTURAL
          HERITAGE
        </p>
        <Link to="explore">ENTER THE PORTAL</Link>
        <div className="arrow"></div>
      </section>
    </>
  );
}
