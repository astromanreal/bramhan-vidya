import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import GetUserId from "../../utils/GetUserId";

export default function DetailsParasuramaShiva() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [parasuramaShiva, setParasuramaShiva] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParasuramaShivaDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/places/ParasuramaShiva/${id}`
        );
        if (data?.success) {
          setParasuramaShiva(data.data);
          document.title = `Parasurama Shiva - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Parasurama Shiva details");
        }
      } catch (err) {
        alert(err.message || "Error while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchParasuramaShivaDetails();
  }, [id]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this Parasurama Shiva temple?"
      )
    ) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/places/ParasuramaShiva/${id}`
        );
        if (data?.success) {
          alert("Parasurama Shiva temple deleted successfully");
          navigate("/place/parasurama-shiva");
        } else {
          throw new Error("Failed to delete Parasurama Shiva temple");
        }
      } catch (err) {
        alert(
          err.message ||
            "An error occurred while deleting the Parasurama Shiva temple"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!parasuramaShiva) {
    return <p>No Parasurama Shiva temple found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{parasuramaShiva.name}</h1>{" "}
        <p className="profile-info">
          Views: {parasuramaShiva.views} | Last updated at:{" "}
          {new Date(parasuramaShiva.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |{" "}
          {new Date(parasuramaShiva.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Name:</strong> {parasuramaShiva.name}
          </p>
          <p>
            <strong>Location:</strong>
            <br />
            City: {parasuramaShiva.location.city || "Not Available"}
            <br />
            State: {parasuramaShiva.location.state || "Not Available"}
            <br />
            Country: {parasuramaShiva.location.country || "Not Available"}
            <br />
            Latitude: {parasuramaShiva.location.latitude || "Not Available"}
            <br />
            Longitude: {parasuramaShiva.location.longitude || "Not Available"}
          </p>
          <p>
            <strong>Deity:</strong> {parasuramaShiva.deity || "Not Available"}
          </p>
          <p>
            <strong>Temple Name:</strong>{" "}
            {parasuramaShiva.templeName || "Not Available"}
          </p>
          <p>
            <strong>Significance:</strong>{" "}
            {parasuramaShiva.significance || "Not Available"}
          </p>
          <p>
            <strong>Legend:</strong> {parasuramaShiva.legend || "Not Available"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {parasuramaShiva.description || "Not Available"}
          </p>
          <p>
            <strong>Best Time to Visit:</strong>{" "}
            {parasuramaShiva.bestTimeToVisit || "Not Available"}
          </p>
          <p>
            <strong>Visiting Hours:</strong>{" "}
            {parasuramaShiva.visitingHours || "Not Available"}
          </p>
          <p>
            <strong>Offerings:</strong>{" "}
            {parasuramaShiva.offerings || "Not Available"}
          </p>
          <p>
            <strong>Accommodation:</strong>{" "}
            {parasuramaShiva.accommodation || "Not Available"}
          </p>
          <p>
            <strong>Nearby Places:</strong>
            {parasuramaShiva.nearbyPlaces || "Not available"}
          </p>
          <p>
            <strong>Temple Order:</strong>{" "}
            {parasuramaShiva.templeOrder || "Not Available"}
          </p>
          <p>
            <strong>Associated Lingam:</strong>{" "}
            {parasuramaShiva.associatedLingam || "Not Available"}
          </p>
          <p>
            <strong>Associated Theertham:</strong>{" "}
            {parasuramaShiva.associatedTheertham || "Not Available"}
          </p>
          <p>
            <strong>Festivals:</strong>
            {parasuramaShiva.festivals || "Not available"}
          </p>
          <p>
            <strong>Rituals:</strong>
            {parasuramaShiva.rituals || "Not available"}
          </p>
        </div>
        <hr />
        {GetUserId() === parasuramaShiva.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/place/parasurama-shiva/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>
              Delete Parasurama Shiva Temple
            </button>
          </div>
        )}{" "}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {parasuramaShiva.notes?.length > 0 ? (
            parasuramaShiva.notes.map((note, index) => (
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
