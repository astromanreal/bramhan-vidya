import { useNavigate } from "react-router-dom";
import GetUserId from "../utils/GetUserId";
import toast from "react-hot-toast";
import apiUrl from "../utils/GetApiUrl";
import { useState } from "react";
import axios from "axios";

export default function AddFestival() {
  const navigate = useNavigate();
  const [festival, setFestival] = useState({
    name: "",
    userId: GetUserId(),
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFestival({ ...festival, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filteredFestival = {
      ...festival,
      randomKeyDetails: festival.randomKeyDetails.filter(
        (detail) => detail.key && detail.value
      ),
      notes: festival.notes.filter((note) => note.key || note.value),
    };
    try {
      const response = await axios.post(
        `${apiUrl}/festivals/addfestival`,
        filteredFestival
      );
      if (response.status === 200) {
        toast.success("Festival added successfully!");
        navigate("/festival");
      } else {
        toast.error("Failed to add festival!");
      }
    } catch (error) {
      toast.error(error.message);
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
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

  const addRandomKeyDetail = () => {
    setFestival((prevFest) => ({
      ...prevFest,
      randomKeyDetails: [...prevFest.randomKeyDetails, { key: "", value: "" }],
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

  const handleAddNote = () => {
    setFestival({
      ...festival,
      notes: [...festival.notes, { key: "", value: "" }],
    });
  };

  const festivalTypes = [
    "Solar",
    "Lunar",
    "Seasonal",
    "Mythological",
    "Puranic",
    "Tantric",
    "Others",
  ];
  return (
    <>
      <form onSubmit={handleSubmit} id="add-profile-form">
        <h1>Add Festival</h1>
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
            {festivalTypes.map((type) => (
              <option value={type}>{type}</option>
            ))}
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
          <textarea
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
          <button type="button" onClick={addRandomKeyDetail}>
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
          <button type="button" onClick={handleAddNote}>
            Add More Notes
          </button>
        </div>
        <button type="submit">Submit Festival</button>
      </form>
    </>
  );
}
