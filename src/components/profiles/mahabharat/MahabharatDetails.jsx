import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import GetUserId from "../../utils/GetUserId";
import toast from "react-hot-toast";

export default function MahabharatDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mahabharat, setMahabharat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMahabharatDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/profiles/mahabharat/${id}`
        );
        if (data?.success) {
          setMahabharat(data.data);
          document.title = `Mahabharat - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Mahabharat details");
        }
      } catch (err) {
        toast.error(err.message || "Error in data fetching");
      } finally {
        setLoading(false);
      }
    };

    fetchMahabharatDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Mahabharat?")) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/profiles/mahabharat/${id}`
        );
        if (data?.success) {
          toast.success("Mahabharat deleted successfully");
          navigate("/profile/mahabharat");
        } else {
          throw new Error("Failed to delete Mahabharat");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Mahabharat"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!mahabharat) {
    return <p>No Mahabharat found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1> {mahabharat.name}</h1>{" "}
        <p className="description">{mahabharat.description}</p>
        <p className="profile-info">
          👁️ : {mahabharat.views} | ✎ :{" "}
          {new Date(mahabharat.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(mahabharat.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Role:</strong> {mahabharat.role}
          </p>

          <p>
            <strong>From :</strong> {mahabharat.house}
          </p>
          <p>
            <strong>Skill:</strong> {mahabharat.skill}
          </p>
          <p>
            <strong>Attribute:</strong> {mahabharat.attribute}
          </p>

          <p>
            <strong>Symbolism:</strong> {mahabharat.symbolism}
          </p>
          <p>
            <strong>Associated Character:</strong>{" "}
            {mahabharat.associatedCharacter}
          </p>
          <p>
            <strong>Festival:</strong> {mahabharat.festival}
          </p>
          <p>
            <strong>Iconography:</strong> {mahabharat.iconography}
          </p>
          <p>
            <strong>Region:</strong> {mahabharat.region}
          </p>

          <p>
            <strong>Family:</strong> {mahabharat.family}
          </p>
        </div>
        <hr />
        {GetUserId() === mahabharat.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/mahabharat/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {mahabharat.notes.length > 0 ? (
            mahabharat.notes.map((note, index) => (
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
