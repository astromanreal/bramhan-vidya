import { useNavigate, useParams, Link } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailsAshtaVinayaka() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ashtaVinayaka, setAshtaVinayaka] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/places/Ashtavinayaka/${id}`
        );

        if (response.data.success) {
          setAshtaVinayaka(response.data.data);
        }
      } catch (err) {
        alert(err.message || "Failed to fetch Ashta Vinayaka details");
      }
    };

    fetchDetails();
  }, [id]);

  if (!ashtaVinayaka) return <p>Loading...</p>;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Data?")) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/places/Ashtavinayaka/${id}`
        );
        if (data?.success) {
          alert("Ashta vinayaka deleted successfully");
          navigate("/place/ashta-vinayaka");
        } else {
          throw new Error("Failed to delete Data");
        }
      } catch (err) {
        alert(
          err.message || "An error occurred while deleting the Ashta vinayaka"
        );
      }
    }
  };

  return (
    <>
      <div id="profile-detail-container">
        <h1>{ashtaVinayaka.name}</h1>{" "}
        <p className="profile-info">
          Views: {ashtaVinayaka.views} | Last updated at:{" "}
          {new Date(ashtaVinayaka.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |{" "}
          {new Date(ashtaVinayaka.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Path:</strong> {ashtaVinayaka.path}
          </p>
          <p>
            <strong>Deity:</strong> {ashtaVinayaka.deity}
          </p>
          <p>
            <strong>Temple Name:</strong> {ashtaVinayaka.templeName}
          </p>
          <p>
            <strong>Significance:</strong> {ashtaVinayaka.significance}
          </p>
          <p>
            <strong>Legend:</strong> {ashtaVinayaka.legend}
          </p>

          <p>
            <strong>Description:</strong> {ashtaVinayaka.description}
          </p>
          <p>
            <strong>Best Time to Visit:</strong> {ashtaVinayaka.bestTimeToVisit}
          </p>
          <p>
            <strong>Visiting Hours:</strong> {ashtaVinayaka.visitingHours}
          </p>
          <p>
            <strong>Offerings:</strong> {ashtaVinayaka.offerings}
          </p>
          <p>
            <strong>Accommodation:</strong> {ashtaVinayaka.accommodation}
          </p>
          <p>
            <strong>Nearby Places:</strong> {ashtaVinayaka.nearbyPlaces}
          </p>
          <p>
            <strong>Vinayaka Order:</strong> {ashtaVinayaka.vinayakaOrder}
          </p>
          <p>
            <strong>Associated Ganesha Form:</strong>{" "}
            {ashtaVinayaka.associatedGaneshaForm}
          </p>
          <p>
            <strong>Associated Moreshwar:</strong>{" "}
            {ashtaVinayaka.associatedMoreshwar}
          </p>
          <p>
            <strong>Festivals:</strong> {ashtaVinayaka.festivals}
          </p>
          <p>
            <strong>Rituals:</strong> {ashtaVinayaka.rituals}
          </p>
        </div>
        {GetUserId() === ashtaVinayaka.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/place/ashta-vinayaka/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
          </div>
        )}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {ashtaVinayaka.notes?.length > 0 ? (
            ashtaVinayaka.notes.map((note, index) => (
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
