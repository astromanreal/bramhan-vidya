import GetUserId from "../../utils/GetUserId";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../utils/GetApiUrl";
import { useState } from "react";
import axios from "axios";

export default function AddJyotrilinga() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    path: "jyotrilinga",
    userId: GetUserId(),
    notes: [{ key: "", value: "" }],
    image: "",
    location: {
      city: "",
      state: "",
      country: "",
      latitude: "",
      longitude: "",
    },
    deity: "",
    templeName: "",
    significance: "",
    legend: "",
    description: "",
    bestTimeToVisit: "",
    visitingHours: "",
    offerings: "",
    nearbyPlaces: "",
    lingamForm: "",
    templeArchitecture: "",
    templeHistory: "",
    pilgrimageImportance: "",
    nearbyRiver: "",
    nearbyMountain: "",
    festivals: "",
    rituals: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleNotesChange = (index, noteType, value) => {
    const updatedNotes = [...formData.notes];
    if (!updatedNotes[index]) {
      updatedNotes[index] = {};
    }
    updatedNotes[index][noteType] = value;
    setFormData({ ...formData, notes: updatedNotes });
  };

  const handleAddNote = () => {
    setFormData({
      ...formData,
      notes: [...formData.notes, { key: "", value: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      const { data } = await axios.post(
        `${apiUrl}/places/addJyotirlinga`,
        filteredFormData
      );
      if (data?.success) {
        alert("Jyotirlinga added successfully!");
        navigate("/place/jyotrilinga");
      } else {
        throw new Error("Failed to add Jyotirlinga");
      }
    } catch (err) {
      alert(err.message || "An error occurred while adding Jyotirlinga");
    }
  };

  return (
    <div>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Add Jyotirlinga Temple</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="location.state"
            value={formData.location.state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="location.country"
            value={formData.location.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            name="location.latitude"
            value={formData.location.latitude}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            name="location.longitude"
            value={formData.location.longitude}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Deity:</label>
          <input
            type="text"
            name="deity"
            value={formData.deity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Temple Name:</label>
          <input
            type="text"
            name="templeName"
            value={formData.templeName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Significance:</label>
          <input
            type="text"
            name="significance"
            value={formData.significance}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Legend:</label>
          <textarea
            name="legend"
            value={formData.legend}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Best Time to Visit:</label>
          <input
            type="text"
            name="bestTimeToVisit"
            value={formData.bestTimeToVisit}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Visiting Hours:</label>
          <input
            type="text"
            id="visitingHours"
            name="visitingHours"
            value={formData.visitingHours}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Offerings:</label>
          <input
            type="text"
            name="offerings"
            value={formData.offerings}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nearby Places:</label>
          <input
            type="text"
            name="nearbyPlaces"
            value={formData.nearbyPlaces}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Lingam Form:</label>
          <select
            required
            name="lingamForm"
            value={formData.lingamForm}
            onChange={handleChange}
          >
            <option value="">Select Lingam Form</option>
            <option value="Self-manifested">Self-manifested</option>
            <option value="Installed by a sage">Installed by a sage</option>
            <option value="Installed by a king">Installed by a king</option>
          </select>
        </div>
        <div>
          <label>Temple Architecture:</label>
          <input
            type="text"
            name="templeArchitecture"
            value={formData.templeArchitecture}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Temple History:</label>
          <textarea
            name="templeHistory"
            value={formData.templeHistory}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Pilgrimage Importance:</label>
          <textarea
            name="pilgrimageImportance"
            value={formData.pilgrimageImportance}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Nearby River:</label>
          <input
            type="text"
            name="nearbyRiver"
            value={formData.nearbyRiver}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nearby Mountain:</label>
          <input
            type="text"
            name="nearbyMountain"
            value={formData.nearbyMountain}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festivals:</label>
          <input
            type="text"
            name="festivals"
            value={formData.festivals}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rituals:</label>
          <textarea
            name="rituals"
            value={formData.rituals}
            onChange={handleChange}
          ></textarea>
        </div>
        <div id="profile-add-notes">
          <h2>Notes:</h2>
          {formData.notes.map((note, index) => (
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
        <button type="submit">Add Jyotirlinga Temple</button>
      </form>
    </div>
  );
}
