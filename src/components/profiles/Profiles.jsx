import { Link } from "react-router-dom";
import "./Profile.css";
import * as img from "./img/exports";
// import ProfileFeeds from "./ProfileFeeds";
import { Helmet } from "react-helmet";
import { useEffect, useMemo, useState } from "react";
import apiUrl from "../utils/GetApiUrl";

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
      <Search />
      {/* <ProfileFeeds /> */}
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
const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSearchPerformed(true);
    const response = await fetch(
      `${apiUrl}/users/search-profiles?query=${query}`
    );
    const data = await response.json();
    setSearchResults(data.data);
    setLoading(false);
  };

  return (
    <div className="profile-search-container">
      <form onSubmit={handleSearch}>
        <input
          type="search"
          value={query}
          required
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for profiles..."
        />
        <button type="submit">{loading ? "Searching..." : "🔍"}</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="search-results">
          {searchPerformed && searchResults.length === 0 ? (
            <div>No profiles found</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div key={result._id}>
                <h2>{result.name}</h2>
                <p>{result.description}</p>
                <Link to={`${result.path}/${result._id}`}>
                  <button>View more</button>
                </Link>
              </div>
            ))
          ) : null}
        </div>
      )}
    </div>
  );
};
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
