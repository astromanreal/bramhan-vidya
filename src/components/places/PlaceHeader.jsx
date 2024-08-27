import React from "react";

export default function PlaceHeader({ title, desc }) {
  return (
    <>
      <div id="place-page-header-holder">
        <header id="place-page-header">
          <h1>{title}</h1>
          <p>{desc}</p>
        </header>
      </div>
    </>
  );
}
