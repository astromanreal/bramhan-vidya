import { useParams, Link, useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function MahavidyaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mahavidya, setMahavidya] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMahavidya = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/mahavidya/${id}`);
        if (data?.success) {
          setMahavidya(data.data);
          document.title = `Mahavidya - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Mahavidya details");
        }
      } catch (err) {
        toast.error(err.message || "Error in Data fetching");
      } finally {
        setLoading(false);
      }
    };

    fetchMahavidya();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Mahavidya?")) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/profiles/mahavidya/${id}`
        );
        if (data?.success) {
          toast.success("Mahavidya deleted successfully");
          navigate("/profile/mahavidya");
        } else {
          throw new Error("Failed to delete Mahavidya");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Mahavidya"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!mahavidya) {
    return <p>No Mahavidya found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{mahavidya.name}</h1>
        <p className="description">{mahavidya.description}</p>
        <p className="profile-info">
          👁️: {mahavidya.views} | ✎ :{" "}
          {new Date(mahavidya.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(mahavidya.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Attribute:</strong> {mahavidya.attribute}
          </p>
          <p>
            <strong>Iconography:</strong> {mahavidya.iconography}
          </p>
          <p>
            <strong>Symbolism:</strong> {mahavidya.symbolism}
          </p>
          <p>
            <strong>Associated Deitie:</strong> {mahavidya.associatedDeitie}
          </p>

          <p>
            <strong>Mantra:</strong> {mahavidya.mantra}
          </p>
          <p>
            <strong>Worship Practice:</strong> {mahavidya.worshipPractice}
          </p>
          <p>
            <strong>Benefit:</strong> {mahavidya.benefit}
          </p>
          <p>
            <strong>Festival:</strong> {mahavidya.festival}
          </p>
          <p>
            <strong>Region:</strong> {mahavidya.region}
          </p>
        </div>
        <hr />
        {GetUserId() === mahavidya.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/mahavidya/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}

        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {mahavidya.notes.length > 0 ? (
            mahavidya.notes.map((note, index) => (
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
