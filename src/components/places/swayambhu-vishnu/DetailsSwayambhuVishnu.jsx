import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import GetUserId from "../../utils/GetUserId";

export default function DetailsSwayambhuVishnu() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [swayambhuVishnu, setSwayambhuVishnu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSwayambhuVishnuDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/places/swayambhuVishnu/${id}`
        );
        if (data?.success) {
          setSwayambhuVishnu(data.data);
          document.title = `Swayambhu Vishnu - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Swayambhu Vishnu details");
        }
      } catch (err) {
        alert(err.message || "Error while fetching the data!");
      } finally {
        setLoading(false);
      }
    };

    fetchSwayambhuVishnuDetails();
  }, [id]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this Swayambhu Vishnu temple?"
      )
    ) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/places/SwayambhuVishnu/${id}`
        );
        if (data?.success) {
          alert("Swayambhu Vishnu temple deleted successfully");
          navigate("/place/swayambhu-vishnu");
        } else {
          throw new Error("Failed to delete Swayambhu Vishnu temple");
        }
      } catch (err) {
        alert(
          err.message ||
            "An error occurred while deleting the Swayambhu Vishnu temple"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!swayambhuVishnu) {
    return <p>No Swayambhu Vishnu temple found</p>;
  }
  return (
    <>
      <div id="profile-detail-container">
        <h1> {swayambhuVishnu.name}</h1>{" "}
        <p className="profile-info">
          Views: {swayambhuVishnu.views} | Last updated at:{" "}
          {new Date(swayambhuVishnu.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |{" "}
          {new Date(swayambhuVishnu.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Temple Name:</strong> {swayambhuVishnu.templeName}
          </p>
          <p>
            <strong>Location:</strong>
            <br />
            City: {swayambhuVishnu.location.city || "Not Available"}
            <br />
            State: {swayambhuVishnu.location.state || "Not Available"}
            <br />
            Country: {swayambhuVishnu.location.country || "Not Available"}
            <br />
            Latitude: {swayambhuVishnu.location.latitude || "Not Available"}
            <br />
            Longitude: {swayambhuVishnu.location.longitude || "Not Available"}
          </p>
          <p>
            <strong>Deity:</strong> {swayambhuVishnu.deity || "Not Available"}
          </p>
          <p>
            <strong>Significance:</strong>{" "}
            {swayambhuVishnu.significance || "Not Available"}
          </p>
          <p>
            <strong>Legend:</strong> {swayambhuVishnu.legend || "Not Available"}
          </p>
          <p>
            <strong>Best Time to Visit:</strong>{" "}
            {swayambhuVishnu.bestTimeToVisit || "Not Available"}
          </p>
          <p>
            <strong>Visiting Hours:</strong>{" "}
            {swayambhuVishnu.visitingHours || "Not Available"}
          </p>
          <p>
            <strong>Offerings:</strong>{" "}
            {swayambhuVishnu.offerings || "Not Available"}
          </p>
          <p>
            <strong>Accommodation:</strong>{" "}
            {swayambhuVishnu.accommodation || "Not Available"}
          </p>
          <p>
            <strong>Nearby Places:</strong>
            {swayambhuVishnu.nearbyPlace || "Not available"}
          </p>
          <p>
            <strong>Swayambhu Type:</strong>{" "}
            {swayambhuVishnu.swayambhuType || "Not Available"}
          </p>
          <p>
            <strong>Vishnu Form:</strong>{" "}
            {swayambhuVishnu.vishnuForm || "Not Available"}
          </p>
          <p>
            <strong>Associated Lakshmi:</strong>{" "}
            {swayambhuVishnu.associatedLakshmi || "Not Available"}
          </p>
          <p>
            <strong>Festivals:</strong>
            {swayambhuVishnu.festivals || "Not available"}
          </p>
          <p>
            <strong>Rituals:</strong>
            {swayambhuVishnu.rituals || "Not available"}
          </p>
        </div>
        <hr />
        {GetUserId() === swayambhuVishnu.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/place/swayambhu-vishnu/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>
              Delete Swayambhu Vishnu Temple
            </button>
          </div>
        )}{" "}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {swayambhuVishnu.notes?.length > 0 ? (
            swayambhuVishnu.notes.map((note, index) => (
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
