import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function ShaktiDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shakti, setShakti] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShakti = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/shakti/${id}`);
        if (data?.success) {
          setShakti(data.data);
          document.title = `Shakti - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Shakti details");
        }
      } catch (err) {
        toast.error(err.message || "Error while fetching the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchShakti();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Shakti?")) {
      try {
        const { data } = await axios.delete(`${apiUrl}/profiles/shakti/${id}`);
        if (data?.success) {
          toast.success("Shakti deleted successfully");
          navigate("/profile/shakti");
        } else {
          throw new Error("Failed to delete Shakti");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Shakti"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!shakti) {
    return <p>No Shakti found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{shakti.name}</h1>{" "}
        <p className="description">{shakti.description}</p>
        <p className="profile-info">
          👁️ : {shakti.views} | ✎ :{" "}
          {new Date(shakti.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(shakti.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Attribute:</strong> {shakti.attribute}
          </p>
          <p>
            <strong>Temple:</strong> {shakti.temple}
          </p>
          <p>
            <strong>Festival:</strong> {shakti.festival}
          </p>
          <p>
            <strong>Iconography:</strong> {shakti.iconography}
          </p>
          <p>
            <strong>Region:</strong> {shakti.region}
          </p>
          <p>
            <strong>Sacred Text:</strong> {shakti.sacredText}
          </p>
          <p>
            <strong>Consort:</strong> {shakti.consort}
          </p>
        </div>
        <hr />
        {GetUserId() === shakti.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/shakti/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />
          </div>
        )}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {shakti.notes.length > 0 ? (
            shakti.notes.map((note, index) => (
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
