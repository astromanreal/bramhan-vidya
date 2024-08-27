import React from "react";

export default function ProfileHeader({ title, desc }) {
  return (
    <>
      <div id="profile-page-header-holder">
        <header id="profile-page-header">
          <h1>{title}</h1>
          <p>{desc}</p>
        </header>
      </div>
    </>
  );
}
