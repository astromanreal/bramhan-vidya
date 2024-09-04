import { useState, useEffect } from "react";
import GetUserId from "../utils/GetUserId";
import { Link } from "react-router-dom";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";

export default function MyCommunity() {
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
        {communities.length > 0 ? (
          communities.map((community) => <MyCommunityCard data={community} />)
        ) : (
          <p>No communities joined yet.</p>
        )}
      </div>
    </div>
  );
}

export function MyCommunityCard({ data }) {
  return (
    <>
      <div className="my-community-card">
        <div className="card-details">
          <p className="text-title">{data.name}</p>
          <p className="text-body">
            {" "}
            {data.description.length > 100
              ? `${data.description.substring(0, 100)}...`
              : data.description}
          </p>
        </div>
        <Link to={`/community/${data._id}`} className="card-button">
          More info
        </Link>
      </div>
    </>
  );
}
