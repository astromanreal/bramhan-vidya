import { useNavigate, useParams, Link } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function DetailsNatchathara() {
  const navigate = useNavigate();
  const [natchatharaTemple, setNatchatharaTemple] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchNatchatharaTemple = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/places/NatchatharaTemple/${id}`
        );
        setNatchatharaTemple(data.data);
      } catch (err) {
        toast.error(
          err.message ||
            "An error occurred while fetching Natchathara Temple details"
        );
      }
    };
    fetchNatchatharaTemple();
  }, [id]);

  if (!natchatharaTemple) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Data?")) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/places/NatchatharaTemple/${id}`
        );
        if (data?.success) {
          toast.success("Deleted successfully");
          navigate("/place/natchathara");
        } else {
          throw new Error("Failed to delete Data");
        }
      } catch (err) {
        toast.error(err.message || "An error occurred while deleting the Data");
      }
    }
  };

  return (
    <div id="profile-detail-container">
      <h1>{natchatharaTemple.name}</h1>{" "}
      <p className="profile-info">
        Views: {natchatharaTemple.views} | Last updated at:{" "}
        {new Date(natchatharaTemple.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        |{" "}
        {new Date(natchatharaTemple.updatedAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
      <hr />
      <div>
        <p>
          <strong>Path:</strong> {natchatharaTemple.path}
        </p>
        <p>
          <strong>Deity:</strong> {natchatharaTemple.deity}
        </p>
        <p>
          <strong>Temple Name:</strong> {natchatharaTemple.templeName}
        </p>
        <p>
          <strong>Significance:</strong> {natchatharaTemple.significance}
        </p>
        <p>
          <strong>Legend:</strong> {natchatharaTemple.legend}
        </p>
        <p>
          <strong>Description:</strong> {natchatharaTemple.description}
        </p>
        <p>
          <strong>Best Time to Visit:</strong>{" "}
          {natchatharaTemple.bestTimeToVisit}
        </p>
        <p>
          <strong>Visiting Hours:</strong> {natchatharaTemple.visitingHours}
        </p>
        <p>
          <strong>Offerings:</strong> {natchatharaTemple.offerings}
        </p>
        <p>
          <strong>Accommodation:</strong> {natchatharaTemple.accommodation}
        </p>
        <p>
          <strong>Nearby Places:</strong> {natchatharaTemple.nearbyPlaces}
        </p>
        <p>
          <strong>Natchathara Order:</strong>{" "}
          {natchatharaTemple.natchatharaOrder}
        </p>
        <p>
          <strong>Associated Star:</strong> {natchatharaTemple.associatedStar}
        </p>
        <p>
          <strong>Associated Deity:</strong> {natchatharaTemple.associatedDeity}
        </p>
        <p>
          <strong>Festivals:</strong> {natchatharaTemple.festivals}
        </p>
        <p>
          <strong>Rituals:</strong> {natchatharaTemple.rituals}
        </p>
        <h2>Location</h2>
        <p>
          <strong>City:</strong> {natchatharaTemple.location.city}
        </p>
        <p>
          <strong>State:</strong> {natchatharaTemple.location.state}
        </p>
        <p>
          <strong>Country:</strong> {natchatharaTemple.location.country}
        </p>
        <p>
          <strong>Latitude:</strong> {natchatharaTemple.location.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {natchatharaTemple.location.longitude}
        </p>
      </div>
      {GetUserId() === natchatharaTemple.userId && (
        <div style={{ margin: "20px" }}>
          <Link to={`/place/natchathara/update/${id}`}>
            <button style={{ margin: "10px 30px" }}>Update Data</button>
          </Link>
          <button onClick={handleDelete}>Delete Data</button>
        </div>
      )}
      <div id="profile-notes-container">
        <h2>Notes:</h2>
        {natchatharaTemple.notes?.length > 0 ? (
          natchatharaTemple.notes.map((note, index) => (
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
