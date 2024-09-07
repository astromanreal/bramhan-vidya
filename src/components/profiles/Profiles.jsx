import { Link } from "react-router-dom";
import "./Profile.css";
import * as img from "./img/exports";
import ProfileFeeds from "./ProfileFeeds";
import { Helmet } from "react-helmet";
import { useEffect, useMemo, useState } from "react";

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
        <title>Characters in Hinduism</title>
      </Helmet>
      <ProfilesCovers />
      {/* <header id="profile-img-header">
        <div className="profile-overlay">
          <h1>Characters in Hinduism</h1>
          <p>
            Explore the diverse and fascinating characters from Hindu mythology.
            This collection includes gods, demons, sages, and more, each with
            unique stories and attributes that enrich the tapestry of Hindu
            beliefs and traditions.
          </p>
        </div>
      </header> */}
      <ProfileFeeds />
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

export function ProfilesCovers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = useMemo(
    () => [
      "https://i.postimg.cc/fbk5Zbvv/creatures.jpg",
      "https://i.postimg.cc/ydZPgrtg/lord-shiva.jpg",
      "https://i.postimg.cc/W4K84PWc/demond.jpg",
      "https://i.postimg.cc/g2g4fh3J/lord-vishnu.jpg",
      "https://i.postimg.cc/wM5QFR69/shakti.jpg",
    ],
    []
  );

  const intervalFunction = useMemo(() => {
    return () => {
      setCurrentIndex((currentIndex + 1) % images.length);
    };
  }, [currentIndex, images]);

  useEffect(() => {
    const intervalId = setInterval(intervalFunction, 5000);
    return () => clearInterval(intervalId);
  }, [intervalFunction]);

  return (
    <>
      <div className="cover-slider">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            loading="lazy"
            alt={`image${index + 1}.jpg`}
            className={currentIndex === index ? "active" : ""}
          />
        ))}
      </div>
    </>
  );
}
