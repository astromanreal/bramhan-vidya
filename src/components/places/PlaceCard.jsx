import { Link } from "react-router-dom";

export default function PlaceCard({ data }) {
  return (
    <>
      <div id="place-card">
        <Link to={data._id}>
          <img
            src={
              data.image || "https://i.postimg.cc/8k20mkm6/places-alt-image.jpg"
            }
            alt="Lord Shiva"
            id="clickable-img"
          />
          <h2>{data.name}</h2>
        </Link>
        <p className="place-card-description">
          {data.title || "No title given"}
        </p>
        <p>Om Namah Shivaya</p>
      </div>
    </>
  );
}
