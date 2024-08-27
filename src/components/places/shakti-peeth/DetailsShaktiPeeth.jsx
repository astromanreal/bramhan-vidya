import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import GetUserId from "../../utils/GetUserId";

export default function DetailsShaktiPeeth() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [shaktiPeeth, setShaktiPeeth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShaktiPeethDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/places/ShaktiPeeth/${id}`
        );
        if (data?.success) {
          setShaktiPeeth(data.data);
          document.title = `Shakti Peeth - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Shakti Peeth details");
        }
      } catch (err) {
        alert(err.message || "Error while fetching the data");
      } finally {
        setLoading(false);
      }
    };

    fetchShaktiPeethDetails();
  }, [id]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this Shakti Peeth temple?"
      )
    ) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/places/ShaktiPeeth/${id}`
        );
        if (data?.success) {
          alert("Shakti Peeth temple deleted successfully");
          navigate("/place/shakti-peeth");
        } else {
          throw new Error("Failed to delete Shakti Peeth temple");
        }
      } catch (err) {
        alert(
          err.message ||
            "An error occurred while deleting the Shakti Peeth temple"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!shaktiPeeth) {
    return <p>No Shakti Peeth temple found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1> {shaktiPeeth.name}</h1>{" "}
        <p className="profile-info">
          Views: {shaktiPeeth.views} | Last updated at:{" "}
          {new Date(shaktiPeeth.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |{" "}
          {new Date(shaktiPeeth.updatedAt).toLocaleTimeString("en-US", {
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
            City: {shaktiPeeth.location.city || "Not Available"}
            <br />
            State: {shaktiPeeth.location.state || "Not Available"}
            <br />
            Country: {shaktiPeeth.location.country || "Not Available"}
            <br />
            Latitude: {shaktiPeeth.location.latitude || "Not Available"}
            <br />
            Longitude: {shaktiPeeth.location.longitude || "Not Available"}
          </p>
          <p>
            <strong>Deity:</strong> {shaktiPeeth.deity || "Not Available"}
          </p>
          <p>
            <strong>Temple Name:</strong>{" "}
            {shaktiPeeth.templeName || "Not Available"}
          </p>
          <p>
            <strong>Body Part:</strong>{" "}
            {shaktiPeeth.bodyPart || "Not Available"}
          </p>
          <p>
            <strong>Significance:</strong>{" "}
            {shaktiPeeth.significance || "Not Available"}
          </p>
          <p>
            <strong>Legend:</strong> {shaktiPeeth.legend || "Not Available"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {shaktiPeeth.description || "Not Available"}
          </p>
          <p>
            <strong>Best Time to Visit:</strong>{" "}
            {shaktiPeeth.bestTimeToVisit || "Not Available"}
          </p>
          <p>
            <strong>Visiting Hours:</strong>{" "}
            {shaktiPeeth.visitingHours || "Not Available"}
          </p>
          <p>
            <strong>Offerings:</strong>{" "}
            {shaktiPeeth.offerings || "Not Available"}
          </p>
          <p>
            <strong>Accommodation:</strong>{" "}
            {shaktiPeeth.accommodation || "Not Available"}
          </p>{" "}
          <p>
            <strong>Nearby Places:</strong>
            {shaktiPeeth.nearbyPlaces || "Not available"}
          </p>
          <p>
            <strong>Goddess Form:</strong>{" "}
            {shaktiPeeth.goddessForm || "Not Available"}
          </p>
          <p>
            <strong>Shakti Peeth Type:</strong>{" "}
            {shaktiPeeth.shaktiPeethType || "Not Available"}
          </p>
          <p>
            <strong>Associated Deity:</strong>{" "}
            {shaktiPeeth.associatedDeity || "Not Available"}
          </p>
          <p>
            <strong>Festivals:</strong>
            {shaktiPeeth.festivals || "Not available"}
          </p>
          <p>
            <strong>Rituals:</strong>
            {shaktiPeeth.rituals || "Not available"}
          </p>
        </div>
        <hr />
        {GetUserId() === shaktiPeeth.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/place/shakti-peeth/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Shakti Peeth Temple</button>
          </div>
        )}{" "}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {shaktiPeeth.notes?.length > 0 ? (
            shaktiPeeth.notes.map((note, index) => (
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
