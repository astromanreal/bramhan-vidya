import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import { useState } from "react";
import axios from "axios";

export default function AddAshtaVinayaka() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    path: "ashta-vinayaka",
    userId: GetUserId(),
    notes: [{ key: "", value: "" }],
    image: "",
    deity: "",
    templeName: "",
    significance: "",
    legend: "",
    description: "",
    bestTimeToVisit: "",
    visitingHours: "",
    offerings: "",
    accommodation: "",
    nearbyPlaces: "",
    vinayakaOrder: "",
    associatedGaneshaForm: "",
    associatedMoreshwar: "",
    festivals: "",
    rituals: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      const response = await axios.post(
        `${apiUrl}/places/addAshtaVinayaka`,
        filteredFormData
      );
      if (response.data.success) {
        alert("Added successfully!");
        navigate("/place/ashta-vinayaka");
      } else {
        throw new Error("Failed to add Ashta-vinayaka");
      }
    } catch (err) {
      alert(err.message || "An error occurred while adding Ashta-vinayaka");
    }
  };

  return (
    <div>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Add Ashta Vinayaka</h1>
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
          <textarea
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
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
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
          <label>Accommodation:</label>
          <input
            type="text"
            name="accommodation"
            value={formData.accommodation}
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
          <label>Vinayaka Order:</label>
          <input
            type="number"
            name="vinayakaOrder"
            value={formData.vinayakaOrder}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Ganesha Form:</label>
          <input
            type="text"
            name="associatedGaneshaForm"
            value={formData.associatedGaneshaForm}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Moreshwar:</label>
          <input
            type="text"
            name="associatedMoreshwar"
            value={formData.associatedMoreshwar}
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
          <input
            type="text"
            name="rituals"
            value={formData.rituals}
            onChange={handleChange}
          />
        </div>{" "}
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
        <button type="submit">Add Ashta Vinayaka</button>
      </form>
    </div>
  );
}
