import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/users/profilefeed"
        );
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

  const handleNextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevProfile = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleViewMore = () => {
    const currentProfile = profiles[currentIndex];
    if (currentProfile) {
      const profileId = currentProfile._id;
      const profilePath = currentProfile.path;
      navigate(`/profile/${profilePath}/${profileId}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const currentProfile = profiles[currentIndex] || {};

  return (
    <>
      <div id="profile-feed">
        <div className="profile-feed-card">
          <img
            src={
              currentProfile.images && currentProfile.images.length > 0
                ? currentProfile.images[0]
                : "https://img.freepik.com/free-photo/young-woman-walking-wooden-path-with-green-rice-field-vang-vieng-laos_335224-1258.jpg?size=626&ext=jpg&ga=GA1.1.557400312.1722491267&semt=ais_hybrid"
            }
            alt={currentProfile.name || "Profile"}
          />
          <div className="profile-contents">
            <h2>{currentProfile.name}</h2>
            <p>
              <strong>Title:</strong> {currentProfile.title || "N/A"}
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
              maiores unde nostrum harum animi asperiores ab recusandae itaque
              nam porro.
            </p>
          </div>
          <div className="profile-buttons">
            <button onClick={handlePrevProfile} disabled={currentIndex === 0}>
              Previous
            </button>{" "}
            <button onClick={handleViewMore}>View More</button>
            <button
              onClick={handleNextProfile}
              disabled={currentIndex === profiles.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
