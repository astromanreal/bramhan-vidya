import { useNavigate, useParams, Link } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function GaneshDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ganesh, setGanesh] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGaneshDetails = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/ganesha/${id}`);
        if (data?.success) {
          setGanesh(data.data);
          document.title = `Ganesh - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Ganesh details");
        }
      } catch (err) {
        toast.error(err.message || "Error while fetching the data");
      } finally {
        setLoading(false);
      }
    };

    fetchGaneshDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Ganesh?")) {
      try {
        const { data } = await axios.delete(`${apiUrl}/profiles/ganesha/${id}`);
        if (data?.success) {
          toast.success("Ganesh deleted successfully");
          navigate("/profile/ganesha");
        } else {
          throw new Error("Failed to delete Ganesh");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Ganesh"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!ganesh) {
    return <p>No Ganesh found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1> {ganesh.name}</h1>
        <p className="description">{ganesh.description}</p>

        <p className="profile-info">
          👁️ : {ganesh.views} | ✎ :{" "}
          {new Date(ganesh.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(ganesh.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Attribute:</strong> {ganesh.attribute}
          </p>
          <p>
            <strong>Symbolism:</strong> {ganesh.symbolism}
          </p>
          <p>
            <strong>Associated Mantra:</strong> {ganesh.associatedMantra}
          </p>

          <p>
            <strong>Worship:</strong> {ganesh.worship}
          </p>
          <p>
            <strong>Festival:</strong> {ganesh.festival}
          </p>
          <p>
            <strong>Iconography:</strong> {ganesh.iconography}
          </p>
          <p>
            <strong>Region:</strong> {ganesh.region}
          </p>
        </div>
        <hr />
        {GetUserId() === ganesh.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/ganesha/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}

        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {ganesh.notes.length > 0 ? (
            ganesh.notes.map((note, index) => (
              <div key={index}>
                <h3>{note.key}</h3>
                <p>{note.value}</p>
              </div>
            ))
          ) : (
            <p id="no-data">No ganesh Notes</p>
          )}
        </div>
      </div>
    </>
  );
}
