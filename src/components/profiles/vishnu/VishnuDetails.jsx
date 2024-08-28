import { useParams, Link, useNavigate } from "react-router-dom";
import GetUserId from "./../../utils/GetUserId";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function VishnuDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vishnu, setVishnu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVishnu = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/vishnu/${id}`);
        if (data?.success) {
          setVishnu(data.data);
          document.title = `Vishnu Avatar - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Vishnu Avatar details");
        }
      } catch (err) {
        toast.error(err.message || "Error while fetching the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchVishnu();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Vishnu Avatar?")) {
      try {
        const { data } = await axios.delete(`${apiUrl}/profiles/vishnu/${id}`);
        if (data?.success) {
          toast.success("Vishnu Avatar deleted successfully");
          navigate("/profile/vishnu");
        } else {
          throw new Error("Failed to delete Vishnu Avatar");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Vishnu Avatar"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!vishnu) {
    return <p>No Vishnu Avatar found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{vishnu.name}</h1>
        <p className="description">{vishnu.description}</p>
        <p className="profile-info">
          👁️ : {vishnu.views} | ✎ :{" "}
          {new Date(vishnu.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(vishnu.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Attribute:</strong> {vishnu.attribute}
          </p>
          <p>
            <strong>Symbolism:</strong> {vishnu.symbolism}
          </p>
          <p>
            <strong>Worship:</strong> {vishnu.worship}
          </p>
          <p>
            <strong>Festival:</strong> {vishnu.festival}
          </p>
          <p>
            <strong>Iconography:</strong> {vishnu.iconography}
          </p>
          <p>
            <strong>Region:</strong> {vishnu.region}
          </p>
        </div>
        <hr />
        {GetUserId() === vishnu.userId && (
          <div>
            <Link to={`/profile/vishnu/update/${id}`}>
              <button>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button> <hr />
          </div>
        )}

        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {vishnu.notes.length > 0 ? (
            vishnu.notes.map((note, index) => (
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
