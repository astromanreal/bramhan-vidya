import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function NavagrahaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [navagraha, setNavagraha] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavagraha = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/navagraha/${id}`);
        if (data?.success) {
          setNavagraha(data.data);
          document.title = `Navagraha - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Navagraha details");
        }
      } catch (err) {
        toast.error(err.message || "Error while fetching the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchNavagraha();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Navagraha?")) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/profiles/navagraha/${id}`
        );
        if (data?.success) {
          toast.success("Navagraha deleted successfully");
          navigate("/profile/navagraha");
        } else {
          throw new Error("Failed to delete Navagraha");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Navagraha"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!navagraha) {
    return <p>No Navagraha found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{navagraha.name}</h1>{" "}
        <p className="description">{navagraha.description}</p>
        <p className="profile-info">
          👁️ : {navagraha.views} | ✎ :{" "}
          {new Date(navagraha.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(navagraha.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Celestial Body:</strong> {navagraha.celestialBody}
          </p>
          <p>
            <strong>Other Names:</strong> {navagraha.otherName}
          </p>
          <p>
            <strong>Weapon:</strong> {navagraha.weapon}
          </p>
          <p>
            <strong>Mantra:</strong> {navagraha.mantra}
          </p>
          <p>
            <strong>Gemstone:</strong> {navagraha.gemstone}
          </p>
          <p>
            <strong>Color:</strong> {navagraha.color}
          </p>
          <p>
            <strong>Day:</strong> {navagraha.day}
          </p>
          <p>
            <strong>Mount:</strong> {navagraha.mount}
          </p>
          <p>
            <strong>Festival:</strong> {navagraha.festival}
          </p>
          <p>
            <strong>Temple:</strong> {navagraha.temple}
          </p>
          <p>
            <strong>Mother:</strong> {navagraha.mother || "unknown"} |{" "}
            <strong>Father:</strong> {navagraha.father || "unknown"}
          </p>
        </div>
        <hr />
        {GetUserId() === navagraha.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/navagraha/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Navagraha</button>
            <hr />
          </div>
        )}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {navagraha.notes.length > 0 ? (
            navagraha.notes.map((note, index) => (
              <div key={index}>
                <h3>{note.key}</h3>
                <p>{note.value}</p>
              </div>
            ))
          ) : (
            <p id="no-data">No Navagraha Notes</p>
          )}
        </div>
      </div>
    </>
  );
}
