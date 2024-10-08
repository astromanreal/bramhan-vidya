import GetRedirectLink from "./../utils/GetRedirectLink";
import apiUrl from "../utils/GetApiUrl";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Community.css";

export default function IndexCommunity() {
  return (
    <>
      <ListCommunity />
      <GetRedirectLink text="community" path="add" />
    </>
  );
}

export function ListCommunity() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/community/Allcommunities`)
      .then((response) => {
        setCommunities(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  return (
    <>
      <div className="community-list">
        {communities &&
          communities.map((community) => (
            <CommunityCard community={community} />
          ))}
      </div>
    </>
  );
}

export function CommunityCard({ community }) {
  return (
    <>
      {community && (
        <Link to={`/community/${community._id}`}>
          <div className="community-card">
            <img
              src={
                community.image ||
                "https://i.postimg.cc/8k20mkm6/places-alt-image.jpg"
              }
              alt={`${community.title} not found`}
            />
            <div className="community-card-content">
              <h2>{community.name}</h2>
              <p>
                {community.description.length > 200
                  ? `${community.description.substring(0, 200)}...`
                  : community.description}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
