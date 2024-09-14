import { useParams, Link, useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function ShivaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shiva, setShiva] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShiva = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/shiva/${id}`);
        if (data?.success) {
          setShiva(data.data);
          document.title = `Shiva Avatar - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Shiva details");
        }
      } catch (err) {
        toast.error(err.message || "Error while fetching the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchShiva();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Shiva profile?")) {
      try {
        const { data } = await axios.delete(`${apiUrl}/profiles/shiva/${id}`);
        if (data?.success) {
          toast.success("Shiva profile deleted successfully");
          navigate("/profile/shiva");
        } else {
          throw new Error("Failed to delete Shiva profile");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Shiva profile"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!shiva) {
    return <p>No Shiva profile found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{shiva.name}</h1>
        <p className="description">{shiva.description}</p>
        <p className="profile-info">
          👁️ : {shiva.views} |✎ :{" "}
          {new Date(shiva.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(shiva.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Iconography:</strong> {shiva.iconography || "N/A"}
          </p>
          <p>
            <strong>Worship:</strong> {shiva.worship || "N/A"}
          </p>

          <p>
            <strong>Symbolism:</strong> {shiva.symbolism || "N/A"}
          </p>
          <p>
            <strong>Attribute:</strong> {shiva.attribute || "N/A"}
          </p>
          <p>
            <strong>Associated Deity:</strong> {shiva.associatedDeity || "N/A"}
          </p>

          <p>
            <strong>Festival:</strong> {shiva.festival || "N/A"}
          </p>

          <p>
            <strong>Region:</strong> {shiva.region || "N/A"}
          </p>
        </div>
        <hr />
        {GetUserId() === shiva.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/shiva/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}

        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {shiva.notes.length > 0 ? (
            shiva.notes.map((note, index) => (
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
