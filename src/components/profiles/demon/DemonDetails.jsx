import { Link, useNavigate, useParams } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function DemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [demon, setDemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDemon = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/demon/${id}`);
        if (data?.success) {
          setDemon(data.data);
        } else {
          throw new Error("Demon not found");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching the demon"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDemon();
  }, [id]);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${apiUrl}/profiles/demon/${id}`);
      if (data?.success) {
        toast.success("Demon deleted successfully!");
        navigate("/profile/demon");
      } else {
        throw new Error("Failed to delete demon");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while deleting the demon");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{demon.name}</h1>
        <p className="description">{demon.description}</p>

        <p className="profile-info">
          👁️ : {demon.views} | ✎ :{" "}
          {new Date(demon.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(demon.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>Class: {demon.class}</p>
          <p>Timeline: {demon.timeline}</p>
          <p>Ancestry: {demon.ancestry}</p>
          <p>Powers/Abilities: {demon.powersAbility}</p>
          <p>Known Works: {demon.knownWork}</p>
          <p>Region: {demon.region}</p>
          <p>Textual References: {demon.textualReference}</p>
          <p>Weaknesses: {demon.weakness}</p>
        </div>
        <hr />
        {GetUserId() === demon.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/demon/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}

        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {demon.notes.length > 0 ? (
            demon.notes.map((note, index) => (
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
