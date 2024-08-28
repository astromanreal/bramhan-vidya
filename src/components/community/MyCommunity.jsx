import { useState, useEffect } from "react";
import GetUserId from "../utils/GetUserId";
import { useNavigate } from "react-router-dom";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";

export default function MyCommunity() {
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(`${apiUrl}/community/my-communities`, {
          params: {
            userId: GetUserId(),
          },
        });
        setCommunities(response.data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchCommunities();
  }, []);

  return (
    <div className="my-communities-container">
      <h1 className="my-communities-title">My Communities</h1>
      <div className="community-list">
        {communities.map((community) => (
          <div key={community._id} className="community-card">
            <h2 className="community-name">{community.name}</h2>
            <p className="community-description">
              {community.description.length > 60
                ? `${community.description.substring(0, 60)}...`
                : community.description}
            </p>
            <button
              className="visit-btn"
              onClick={() => navigate(`/community/${community._id}`)}
            >
              Visit now...
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
