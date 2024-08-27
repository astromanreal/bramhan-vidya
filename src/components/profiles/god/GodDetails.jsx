import axios from "axios";
import toast from "react-hot-toast";
import GetUserId from "../../utils/GetUserId";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function GodDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [god, setGod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGodDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/profiles/god/${id}`
        );
        if (data?.success) {
          setGod(data.data);
          document.title = `God - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch god details");
        }
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGodDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this God?")) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/profiles/god/${id}`
        );
        if (data?.success) {
          toast.success("God deleted successfully");
          navigate("/profile/god");
        } else {
          throw new Error("Failed to delete God");
        }
      } catch (err) {
        toast.error(err.message || "An error occurred while deleting the God");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!god) {
    return <p>No god found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1> {god.name}</h1> <p className="description">{god.description}</p>
        <p className="profile-info">
          👁️ : {god.views} | ✎ :{" "}
          {new Date(god.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(god.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Deity Type:</strong> {god.deityType}
          </p>
          <p>
            <strong>Weapon</strong> {god.weapon}
          </p>
          <p>
            <strong>Mount</strong> {god.mount}
          </p>
          <p>
            <strong>Symbol</strong> {god.symbol}
          </p>
          <p>
            <strong>Attribute:</strong> {god.attribute}
          </p>
          <p>
            <strong>Associated With:</strong> {god.associatedWith}
          </p>

          <p>
            <strong>Associated Text:</strong> {god.associatedText}
          </p>
          <p>
            <strong>Iconography:</strong> {god.iconography}
          </p>
          <p>
            <strong>Worshipped In:</strong> {god.worshippedIn}
          </p>
          <p>
            <strong>Festival:</strong> {god.festival}
          </p>
          <p>
            <strong>Avatar Of:</strong> {god.avatarOf}
          </p>
        </div>
        <hr />
        {GetUserId() === god.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/god/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {god.notes.length > 0 ? (
            god.notes.map((note, index) => (
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
