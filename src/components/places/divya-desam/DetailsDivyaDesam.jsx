import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";

export default function DetailsDivyaDesam() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [divyaDesam, setDivyaDesam] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDivyaDesam = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/places/DivyaDesam/${id}`
        );
        setDivyaDesam(data.data);
      } catch (err) {
        alert(err.message || "Failed to fetch Divya Desam details");
      } finally {
        setLoading(false);
      }
    };

    fetchDivyaDesam();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!divyaDesam) return <div>No Divya Desam found</div>;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Divya Desam?")) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/places/DivyaDesam/${id}`
        );
        if (data?.success) {
          alert("Divya Desam deleted successfully");
          navigate("/place/divya-desam");
        } else {
          throw new Error("Failed to delete Data");
        }
      } catch (err) {
        alert(
          err.message || "An error occurred while deleting the Divya Desam"
        );
      }
    }
  };

  return (
    <div id="profile-detail-container">
      <h1>{divyaDesam.name}</h1>{" "}
      <p className="profile-info">
        Views: {divyaDesam.views} | Last updated at:{" "}
        {new Date(divyaDesam.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        |{" "}
        {new Date(divyaDesam.updatedAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
      <hr />
      <div>
        <p>
          <strong>Temple Name:</strong> {divyaDesam.templeName}
        </p>
        <p>
          <strong>Significance:</strong> {divyaDesam.significance}
        </p>
        <p>
          <strong>Legend:</strong> {divyaDesam.legend}
        </p>
        <p>
          <strong>Description:</strong> {divyaDesam.description}
        </p>
        <p>
          <strong>Best Time to Visit:</strong> {divyaDesam.bestTimeToVisit}
        </p>
        <p>
          <strong>Visiting Hours:</strong> {divyaDesam.visitingHours}
        </p>
        <p>
          <strong>Offerings:</strong> {divyaDesam.offerings}
        </p>
        <p>
          <strong>Accommodation:</strong> {divyaDesam.accommodation}
        </p>
        <p>
          <strong>Nearby Places:</strong> {divyaDesam.nearbyPlaces}
        </p>
        <p>
          <strong>Desam Order:</strong> {divyaDesam.desamOrder}
        </p>
        <p>
          <strong>Associated Vishnu Form:</strong>{" "}
          {divyaDesam.associatedVishnuForm}
        </p>
        <p>
          <strong>Festivals:</strong> {divyaDesam.festivals}
        </p>
        <p>
          <strong>Rituals:</strong> {divyaDesam.rituals}
        </p>

        {divyaDesam.location && (
          <div>
            <h2>Location</h2>
            <p>
              <strong>City:</strong> {divyaDesam.location.city}
            </p>
            <p>
              <strong>State:</strong> {divyaDesam.location.state}
            </p>
            <p>
              <strong>Country:</strong> {divyaDesam.location.country}
            </p>
            <p>
              <strong>Latitude:</strong> {divyaDesam.location.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {divyaDesam.location.longitude}
            </p>
          </div>
        )}
      </div>
      {GetUserId() === divyaDesam.userId && (
        <div style={{ margin: "20px" }}>
          <Link to={`/place/divya-desam/update/${id}`}>
            <button style={{ margin: "10px 30px" }}>Update Data</button>
          </Link>
          <button onClick={handleDelete}>Delete Data</button>
        </div>
      )}{" "}
      <div id="profile-notes-container">
        <h2>Notes:</h2>
        {divyaDesam.notes?.length > 0 ? (
          divyaDesam.notes.map((note, index) => (
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
