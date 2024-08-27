import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PlaceFeed() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/users/placefeed"
        );
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

  const handleNextPlace = () => {
    if (currentIndex < places.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevPlace = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleViewMore = () => {
    const currentPlace = places[currentIndex];
    if (currentPlace) {
      const placeId = currentPlace._id;
      const placePath = currentPlace.path;
      navigate(`/place/${placePath}/${placeId}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const currentPlace = places[currentIndex] || {};

  return (
    <>
      <div id="profile-feed">
        <div className="profile-feed-card">
          <img
            src={
              "https://images.pexels.com/photos/20035462/pexels-photo-20035462/free-photo-of-elderly-woman-meditating-in-front-of-a-statue-of-parvati-on-the-ganges.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt={currentPlace.name || "Place"}
          />
          <div className="profile-contents">
            <h2>{currentPlace.name}</h2>
            <p>
              <strong>Type:</strong> {currentPlace.path || "N/A"}
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
              maiores unde nostrum harum animi asperiores ab recusandae itaque
              nam porro.
            </p>
          </div>
          <div className="profile-buttons">
            <button onClick={handlePrevPlace} disabled={currentIndex === 0}>
              Previous
            </button>{" "}
            <button onClick={handleViewMore}>View More</button>
            <button
              onClick={handleNextPlace}
              disabled={currentIndex === places.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
