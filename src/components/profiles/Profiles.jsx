import { Link } from "react-router-dom";
import "./Profile.css";
import * as img from "./img/exports";
import ProfileFeeds from "./ProfileFeeds";
import { Helmet } from "react-helmet";

export default function Profiles() {
  const profileList = [
    {
      title: "Adi Shakti",
      path: "shakti",
      image: img.shaktiImg,
    },
    {
      title: "Ganesh",
      path: "ganesha",
      image: img.ganeshImg,
    },
    {
      title: "Nav Durga",
      path: "durga",
      image: img.durgaImg,
    },
    {
      title: "Mahavidya",
      path: "mahavidya",
      image: img.mahavidyaImg,
    },
    {
      title: "Shiva avatar",
      path: "shiva",
      image: img.shivImg,
    },
    {
      title: "Vishnu avatar",
      path: "vishnu",
      image: img.vishnuImg,
    },
    {
      title: "Goddess",
      path: "goddess",
      image: img.goddessImg,
    },
    {
      title: "Gods",
      path: "god",
      image: img.godImg,
    },
    {
      title: "Ramayana",
      path: "ramayana",
      image: img.ramayanaImg,
    },
    {
      title: "Mahabharat",
      path: "mahabharat",
      image: img.mahabharatImg,
    },
    {
      title: "Nav Graha",
      path: "navagraha",
      image: img.navagrahaImg,
    },
    {
      title: "Nagas",
      path: "naga",
      image: img.nagaImg,
    },
    {
      title: "Rishis",
      path: "rishi",
      image: img.rishiImg,
    },
    {
      title: "Vanars",
      path: "vanara",
      image: img.vanaraImg,
    },
    {
      title: "Celestial",
      path: "celestial",
      image: img.celestialImg,
    },
    {
      title: "Creatures",
      path: "creature",
      image: img.creatureImg,
    },
    {
      title: "Demons",
      path: "demon",
      image: img.demonImg,
    },
    {
      title: "Chiranjivi",
      path: "chiranjivi",
      image: img.chiranjiviImg,
    },
    {
      title: "Modern",
      path: "modern",
      image: img.modernImg,
    },
  ];
  return (
    <>
      <Helmet>
        <meta property="og:title" content="Characters in Hinduism" />
        <meta
          property="og:description"
          content="Explore the diverse and fascinating characters from Hindu mythology. This collection includes gods, demons, sages, and more, each with unique stories and attributes that enrich the tapestry of Hindu beliefs and traditions."
        />
        <meta
          property="og:image"
          content="https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
        />
        {/*  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Characters in Hinduism" />
        <meta
          name="twitter:description"
          content="Explore the diverse and fascinating characters from Hindu mythology. This collection includes gods, demons, sages, and more, each with unique stories and attributes that enrich the tapestry of Hindu beliefs and traditions."
        />
        <meta
          name="twitter:image"
          content="https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
        />
        <title>Characters in Hinduism</title>
      </Helmet>
      <header id="profile-img-header">
        <div className="profile-overlay">
          <h1>Characters in Hinduism</h1>
          <p>
            Explore the diverse and fascinating characters from Hindu mythology.
            This collection includes gods, demons, sages, and more, each with
            unique stories and attributes that enrich the tapestry of Hindu
            beliefs and traditions.
          </p>
        </div>
      </header>
      <ProfileFeeds />
      <h1>Explore all Charecters by Categories:</h1>
      <div className="profile-page-list">
        {profileList.map((p) => (
          <div key={p.path} id="profile-page-card">
            <Link to={p.path}>
              <img src={p.image} alt={p.title} />
              <h2>{p.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
