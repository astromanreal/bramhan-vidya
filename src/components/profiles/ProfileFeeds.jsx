import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "./../utils/GetApiUrl";
import Slider from "react-slick";
import axios from "axios";

export default function ProfileFeeds() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    pauseOnHover: true,
    slidesToScroll: 1,
    // beforeChange: (prev, next) => setSlideIndex(next),
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/users/profilefeed`);
        if (data?.success) {
          setProfiles(data.data);
        } else {
          throw new Error("Failed to fetch profiles");
        }
      } catch (err) {
        alert(err.message || "An error occurred while fetching profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);
  return (
    <>
      <section className="slider-section">
        <div className="slider-container">
          {loading ? (
            <p>Loading profile feeds...</p>
          ) : (
            <Slider {...settings}>
              {profiles.map((item, index) => (
                <div className="slider-card" key={index}>
                  <img
                    src={
                      item.image ||
                      "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                    }
                    alt={item.title}
                  />
                  <div className="slider-card-content">
                    <h2>{item.title}</h2>
                    <h3>{item.name}</h3>
                    <p>{item.description || "Description not available!"}</p>
                    <button
                      onClick={() => {
                        navigate(`/profile/${item.path}/${item._id}`);
                      }}
                    >
                      Know more..
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
          )}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p>{/* Profile {slideIndex + 1} of {profiles.length} */}</p>
          )}
        </div>{" "}
      </section>
    </>
  );
}
