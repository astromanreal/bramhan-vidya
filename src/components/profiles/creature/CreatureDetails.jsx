import { useParams, useNavigate, Link } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreatureDetails() {
  const { id } = useParams();
  const [creature, setCreature] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreatureDetails = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/creature/${id}`);
        if (data?.success) {
          setCreature(data.data);
          document.title = `Creature - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch creature details");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching the creature details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCreatureDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this creature?")) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/profiles/creature/${id}`
        );
        if (data?.success) {
          toast.success("Creature deleted successfully");
          navigate("/profile/creature");
        } else {
          throw new Error("Failed to delete creature");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the creature"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!creature) {
    return <p>No creature found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{creature.name}</h1>
        <p className="description">{creature.description}</p>
        <p className="profile-info">
          👁️: {creature.views} | ✎ :{" "}
          {new Date(creature.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(creature.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Associated Deity:</strong> {creature.associatedDeity}
          </p>
          <p>
            <strong>Iconography:</strong> {creature.iconography}
          </p>
          <p>
            <strong>Symbolic Meaning:</strong> {creature.symbolicMeaning}
          </p>
          <p>
            <strong>Mythology Reference:</strong> {creature.mythologyReferences}
          </p>
        </div>
        <hr />
        {GetUserId() === creature.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/creature/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Creature</button>
            <hr />{" "}
          </div>
        )}

        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {creature.notes.length > 0 ? (
            creature.notes.map((note, index) => (
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
