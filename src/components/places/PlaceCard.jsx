import { Link } from "react-router-dom";

export default function PlaceCard({ data }) {
  return (
    <>
      <div id="place-card">
        <Link to={data._id}>
          <img
            src="https://cdn.pixabay.com/photo/2015/12/26/08/14/rishikesh-1108399_640.jpg"
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
