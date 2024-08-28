import { useNavigate, useParams, Link } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailsCharDham() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [charDham, setCharDham] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharDhamDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/places/charDham/${id}`);
        setCharDham(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch Char Dham details");
      }
    };

    fetchCharDhamDetails();
  }, [id]);

  if (error) return <p>{error}</p>;

  if (!charDham) return <p>Loading...</p>;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete Char Dham?")) {
      try {
        const { data } = await axios.delete(`${apiUrl}/places/CharDham/${id}`);
        if (data?.success) {
          alert("Char Dham deleted successfully");
          navigate("/place/char-dham");
        } else {
          throw new Error("Failed to delete Data");
        }
      } catch (err) {
        alert(err.message || "An error occurred while deleting the Char Dham");
      }
    }
  };

  return (
    <div id="profile-detail-container">
      <h1>{charDham.name}</h1>{" "}
      <p className="profile-info">
        Views: {charDham.views} | Last updated at:{" "}
        {new Date(charDham.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        |{" "}
        {new Date(charDham.updatedAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
      <hr />
      <div>
        <p>
          <strong>City:</strong> {charDham.location.city}
        </p>
        <p>
          <strong>State:</strong> {charDham.location.state}
        </p>
        <p>
          <strong>Country:</strong> {charDham.location.country}
        </p>
        <p>
          <strong>Latitude:</strong> {charDham.location.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {charDham.location.longitude}
        </p>
        <p>
          <strong>Deity:</strong> {charDham.deity}
        </p>
        <p>
          <strong>Temple Name:</strong> {charDham.templeName}
        </p>
        <p>
          <strong>Significance:</strong> {charDham.significance}
        </p>
        <p>
          <strong>Legend:</strong> {charDham.legend}
        </p>
        <p>
          <strong>Description:</strong> {charDham.description}
        </p>
        <p>
          <strong>Best Time to Visit:</strong> {charDham.bestTimeToVisit}
        </p>
        <p>
          <strong>Visiting Hours:</strong> {charDham.visitingHours}
        </p>
        <p>
          <strong>Offerings:</strong> {charDham.offerings}
        </p>
        <p>
          <strong>Accommodation:</strong> {charDham.accommodation}
        </p>
        <p>
          <strong>Nearby Places:</strong> {charDham.nearbyPlaces}
        </p>
      </div>
      {GetUserId() === charDham.userId && (
        <div style={{ margin: "20px" }}>
          <Link to={`/place/char-dham/update/${id}`}>
            <button style={{ margin: "10px 30px" }}>Update Data</button>
          </Link>
          <button onClick={handleDelete}>Delete Data</button>
        </div>
      )}{" "}
      <div id="profile-notes-container">
        <h2>Notes:</h2>
        {charDham.notes?.length > 0 ? (
          charDham.notes.map((note, index) => (
            <div key={index}>
              <h3>{note.key}</h3>
              <p>{note.value}</p>
            </div>
          ))
        ) : (
          <p id="no-data">No Notes available!</p>
        )}
      </div>
    </div>
  );
}
