import axios from "axios";
import toast from "react-hot-toast";
import GetUserId from "../../utils/GetUserId";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function GoddessDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goddess, setGoddess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoddessDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/profiles/goddess/${id}`
        );
        if (data?.success) {
          setGoddess(data.data);
          document.title = `Goddess - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch goddess details");
        }
      } catch (err) {
        toast.error(err.message || "Error while fetching the data");
      } finally {
        setLoading(false);
      }
    };

    fetchGoddessDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Goddess?")) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/profiles/goddess/${id}`
        );
        if (data?.success) {
          toast.success("Goddess deleted successfully");
          navigate("/profile/goddess");
        } else {
          throw new Error("Failed to delete Goddess");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Goddess"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!goddess) {
    return <p>No goddess found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1> {goddess.name}</h1>{" "}
        <p className="description">{goddess.description}</p>
        <p className="profile-info">
          👁️ : {goddess.views} | ✎ :{" "}
          {new Date(goddess.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          | ⌚ :{" "}
          {new Date(goddess.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Domain:</strong> {goddess.domain}
          </p>
          <p>
            <strong>Attribute:</strong> {goddess.attribute}
          </p>
          <p>
            <strong>Consort:</strong> {goddess.consort || "N/A"}
          </p>
          <p>
            <strong>Temple:</strong> {goddess.temple}
          </p>
          <p>
            <strong>Festival:</strong> {goddess.festival}
          </p>
          <p>
            <strong>Region:</strong> {goddess.region}
          </p>
          <p>
            <strong>Sacred Text:</strong> {goddess.sacredText}
          </p>
          <p>
            <strong>Iconography:</strong> {goddess.iconography}
          </p>
        </div>
        <hr />
        {GetUserId() === goddess.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/goddess/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {goddess.notes.length > 0 ? (
            goddess.notes.map((note, index) => (
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
