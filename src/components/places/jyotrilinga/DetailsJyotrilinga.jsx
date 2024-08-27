import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";

export default function DetailsJyotrilinga() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/places/jyotirlinga/${id}`
        );
        setDetails(data.data);
      } catch (err) {
        alert(
          err.message || "An error occurred while fetching Jyotirlinga details"
        );
      }
    };
    fetchDetails();
  }, [id]);

  if (!details) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Data?")) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/places/Jyotirlinga/${id}`
        );
        if (data?.success) {
          alert("Deleted successfully");
          navigate("/place/jyotrilinga");
        } else {
          throw new Error("Failed to delete Data");
        }
      } catch (err) {
        alert(err.message || "An error occurred while deleting the Data");
      }
    }
  };

  return (
    <div id="profile-detail-container">
      <h1>{details.name}</h1>{" "}
      <p className="profile-info">
        Views: {details.views} | Last updated at:{" "}
        {new Date(details.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        |{" "}
        {new Date(details.updatedAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
      <hr />
      <div>
        <p>
          <strong>Deity:</strong> {details.deity}
        </p>
        <p>
          <strong>Temple Name:</strong> {details.templeName}
        </p>
        <p>
          <strong>Significance:</strong> {details.significance}
        </p>
        <p>
          <strong>Legend:</strong> {details.legend}
        </p>
        <p>
          <strong>Description:</strong> {details.description}
        </p>
        <p>
          <strong>Best Time to Visit:</strong> {details.bestTimeToVisit}
        </p>
        <p>
          <strong>Visiting Hours:</strong> {details.visitingHours}
        </p>
        <p>
          <strong>Offerings:</strong> {details.offerings}
        </p>

        <p>
          <strong>Nearby Places:</strong> {details.nearbyPlaces}
        </p>
        <p>
          <strong>Lingam Form:</strong> {details.lingamForm}
        </p>
        <p>
          <strong>Temple Architecture:</strong> {details.templeArchitecture}
        </p>
        <p>
          <strong>Temple History:</strong> {details.templeHistory}
        </p>
        <p>
          <strong>Pilgrimage Importance:</strong> {details.pilgrimageImportance}
        </p>
        <p>
          <strong>Nearby River:</strong> {details.nearbyRiver}
        </p>
        <p>
          <strong>Nearby Mountain:</strong> {details.nearbyMountain}
        </p>
        <p>
          <strong>Festivals:</strong> {details.festivals}
        </p>
        <p>
          <strong>Rituals:</strong> {details.rituals}
        </p>
      </div>
      {GetUserId() === details.userId && (
        <div style={{ margin: "20px" }}>
          <Link to={`/place/jyotrilinga/update/${id}`}>
            <button style={{ margin: "10px 30px" }}>Update Data</button>
          </Link>
          <button onClick={handleDelete}>Delete Data</button>
        </div>
      )}{" "}
      <div id="profile-notes-container">
        <h2>Notes:</h2>
        {details.notes?.length > 0 ? (
          details.notes.map((note, index) => (
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
