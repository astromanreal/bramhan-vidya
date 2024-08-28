import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function NagaDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [naga, setNaga] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNagaDetails = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/naga/${id}`);
        if (data?.success) {
          setNaga(data.data);
          document.title = `Naga - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Naga details");
        }
      } catch (err) {
        toast.error(err.message || "Failed to fetch the data");
      } finally {
        setLoading(false);
      }
    };

    fetchNagaDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Naga?")) {
      try {
        const { data } = await axios.delete(`${apiUrl}/profiles/naga/${id}`);
        if (data?.success) {
          toast.success("Naga deleted successfully");
          navigate("/profile/naga");
        } else {
          throw new Error("Failed to delete Naga");
        }
      } catch (err) {
        toast.error(err.message || "An error occurred while deleting the Naga");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!naga) {
    return <p>No Naga found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1> {naga.name}</h1>
        <p className="description">{naga.description}</p>
        <p className="profile-info">
          👁️ : {naga.views} | ✎ :{" "}
          {new Date(naga.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(naga.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Timeline:</strong> {naga.timeline}
          </p>
          <p>
            <strong>Deity:</strong> {naga.deity}
          </p>
          <p>
            <strong>Power/Ability:</strong> {naga.powersAbility}
          </p>
          <p>
            <strong>Known Work:</strong> {naga.knownWork}
          </p>
          <p>
            <strong>Region:</strong> {naga.region}
          </p>
          <p>
            <strong>Event:</strong> {naga.event}
          </p>
          <p>
            <strong>Textual Reference:</strong> {naga.textualReference}
          </p>
          <p>
            <strong>Weakness:</strong> {naga.weakness}
          </p>
        </div>
        <hr />
        {GetUserId() === naga.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/naga/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}

        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {naga.notes.length > 0 ? (
            naga.notes.map((note, index) => (
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
