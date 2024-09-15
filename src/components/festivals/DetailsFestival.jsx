import React, { useEffect, useState } from "react";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import GetUserId from "./../utils/GetUserId";

export default function DetailsFestival() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [festival, setFestival] = useState({});

  useEffect(() => {
    axios
      .get(`${apiUrl}/festivals/festival/${id}`)
      .then((response) => {
        setFestival(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Festival?")) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/festivals/festival/${id}`
        );
        if (data?.success) {
          toast.success("Deleted successfully");
          navigate("/festival");
        } else {
          throw new Error("Failed to delete Festival");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Festival"
        );
      }
    }
  };

  return (
    <>
      <div className="festival-details-container">
        <h1 className="festival-name">{festival.name}</h1>
        <p className="festival-info">
          👁️ : {festival.views} | ✎ :{" "}
          {new Date(festival.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚
          {new Date(festival.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <div className="festival-update-delete-btn">
          {GetUserId() === festival.userId && (
            <div>
              <button
                onClick={() => {
                  navigate(`/festival/update/${id}`);
                }}
              >
                Update Data
              </button>
              <button onClick={handleDelete}>Delete Data</button>{" "}
            </div>
          )}
        </div>{" "}
        <p className="festival-description">{festival.description}</p>
        <div>
          <p>
            <strong>Type:</strong> {festival.type}
          </p>
          <p>
            <strong>Date:</strong> {festival.date}
          </p>
          <p>
            <strong>Purpose:</strong> {festival.purpose}
          </p>
          <p>
            <strong>Ritual:</strong> {festival.ritual}
          </p>
        </div>
        <div>
          <p>
            <strong>Deities Involved:</strong> {festival.deitiesInvolved}
          </p>
          <p>
            <strong>References:</strong> {festival.references}
          </p>
        </div>
        <div className="festival-random-key-details">
          {festival.randomKeyDetails &&
            festival.randomKeyDetails.map((detail) => (
              <p key={detail.key}>
                <strong>{detail.key}:</strong> {detail.value}
              </p>
            ))}
        </div>
        <div className="festival-notes">
          {festival.notes &&
            festival.notes.map((note) => (
              <div key={note.key}>
                <h2>{note.key}</h2>
                <p>{note.value}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
