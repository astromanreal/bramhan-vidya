import { useNavigate } from "react-router-dom";
import GetUserId from "../utils/GetUserId";
import toast from "react-hot-toast";
import apiUrl from "../utils/GetApiUrl";
import { useState } from "react";
import axios from "axios";

export default function AddTech() {
  const navigate = useNavigate();
  const [technology, setTechnology] = useState({
    name: "",
    userId: GetUserId(),
    description: "",
    image: "",
    reference: "",
    owner: "",
    createdBy: "",
    category: "",
    randomKeyDetails: [
      {
        key: "",
        value: "",
      },
    ],
    notes: [{ key: "", value: "" }],
  });

  const handleChange = (event) => {
    setTechnology({ ...technology, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filteredTech = {
      ...technology,
      randomKeyDetails: technology.randomKeyDetails.filter(
        (detail) => detail.key && detail.value
      ),
      notes: technology.notes.filter((note) => note.key || note.value),
    };
    try {
      const response = await axios.post(`${apiUrl}/tech/addtech`, filteredTech);
      if (response.status === 200) {
        toast.success("Technology added successfully!");
        navigate("/tech");
      } else {
        toast.error("Failed to add technology!");
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
    setTechnology((prevTech) => ({
      ...prevTech,
      randomKeyDetails: prevTech.randomKeyDetails.map((detail, i) =>
        i === index ? { ...detail, [name]: value } : detail
      ),
    }));
  };

  const addRandomKeyDetail = () => {
    setTechnology((prevTech) => ({
      ...prevTech,
      randomKeyDetails: [...prevTech.randomKeyDetails, { key: "", value: "" }],
    }));
  };

  const handleNotesChange = (index, noteType, value) => {
    const updatedNotes = [...technology.notes];
    if (!updatedNotes[index]) {
      updatedNotes[index] = {};
    }
    updatedNotes[index][noteType] = value;
    setTechnology({ ...technology, notes: updatedNotes });
  };

  const handleAddNote = () => {
    setTechnology({
      ...technology,
      notes: [...technology.notes, { key: "", value: "" }],
    });
  };

  const categories = [
    "Armour",
    "Flags",
    "Vehicles",
    "Chakra",
    "Weapons",
    "Trees",
    "Plants",
    "Vessels",
    "Instruments",
    "Substances",
    "Treasures",
    "Jewellery",
    "Garland|Mala",
    "Miscellaneous",
    "Others",
  ];

  return (
    <div>
      <form onSubmit={handleSubmit} id="add-profile-form">
        <h1>Add Technology</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            value={technology.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            required
            value={technology.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            required
            placeholder="Public Link only"
            value={technology.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Reference:</label>
          <input
            type="text"
            name="reference"
            value={technology.reference}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Owner:</label>
          <input
            type="text"
            name="owner"
            value={technology.owner}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Created By:</label>
          <input
            type="text"
            name="createdBy"
            value={technology.createdBy}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            required
            value={technology.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="add-topic-container">
          <h2>Random Key Details:</h2>
          {technology.randomKeyDetails.map((detail, index) => (
            <div key={index}>
              <label>Key: </label>

              <input
                placeholder={`KEY: ${index + 1}`}
                type="text"
                name="key"
                value={detail.key}
                onChange={(event) => handleRandomKeyDetailsChange(event, index)}
              />
              <label>Value: </label>
              <input
                placeholder={`VALUE: ${index + 1}`}
                type="text"
                name="value"
                value={detail.value}
                onChange={(event) => handleRandomKeyDetailsChange(event, index)}
              />
            </div>
          ))}
          <button type="button" onClick={addRandomKeyDetail}>
            Do you have more Key Detail?
          </button>
        </div>

        <div id="profile-add-notes">
          <h2>Notes:</h2>
          {technology.notes.map((note, index) => (
            <div key={index}>
              <input
                type="text"
                name={`notes-${index}-key`}
                placeholder={`key ${index + 1}`}
                value={note.key}
                onChange={(e) =>
                  handleNotesChange(index, "key", e.target.value)
                }
              />

              <textarea
                type="text"
                name={`notes-${index}-value`}
                placeholder={`Value ${index + 1}`}
                value={note.value}
                onChange={(e) =>
                  handleNotesChange(index, "value", e.target.value)
                }
              />
            </div>
          ))}
          <button type="button" onClick={handleAddNote}>
            Add Note
          </button>
        </div>
        <button type="submit">Add Technology</button>
      </form>
    </div>
  );
}
