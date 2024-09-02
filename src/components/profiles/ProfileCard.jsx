import React from "react";
import { Link } from "react-router-dom";

export default function ProfileCard({ data }) {
  return (
    <>
      <div id="profile-card">
        <Link to={data._id}>
          <img
            src={
              data.image ||
              "https://i.postimg.cc/m276Xxm6/profiles-alt-image.jpg"
            }
            alt="Lord Shiva"
          />
        </Link>
        <div id="profile-contents">
          <h2>{data.name}</h2>
          <h4>{data.title || "No title given"}</h4>
          <p>{data.mantra || "not available"}</p>
        </div>
      </div>
    </>
  );
}
