import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";

export default function DetailsPanchaSabhi() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPanchaSabhi = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/places/PanchaSabhai/${id}`
        );
        if (data?.success) {
          setData(data.data);
        } else {
          throw new Error("Failed to fetch Pancha Sabhai details");
        }
      } catch (err) {
        alert(
          err.message ||
            "An error occurred while fetching Pancha Sabhai details"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPanchaSabhi();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Data")) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/places/PanchaSabhai/${id}`
        );
        if (data?.success) {
          alert("Panch Sabhi temple deleted successfully");
          navigate("/place/pancha-sabhi");
        } else {
          throw new Error("Failed to delete Data");
        }
      } catch (err) {
        alert(err.message || "An error occurred while deleting the data");
      }
    }
  };

  return (
    <div id="profile-detail-container">
      <h1>{data.name}</h1>
      <p className="profile-info">
        Views: {data.views} | Last updated at:{" "}
        {new Date(data.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        |{" "}
        {new Date(data.updatedAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
      <hr />
      <div>
        <p>
          <strong>City:</strong> {data.location.city}
        </p>
        <p>
          <strong>State:</strong> {data.location.state}
        </p>
        <p>
          <strong>Country:</strong> {data.location.country}
        </p>
        <p>
          <strong>Latitude:</strong> {data.location.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {data.location.longitude}
        </p>
        <p>
          <strong>Deity:</strong> {data.deity}
        </p>
        <p>
          <strong>Temple Name:</strong> {data.templeName}
        </p>
        <p>
          <strong>Significance:</strong> {data.significance}
        </p>
        <p>
          <strong>Legend:</strong> {data.legend}
        </p>
        <p>
          <strong>Description:</strong> {data.description}
        </p>
        <p>
          <strong>Best Time to Visit:</strong> {data.bestTimeToVisit}
        </p>
        <p>
          <strong>Visiting Hours:</strong> {data.visitingHours}
        </p>
        <p>
          <strong>Offerings:</strong> {data.offerings}
        </p>
        <p>
          <strong>Accommodation:</strong> {data.accommodation}
        </p>
        <p>
          <strong>Nearby Places:</strong> {data.nearbyPlaces}
        </p>
        <p>
          <strong>Sabhai:</strong> {data.sabhai}
        </p>
        <p>
          <strong>Associated Dance Form:</strong> {data.associatedDanceForm}
        </p>
        <p>
          <strong>Festivals:</strong> {data.festivals}
        </p>
        <p>
          <strong>Rituals:</strong> {data.rituals}
        </p>
      </div>
      {GetUserId() === data.userId && (
        <div style={{ margin: "20px" }}>
          <Link to={`/place/pancha-sabhi/update/${id}`}>
            <button style={{ margin: "10px 30px" }}>Update Data</button>
          </Link>
          <button onClick={handleDelete}>Delete Panch Kedar Temple</button>
        </div>
      )}{" "}
      <div id="profile-notes-container">
        <h2>Notes:</h2>
        {data.notes?.length > 0 ? (
          data.notes.map((note, index) => (
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
