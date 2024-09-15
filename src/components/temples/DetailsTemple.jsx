import React, { useEffect, useState } from "react";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import GetUserId from "../utils/GetUserId";

export default function DetailsTemple() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [temple, setTemple] = useState({});

  useEffect(() => {
    axios
      .get(`${apiUrl}/temples/temple/${id}`)
      .then((response) => {
        setTemple(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Temple?")) {
      try {
        const { data } = await axios.delete(`${apiUrl}/Temples/Temple/${id}`);
        if (data?.success) {
          toast.success("Deleted successfully");
          navigate("/Temple");
        } else {
          throw new Error("Failed to delete Temple");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Temple"
        );
      }
    }
  };

  return (
    <>
      <div className="temple-details-container">
        <h1 className="temple-name">{temple.name}</h1>
        <p className="temple-info">
          👁️ : {temple.views} | ✎ :{" "}
          {new Date(temple.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚
          {new Date(temple.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <div className="temple-update-delete-btn">
          {GetUserId() === temple.userId && (
            <div>
              <button
                onClick={() => {
                  navigate(`/temple/update/${id}`);
                }}
              >
                Update Data
              </button>
              <button onClick={handleDelete}>Delete Data</button>{" "}
            </div>
          )}
        </div>{" "}
        <p className="temple-description">{temple.description}</p>
        <div>
          <p>
            <strong>Main Deity:</strong> {temple.deity?.mainDeity}
          </p>
          <p>
            <strong>Other Deities:</strong>{" "}
            {temple.deity?.otherDeities.join(", ")}
          </p>
          <p>
            <strong>Type:</strong> {temple.type}
          </p>
          <p>
            <strong>Architecture Style:</strong> {temple.architecture?.style}
          </p>
          <p>
            <strong>History:</strong> {temple.history?.significantEvent}
          </p>
          <p>
            <strong>Festivals:</strong> {temple.festivals}
          </p>
          <p>
            <strong>Timings:</strong> {temple.timings?.openingTime} -{" "}
            {temple.timings?.closingTime}
          </p>
          <p>
            <strong>Location:</strong> {temple.location?.address},{" "}
            {temple.location?.city}, {temple.location?.state},{" "}
            {temple.location?.country}
          </p>
        </div>
        <div>
          {temple.contactInformation && (
            <>
              <p>
                <strong>Website:</strong>{" "}
                {temple.contactInformation?.website || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {temple.contactInformation?.phone || "N/A"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {temple.contactInformation?.email || "N/A"}
              </p>
            </>
          )}
        </div>
        <div className="temple-random-key-details">
          {temple.randomKeyDetails &&
            temple.randomKeyDetails.map((detail) => (
              <p key={detail.key}>
                <strong>{detail.key}:</strong> {detail.value}
              </p>
            ))}
        </div>
        <div className="temple-notes">
          {temple.notes &&
            temple.notes.map((note) => (
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
