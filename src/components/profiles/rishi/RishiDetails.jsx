import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function RishiDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rishi, setRishi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRishi = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/rishi/${id}`);
        if (data?.success) {
          setRishi(data.data);
          document.title = `Rishi - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Rishi details");
        }
      } catch (err) {
        toast.error(err.message || "Error while fetching the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchRishi();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Rishi?")) {
      try {
        const { data } = await axios.delete(`${apiUrl}/profiles/rishi/${id}`);
        if (data?.success) {
          toast.success("Rishi deleted successfully");
          navigate("/profile/rishi");
        } else {
          throw new Error("Failed to delete Rishi");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Rishi"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!rishi) {
    return <p>No Rishi found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{rishi.name}</h1> <p className="description">{rishi.description}</p>
        <p className="profile-info">
          👁️ : {rishi.views} | ✎ :{" "}
          {new Date(rishi.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(rishi.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Class:</strong> {rishi.class}
          </p>
          <p>
            <strong>Timeline:</strong> {rishi.timeline}
          </p>
          <p>
            <strong>Deity:</strong> {rishi.deity}
          </p>
          <p>
            <strong>Disciple:</strong> {rishi.disciple}
          </p>
          <p>
            <strong>Ancestry:</strong> {rishi.ancestry}
          </p>
          <p>
            <strong>Quality:</strong> {rishi.quality}
          </p>
          <p>
            <strong>Known Work:</strong> {rishi.knownWork}
          </p>
          <p>
            <strong>Region:</strong> {rishi.region}
          </p>
          <p>
            <strong>Children:</strong> {rishi.children}
          </p>
          <p>
            <strong>Places of Worship:</strong> {rishi.placesOfWorship}
          </p>
        </div>
        <hr />
        {GetUserId() === rishi.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/rishi/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {rishi.notes.length > 0 ? (
            rishi.notes.map((note, index) => (
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
