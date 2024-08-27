import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import GetUserId from "../../utils/GetUserId";

export default function DetailsSaptPuri() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [saptPuri, setSaptPuri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaptPuriDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/places/SaptPuri/${id}`
        );
        if (data?.success) {
          setSaptPuri(data.data);
          document.title = `Sapt Puri - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Sapt Puri details");
        }
      } catch (err) {
        alert(err.message || "Error while fetching the Data..");
      } finally {
        setLoading(false);
      }
    };

    fetchSaptPuriDetails();
  }, [id]);

  const handleDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this Sapt Puri temple?")
    ) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/places/SaptPuri/${id}`
        );
        if (data?.success) {
          alert("Sapt Puri temple deleted successfully");
          navigate("/place/sapt-puri");
        } else {
          throw new Error("Failed to delete Sapt Puri temple");
        }
      } catch (err) {
        alert(
          err.message || "An error occurred while deleting the Sapt Puri temple"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!saptPuri) {
    return <p>No Sapt Puri temple found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1> {saptPuri.name}</h1>{" "}
        <p className="profile-info">
          Views: {saptPuri.views} | Last updated at:{" "}
          {new Date(saptPuri.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |{" "}
          {new Date(saptPuri.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Location:</strong>
            <br />
            City: {saptPuri.location.city || "Not Available"}
            <br />
            State: {saptPuri.location.state || "Not Available"}
            <br />
            Country: {saptPuri.location.country || "Not Available"}
            <br />
            Latitude: {saptPuri.location.latitude || "Not Available"}
            <br />
            Longitude: {saptPuri.location.longitude || "Not Available"}
          </p>
          <p>
            <strong>Deity:</strong> {saptPuri.deity || "Not Available"}
          </p>
          <p>
            <strong>Temple Name:</strong>{" "}
            {saptPuri.templeName || "Not Available"}
          </p>
          <p>
            <strong>Significance:</strong>{" "}
            {saptPuri.significance || "Not Available"}
          </p>
          <p>
            <strong>Legend:</strong> {saptPuri.legend || "Not Available"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {saptPuri.description || "Not Available"}
          </p>
          <p>
            <strong>Best Time to Visit:</strong>{" "}
            {saptPuri.bestTimeToVisit || "Not Available"}
          </p>
          <p>
            <strong>Visiting Hours:</strong>{" "}
            {saptPuri.visitingHours || "Not Available"}
          </p>
          <p>
            <strong>Offerings:</strong> {saptPuri.offerings || "Not Available"}
          </p>
          <p>
            <strong>Accommodation:</strong>{" "}
            {saptPuri.accommodation || "Not Available"}
          </p>
          <p>
            <strong>Nearby Places:</strong>
            {saptPuri.nearbyPlaces || "Not available"}
          </p>
          <p>
            <strong>Moksha Importance:</strong>{" "}
            {saptPuri.mokshaImportance || "Not Available"}
          </p>{" "}
          <p>
            <strong>Liberation Story:</strong>{" "}
            {saptPuri.liberationStory || "Not Available"}
          </p>
          <p>
            <strong>Temple History:</strong>{" "}
            {saptPuri.templeHistory || "Not Available"}
          </p>
          <p>
            <strong>Festivals:</strong>
            {saptPuri.festivals || "Not available"}
          </p>
          <p>
            <strong>Rituals:</strong>
            {saptPuri.rituals || "Not available"}
          </p>
        </div>
        <hr />
        {GetUserId() === saptPuri.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/place/sapt-puri/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Sapt Puri Temple</button>
          </div>
        )}{" "}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {saptPuri.notes?.length > 0 ? (
            saptPuri.notes.map((note, index) => (
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
