import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import toast from "react-hot-toast";

export default function VanarDetails() {
  const [vanar, setVanar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVanar = async () => {
      try {
        const response = await axios.get(
          `https://bramhan-vidya-api.vercel.app/profiles/vanara/${id}`
        );
        if (response.data?.success) {
          setVanar(response.data.data);
        } else {
          throw new Error("Failed to fetch Vanar details");
        }
      } catch (error) {
        toast.error("Error fetching Vanar details!");
      }
    };
    fetchVanar();
  }, [id]);

  if (!vanar) return <h1>Loading...</h1>;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Vanara?")) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/profiles/vanara/${id}`
        );
        if (data?.success) {
          toast.success("Vanara deleted successfully");
          navigate("/profile/vanara");
        } else {
          throw new Error("Failed to delete Vanara");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Vanara"
        );
      }
    }
  };

  return (
    <>
      <div id="profile-detail-container">
        <h1>{vanar.name}</h1>
        <p className="description">{vanar.description}</p>
        <p className="profile-info">
          👁️: {vanar.views} | ✎ :{" "}
          {new Date(vanar.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚:{" "}
          {new Date(vanar.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <p>
          <strong>Iconography:</strong> {vanar.iconography || "N/A"}
        </p>
        <p>
          <strong>Role in Ramayana:</strong> {vanar.roleInRamayana || "N/A"}
        </p>
        <p>
          <strong> Ability:</strong> {vanar.ability || "N/A"}
        </p>
        <p>
          <strong>Region:</strong> {vanar.region || "N/A"}
        </p>

        <p>
          <strong>Symbolism:</strong> {vanar.symbolism || "N/A"}
        </p>
        <p>
          <strong> Worship:</strong>
          {vanar.worship || "N/A"}
        </p>
        <p>
          <strong>Text: </strong> {vanar.text || "N/A"}
        </p>
        {GetUserId() === vanar.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/vanara/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />
          </div>
        )}

        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {vanar.notes.length > 0 ? (
            vanar.notes.map((note, index) => (
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
