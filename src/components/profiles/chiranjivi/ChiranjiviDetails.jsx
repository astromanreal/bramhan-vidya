import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import GetUserId from "../../utils/GetUserId";
import toast from "react-hot-toast";
import axios from "axios";

export default function ChiranjiviDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [chiranjivi, setChiranjivi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChiranjiviDetails = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/chiranjivi/${id}`);
        if (data?.success) {
          setChiranjivi(data.data);
          document.title = `Chiranjivi - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Chiranjivi details");
        }
      } catch (err) {
        toast.error(err.message || "Error while fetching chiravjivi data");
      } finally {
        setLoading(false);
      }
    };

    fetchChiranjiviDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Chiranjivi?")) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/profiles/chiranjivi/${id}`
        );
        if (data?.success) {
          toast.success("Chiranjivi deleted successfully");
          navigate("/profile/chiranjivi");
        } else {
          throw new Error("Failed to delete Chiranjivi");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Chiranjivi"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!chiranjivi) {
    return <p>No Chiranjivi found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1> {chiranjivi.name}</h1>
        <p className="description">{chiranjivi.description}</p>
        <p className="profile-info">
          👁️ : {chiranjivi.views} | ✎:{" "}
          {new Date(chiranjivi.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(chiranjivi.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Type:</strong> {chiranjivi.type}
          </p>
          <p>
            <strong>Mother : </strong>
            {chiranjivi.mother} | <strong>Father : </strong>
            {chiranjivi.father}
          </p>
          <p>
            <strong>Ability :</strong> {chiranjivi.ability}
          </p>
          <p>
            <strong>Iconography :</strong> {chiranjivi.iconography}
          </p>
        </div>
        <hr />
        {GetUserId() === chiranjivi.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/chiranjivi/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}

        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {chiranjivi.notes.length > 0 ? (
            chiranjivi.notes.map((note, index) => (
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
