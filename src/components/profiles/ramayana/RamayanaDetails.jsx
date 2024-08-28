import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function RamayanaDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ramayana, setRamayana] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRamayanaDetails = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/ramayana/${id}`);
        if (data?.success) {
          setRamayana(data.data);
          document.title = `Ramayana - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Ramayana details");
        }
      } catch (err) {
        toast.error(err.message || "Error while fetching the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchRamayanaDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Ramayana?")) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/profiles/ramayana/${id}`
        );
        if (data?.success) {
          toast.success("Ramayana deleted successfully");
          navigate("/profile/ramayana");
        } else {
          throw new Error("Failed to delete Ramayana");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Ramayana"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!ramayana) {
    return <p>No Ramayana found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1> {ramayana.name}</h1>
        <p className="description">{ramayana.description}</p>
        <p className="profile-info">
          👁️ : {ramayana.views} | ✎ :{" "}
          {new Date(ramayana.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(ramayana.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Role:</strong> {ramayana.role}
          </p>
          <p>
            <strong>Affiliation:</strong> {ramayana.affiliation}
          </p>
          <p>
            <strong>Family:</strong> {ramayana.family}
          </p>
          <p>
            <strong>Skill:</strong> {ramayana.skill}
          </p>
          <p>
            <strong>Attribute:</strong> {ramayana.attribute}
          </p>
          <p>
            <strong>Symbolism:</strong> {ramayana.symbolism}
          </p>
          <p>
            <strong>Associated Character:</strong>{" "}
            {ramayana.associatedCharacter}
          </p>
          <p>
            <strong>Worship:</strong> {ramayana.worship}
          </p>
          <p>
            <strong>Festival:</strong> {ramayana.festival}
          </p>
          <p>
            <strong>Iconography:</strong> {ramayana.iconography}
          </p>
          <p>
            <strong>Region:</strong> {ramayana.region}
          </p>
        </div>
        <hr />
        {GetUserId() === ramayana.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/ramayana/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}

        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {ramayana.notes.length > 0 ? (
            ramayana.notes.map((note, index) => (
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
