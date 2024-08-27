import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import toast from "react-hot-toast";

export default function ModernDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modern, setModern] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModern = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/profiles/modern/${id}`
        );
        if (data?.success) {
          setModern(data.data);
        } else {
          throw new Error("Modern character not found");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching the modern character"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchModern();
  }, [id]);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://bramhan-vidya-api.vercel.app/profiles/modern/${id}`
      );
      if (data?.success) {
        toast.success("Modern character deleted successfully!");
        navigate("/profile/modern");
      } else {
        throw new Error("Failed to delete modern character");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while deleting the modern character"
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div id="profile-detail-container">
        <h1>{modern.name}</h1>
        <p className="description">{modern.description}</p>

        <p className="profile-info">
          👁️ : {modern.views} | ✎ :{" "}
          {new Date(modern.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(modern.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>Teaching: {modern.teaching}</p>
          <p>Notable Work: {modern.notableWork}</p>
          <p>Region: {modern.region}</p>
          <p>Organization: {modern.organization}</p>
          <p>Disciple: {modern.disciple}</p>
          <p>Significant Event: {modern.significantEvent}</p>
          <p>Biography: {modern.biography}</p>
        </div>
        <hr />
        {GetUserId() === modern.userId && (
          <div style={{ margin: "20px" }}>
            <Link to={`/profile/modern/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />{" "}
          </div>
        )}

        <div id="profile-notes-container">
          <h2>Notes:</h2>
          {modern.notes.length > 0 ? (
            modern.notes.map((note, index) => (
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
