import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import GetUserId from "../../utils/GetUserId";

export default function DetailsPanchKedar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [panchKedar, setPanchKedar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPanchKedarDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/places/panchKedar/${id}`
        );
        if (data?.success) {
          setPanchKedar(data.data);
          document.title = `Panch Kedar - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Panch Kedar details");
        }
      } catch (err) {
        alert(err.message || "Error in fetching the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchPanchKedarDetails();
  }, [id]);

  const handleDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this Panch Kedar temple?")
    ) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/places/panchKedar/${id}`
        );
        if (data?.success) {
          alert("Panch Kedar temple deleted successfully");
          navigate("/place/panch-kedar");
        } else {
          throw new Error("Failed to delete Panch Kedar temple");
        }
      } catch (err) {
        alert(
          err.message ||
            "An error occurred while deleting the Panch Kedar temple"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!panchKedar) {
    return <p>No Panch Kedar temple found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{panchKedar.name}</h1>
        <p className="profile-info">
          Views: {panchKedar.views} | Last updated at:{" "}
          {new Date(panchKedar.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |{" "}
          {new Date(panchKedar.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Temple Name:</strong>{" "}
            {panchKedar.templeName || "Not Available"}
          </p>
          <p>
            <strong>Location:</strong>
            <br />
            City: {panchKedar.location.city || "Not Available"}
            <br />
            State: {panchKedar.location.state || "Not Available"}
            <br />
            Country: {panchKedar.location.country || "Not Available"}
            <br />
            Latitude: {panchKedar.location.latitude || "Not Available"}
            <br />
            Longitude: {panchKedar.location.longitude || "Not Available"}
          </p>
          <p>
            <strong>Deity:</strong> {panchKedar.deity || "Not Available"}
          </p>
          <p>
            <strong>Significance:</strong>{" "}
            {panchKedar.significance || "Not Available"}
          </p>
          <p>
            <strong>Legend:</strong> {panchKedar.legend || "Not Available"}
          </p>
          <p>
            <strong>Images:</strong>{" "}
            {panchKedar.images.join(", ") || "Not Available"}
          </p>
          <p>
            <strong>Best Time to Visit:</strong>{" "}
            {panchKedar.bestTimeToVisit || "Not Available"}
          </p>
          <p>
            <strong>Visiting Hours:</strong>{" "}
            {panchKedar.visitingHours || "Not Available"}
          </p>
          <p>
            <strong>Offerings:</strong>{" "}
            {panchKedar.offerings || "Not Available"}
          </p>
          <p>
            <strong>Accommodation:</strong>{" "}
            {panchKedar.accommodation || "Not Available"}
          </p>
          <p>
            <strong>Nearby Places:</strong>{" "}
            {panchKedar.nearbyPlaces || "Not available"}
          </p>
          <p>
            <strong>Festivals:</strong>{" "}
            {panchKedar.festivals || "Not available"}
          </p>
          <p>
            <strong>Rituals:</strong> {panchKedar.rituals || "Not available"}
          </p>
        </div>
        <hr />
        {GetUserId() === panchKedar.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/place/panch-kedar/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Panch Kedar Temple</button>
          </div>
        )}{" "}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {panchKedar.notes?.length > 0 ? (
            panchKedar.notes.map((note, index) => (
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
    </>
  );
}
