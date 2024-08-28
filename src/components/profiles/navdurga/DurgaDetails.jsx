import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function DurgaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [durga, setDurga] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDurga = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/navdurga/${id}`);
        if (data?.success) {
          setDurga(data.data);
          document.title = `Durga - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Durga details");
        }
      } catch (err) {
        toast.error(err.message || "Feiled to fetch the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchDurga();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Durga?")) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/profiles/navdurga/${id}`
        );
        if (data?.success) {
          toast.success("Durga deleted successfully");
          navigate("/profile/durga");
        } else {
          throw new Error("Failed to delete Durga");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Durga"
        );
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!durga) {
    return <p>No Durga found</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{durga.name}</h1> <p className="description">{durga.description}</p>
        <p className="profile-info">
          👁️ : {durga.views} | ✎ :{" "}
          {new Date(durga.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(durga.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Day:</strong> {durga.day}
          </p>
          <p>
            <strong>Attribute:</strong> {durga.attribute}
          </p>
          <p>
            <strong>Iconography:</strong> {durga.iconography}
          </p>
          <p>
            <strong>Symbolism:</strong> {durga.symbolism}
          </p>
          <p>
            <strong>Associated Legend:</strong> {durga.associatedLegend}
          </p>
          <p>
            <strong>Mantra:</strong> {durga.mantra}
          </p>
          <p>
            <strong>Worship Practice:</strong> {durga.worshipPractice}
          </p>
          <p>
            <strong>Benefit:</strong> {durga.benefit}
          </p>
          <p>
            <strong>Festival:</strong> {durga.festival}
          </p>
          <p>
            <strong>Region:</strong> {durga.region}
          </p>
        </div>
        <hr />
        {GetUserId() === durga.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/durga/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}
        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {durga.notes.length > 0 ? (
            durga.notes.map((note, index) => (
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
