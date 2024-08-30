import { Link } from "react-router-dom";
import "./Profile.css";
import * as img from "./img/exports";
import ProfileFeeds from "./ProfileFeeds";

export default function Profiles() {
  const profileList = [
    {
      title: "Ganesh",
      path: "ganesha",
      image: img.ganeshImg,
    },
    {
      title: "Chiranjivi",
      path: "chiranjivi",
      image: img.chiranjiviImg,
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
      title: "Adi Shakti",
      path: "shakti",
      image: img.shaktiImg,
    },
    {
      title: "Vanars",
      path: "vanara",
      image: img.vanaraImg,
    },
    {
      title: "Rishis",
      path: "rishi",
      image: img.rishiImg,
    },
    {
      title: "Gods",
      path: "god",
      image: img.godImg,
    },
    {
      title: "Goddess",
      path: "goddess",
      image: img.goddessImg,
    },
    {
      title: "Nagas",
      path: "naga",
      image: img.nagaImg,
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
      title: "Modern",
      path: "modern",
      image: img.modernImg,
    },
  ];
  return (
    <>
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
