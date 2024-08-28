import { useNavigate, useParams, Link } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DetailsChotaCharDham() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchChotaCharDham = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/places/ChotaCharDham/${id}`
        );
        if (data?.success) {
          setData(data.data);
        } else {
          throw new Error("Failed to fetch Chota Char Dham details");
        }
      } catch (err) {
        alert(
          err.message ||
            "An error occurred while fetching Chota Char Dham details"
        );
      }
    };
    fetchChotaCharDham();
  }, [id]);

  const handleDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this chota Char Dham?")
    ) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/places/ChotaCharDham/${id}`
        );
        if (data?.success) {
          alert("chota Char Dham deleted successfully");
          navigate("/place/chota-char-dham");
        } else {
          throw new Error("Failed to delete Data");
        }
      } catch (err) {
        alert(
          err.message || "An error occurred while deleting the chota Char Dham"
        );
      }
    }
  };

  return (
    <div id="profile-detail-container">
      <h1>{data.name}</h1>{" "}
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
          <strong>City:</strong> {data.location?.city}
        </p>
        <p>
          <strong>State:</strong> {data.location?.state}
        </p>
        <p>
          <strong>Country:</strong> {data.location?.country}
        </p>
        <p>
          <strong>Latitude:</strong> {data.location?.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {data.location?.longitude}
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
          <strong>Dham Order:</strong> {data.dhamOrder}
        </p>
        <p>
          <strong>Associated River:</strong> {data.associatedRiver}
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
          <Link to={`/place/chota-char-dham/update/${id}`}>
            <button style={{ margin: "10px 30px" }}>Update Data</button>
          </Link>
          <button onClick={handleDelete}>Delete Data</button>
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
