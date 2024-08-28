import { Link, useNavigate, useParams } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DetailsAshtaVeerattaSthalams() {
  const navigate = useNavigate();
  const [ashtaVeerattaSthalams, setAshtaVeerattaSthalams] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchAshtaVeerattaSthalams = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/places/AshtaVeerattaSthalam/${id}`
        );
        if (data?.success) {
          setAshtaVeerattaSthalams(data.data);
        } else {
          throw new Error("Failed to fetch Ashta Veeratta Sthalams details");
        }
      } catch (err) {
        alert(
          err.message ||
            "An error occurred while fetching Ashta Veeratta Sthalams details"
        );
      }
    };
    fetchAshtaVeerattaSthalams();
  }, [id]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this Ashta Veeratta Sthalams?"
      )
    ) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/places/AshtaVeerattaSthalam/${id}`
        );
        if (data?.success) {
          alert("Ashta Veeratta Sthalams deleted successfully");
          navigate("/place/ashta-veeratta-sthalams");
        } else {
          throw new Error("Failed to delete Ashta Veeratta Sthalams");
        }
      } catch (err) {
        alert(
          err.message ||
            "An error occurred while deleting the Ashta Veeratta Sthalams"
        );
      }
    }
  };

  return (
    <>
      <div id="profile-detail-container">
        <h1>{ashtaVeerattaSthalams.name}</h1>
        <p className="profile-info">
          Views: {ashtaVeerattaSthalams.views} | Last updated at:{" "}
          {new Date(ashtaVeerattaSthalams.updatedAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}{" "}
          |{" "}
          {new Date(ashtaVeerattaSthalams.updatedAt).toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }
          )}
        </p>
        <hr />
        <div>
          <p>
            <strong>City:</strong>{" "}
            {ashtaVeerattaSthalams.location?.city || "Not available"}
          </p>
          <p>
            <strong>State:</strong>{" "}
            {ashtaVeerattaSthalams.location?.state || "Not available"}
          </p>
          <p>
            <strong>Country:</strong>{" "}
            {ashtaVeerattaSthalams.location?.country || "Not available"}
          </p>
          <p>
            <strong>Latitude:</strong>{" "}
            {ashtaVeerattaSthalams.location?.latitude || "Not available"}
          </p>
          <p>
            <strong>Longitude:</strong>{" "}
            {ashtaVeerattaSthalams.location?.longitude || "Not available"}
          </p>
          <p>
            <strong>Deity:</strong>{" "}
            {ashtaVeerattaSthalams?.deity || "Not available"}
          </p>
          <p>
            <strong>Temple Name:</strong>{" "}
            {ashtaVeerattaSthalams?.templeName || "Not available"}
          </p>
          <p>
            <strong>Significance:</strong>{" "}
            {ashtaVeerattaSthalams?.significance || "Not available"}
          </p>
          <p>
            <strong>Legend:</strong>{" "}
            {ashtaVeerattaSthalams?.legend || "Not available"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {ashtaVeerattaSthalams?.description || "Not available"}
          </p>
          <p>
            <strong>Best Time to Visit:</strong>{" "}
            {ashtaVeerattaSthalams?.bestTimeToVisit || "Not available"}
          </p>
          <p>
            <strong>Visiting Hours:</strong>{" "}
            {ashtaVeerattaSthalams?.visitingHours || "Not available"}
          </p>
          <p>
            <strong>Offerings:</strong>{" "}
            {ashtaVeerattaSthalams?.offerings || "Not available"}
          </p>
          <p>
            <strong>Accommodation:</strong>{" "}
            {ashtaVeerattaSthalams?.accommodation || "Not available"}
          </p>
          <p>
            <strong>Nearby Places:</strong>{" "}
            {ashtaVeerattaSthalams?.nearbyPlaces || "Not available"}
          </p>
          <p>
            <strong>Veerata:</strong>{" "}
            {ashtaVeerattaSthalams?.veerata || "Not available"}
          </p>
          <p>
            <strong>Associated Story:</strong>{" "}
            {ashtaVeerattaSthalams?.associatedStory || "Not available"}
          </p>
          <p>
            <strong>Festivals:</strong>{" "}
            {ashtaVeerattaSthalams?.festivals || "Not available"}
          </p>
          <p>
            <strong>Rituals:</strong>{" "}
            {ashtaVeerattaSthalams?.rituals || "Not available"}
          </p>
        </div>{" "}
        <hr />
        {GetUserId() === ashtaVeerattaSthalams.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/place/ashta-veeratta-sthalams/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />
          </div>
        )}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {ashtaVeerattaSthalams.notes?.length > 0 ? (
            ashtaVeerattaSthalams.notes.map((note, index) => (
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
