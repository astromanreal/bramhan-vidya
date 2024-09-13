import { Link } from "react-router-dom";
import Page from "./Page";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Page />
      <HomeHeader />
    </>
  );
}

export function HomeHeader() {
  return (
    <>
      <img
        src="https://i.postimg.cc/3Rc8ZhBx/dharma.webp"
        alt="Sanatan dharma is great!"
        className="HomeHeader-hero-image"
      />

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
