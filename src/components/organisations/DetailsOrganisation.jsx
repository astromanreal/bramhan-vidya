import React, { useEffect, useState } from "react";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import GetUserId from "./../utils/GetUserId";

export default function DetailsOrganisation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [organisation, setOrganisation] = useState({});

  useEffect(() => {
    axios
      .get(`${apiUrl}/organisations/organisation/${id}`)
      .then((response) => {
        setOrganisation(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Organisation?")) {
      try {
        const { data } = await axios.delete(
          `${apiUrl}/Organisations/Organisation/${id}`
        );
        if (data?.success) {
          toast.success("Deleted successfully");
          navigate("/Organisation");
        } else {
          throw new Error("Failed to delete Organisation");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the Organisation"
        );
      }
    }
  };

  return (
    <>
      <div className="organisation-details-container">
        <h1 className="organisation-name">{organisation.organisationName}</h1>
        <p className="organisation-info">
          👁️ : {organisation.views} | ✎ :{" "}
          {new Date(organisation.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚
          {new Date(organisation.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <div className="organisation-update-delete-btn">
          {GetUserId() === organisation.userId && (
            <div>
              <button
                onClick={() => {
                  navigate(`/organisation/update/${id}`);
                }}
              >
                Update Data
              </button>
              <button onClick={handleDelete}>Delete Data</button>{" "}
            </div>
          )}
        </div>{" "}
        <p className="organisation-description">{organisation.description}</p>
        <div>
          <p>
            <strong>Founding Year:</strong> {organisation.foundingYear}
          </p>
          <p>
            <strong>Founder:</strong> {organisation.founder}
          </p>
          <p>
            <strong>Headquarter:</strong> {organisation.headquarter}
          </p>
          <p>
            <strong>Objective:</strong> {organisation.objective}
          </p>
        </div>
        <div>
          {organisation.contactInformation && (
            <>
              <p>
                <strong>Website:</strong>{" "}
                {organisation.contactInformation.website || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {organisation.contactInformation.phone || "N/A"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {organisation.contactInformation.email || "N/A"}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {organisation.contactInformation.address || "N/A"}
              </p>
            </>
          )}
        </div>
        <div>
          <p>
            <strong>Notable Figures:</strong> {organisation.notableFigures}
          </p>
        </div>
        <div>
          <p>
            <strong>Controversies:</strong> {organisation.controversies}
          </p>
        </div>
        <div>
          <p>
            <strong>Achievements:</strong> {organisation.achievements}
          </p>
        </div>
        <div className="organisation-random-key-details">
          {organisation.randomKeyDetails &&
            organisation.randomKeyDetails.map((detail) => (
              <p key={detail.key}>
                <strong>{detail.key}:</strong> {detail.value}
              </p>
            ))}
        </div>
        <div className="organisation-notes">
          {organisation.notes &&
            organisation.notes.map((note) => (
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
