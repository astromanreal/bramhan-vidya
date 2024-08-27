import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import GetUserId from "../../utils/GetUserId";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function CelestialDetails() {
  const { id } = useParams();
  const [celestial, setCelestial] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCelestialDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/profiles/celestial/${id}`
        );
        if (data?.success) {
          setCelestial(data.data);
          document.title = `Celestial - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch celestial details");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching celestial details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCelestialDetails();
  }, [id]);

  const handleDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this celestial being?")
    ) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/profiles/celestial/${id}`
        );
        if (data?.success) {
          toast.success("Celestial being deleted successfully");
          navigate("/profile/celestial");
        } else {
          throw new Error("Failed to delete celestial being");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the celestial being"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!celestial) {
    return <p>No celestial being found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{celestial.name}</h1>
        <p className="description">{celestial.description}</p>
        <p className="profile-info">
          👁️ : {celestial.views} | ✎ :{" "}
          {new Date(celestial.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(celestial.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Type:</strong> {celestial.type}
          </p>
          <p>
            <strong>Domain:</strong> {celestial.domain}
          </p>
          <p>
            <strong>Role:</strong> {celestial.role}
          </p>

          <p>
            <strong>Ability:</strong> {celestial.ability}
          </p>
          <p>
            <strong>Appearance:</strong> {celestial.appearance}
          </p>
          <p>
            <strong>Reference:</strong> {celestial.reference}
          </p>
        </div>
        <hr />
        {GetUserId() === celestial.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/celestial/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}

        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {celestial.notes.length > 0 ? (
            celestial.notes.map((note, index) => (
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
