import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Community.css";
import GetRedirectLink from "./../utils/GetRedirectLink";

export default function IndexCommunity() {
  return (
    <>
      <h1>Welcome to the Index page of community</h1>
      <ListCommunity />
      <GetRedirectLink text="community" path="add" />
    </>
  );
}

export function ListCommunity() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    axios
      .get("https://bramhan-vidya-api.vercel.app/community/Allcommunities")
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
        {communities.map((community) => (
          <div className="community-card" key={community._id}>
            <img
              src={
                community.image ||
                "https://images.pexels.com/photos/1707425/pexels-photo-1707425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt={community.name}
              className="community-image"
            />
            <h2>
              <Link to={`/community/${community._id}`}>{community.name}</Link>
            </h2>
            <p>
              {community.description.length > 90
                ? `${community.description.substring(0, 90)}...`
                : community.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
