import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import apiUrl from "../utils/GetApiUrl";

export default function UpdateFestival() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [festival, setFestival] = useState({
    name: "",
    image: "",
    description: "",
    type: "",
    date: "",
    purpose: "",
    ritual: "",
    deitiesInvolved: "",
    references: "",
    randomKeyDetails: [
      {
        key: "",
        value: "",
      },
    ],
    notes: [
      {
        key: "",
        value: "",
      },
    ],
  });

  useEffect(() => {
    const fetchFestival = async () => {
      try {
        const response = await axios.get(`${apiUrl}/festivals/festival/${id}`);
        setFestival(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchFestival();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFestival({ ...festival, [name]: value });
  };

  const handleRandomKeyDetailsChange = (event, index) => {
    const { name, value } = event.target;
    setFestival((prevFest) => ({
      ...prevFest,
      randomKeyDetails: prevFest.randomKeyDetails.map((detail, i) =>
        i === index ? { ...detail, [name]: value } : detail
      ),
    }));
  };

  const handleNotesChange = (index, noteType, value) => {
    const updatedNotes = [...festival.notes];
    if (!updatedNotes[index]) {
      updatedNotes[index] = {};
    }
    updatedNotes[index][noteType] = value;
    setFestival({ ...festival, notes: updatedNotes });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${apiUrl}/festivals/festival/${id}`,
        festival
      );
      if (response.status === 200) {
        toast.success("Festival updated successfully!");
        navigate(`/festival/${id}`);
      } else {
        toast.error("Failed to update festival!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="add-profile-form">
        <h1>Update Festival</h1>
        <div>
          <label>Festival Name:</label>
          <input
            type="text"
            name="name"
            required
            value={festival.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={festival.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={festival.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <select
            name="type"
            required
            value={festival.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Religious">Religious</option>
            <option value="Cultural">Cultural</option>
            <option value="Social">Social</option>
            <option value="Historical">Historical</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={festival.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Purpose:</label>
          <input
            type="text"
            name="purpose"
            value={festival.purpose}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ritual:</label>
          <input
            type="text"
            name="ritual"
            value={festival.ritual}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Deities Involved:</label>
          <input
            type="text"
            name="deitiesInvolved"
            value={festival.deitiesInvolved}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>References:</label>
          <input
            type="text"
            name="references"
            value={festival.references}
            onChange={handleChange}
          />
        </div>
        <div className="add-topic-container">
          <h2>Random Key Details:</h2>
          {festival.randomKeyDetails.map((detail, index) => (
            <div key={index}>
              <label>Key: </label>
              <input
                type="text"
                name="key"
                value={detail.key}
                onChange={(event) => handleRandomKeyDetailsChange(event, index)}
              />
              <label>Value: </label>
              <input
                type="text"
                name="value"
                value={detail.value}
                onChange={(event) => handleRandomKeyDetailsChange(event, index)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFestival({
                ...festival,
                randomKeyDetails: [
                  ...festival.randomKeyDetails,
                  { key: "", value: "" },
                ],
              })
            }
          >
            Add More Key Details
          </button>
        </div>
        <div id="profile-add-notes">
          <h2>Notes:</h2>
          {festival.notes.map((note, index) => (
            <div key={index}>
              <input
                type="text"
                name={`notes-${index}-key`}
                value={note.key}
                onChange={(e) =>
                  handleNotesChange(index, "key", e.target.value)
                }
              />
              <textarea
                name={`notes-${index}-value`}
                value={note.value}
                onChange={(e) =>
                  handleNotesChange(index, "value", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFestival({
                ...festival,
                notes: [...festival.notes, { key: "", value: "" }],
              })
            }
          >
            Add More Notes
          </button>
        </div>
        <button type="submit">Update Festival</button>
      </form>
    </>
  );
}
