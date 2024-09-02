import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../utils/GetApiUrl";
import Slider from "react-slick";
import axios from "axios";

export default function PlaceFeed() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    pauseOnHover: true,
    slidesToScroll: 1,
    beforeChange: (prev, next) => setSlideIndex(next),
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/users/placefeed`);
        if (data?.success) {
          setPlaces(data.data);
        } else {
          throw new Error("Failed to fetch places");
        }
      } catch (err) {
        alert(err.message || "An error occurred while fetching places");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);
  return (
    <>
      <section className="slider-section">
        <div className="slider-container">
          {loading ? (
            <p>Loading Place feeds...</p>
          ) : (
            <Slider {...settings}>
              {places.map((item, index) => (
                <div className="slider-card" key={index}>
                  <img
                    src={
                      item.image ||
                      "https://i.postimg.cc/8k20mkm6/places-alt-image.jpg"
                    }
                    alt={item.name}
                  />
                  <div className="slider-card-content">
                    <h2>{item.name}</h2>
                    <p>{item.desciption || "Description not available!"}</p>
                    <button
                      onClick={() => {
                        navigate(`/place/${item.path}/${item._id}`);
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
            <p>
              Place {slideIndex + 1} of {places.length}
            </p>
          )}
        </div>{" "}
      </section>
    </>
  );
}
