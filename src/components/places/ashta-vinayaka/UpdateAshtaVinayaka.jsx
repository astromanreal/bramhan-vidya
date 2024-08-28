import { useParams, useNavigate } from "react-router-dom";
import apiUrl from "../../utils/GetApiUrl";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateAshtaVinayaka() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    notes: [{ key: "", value: "" }],
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/places/Ashtavinayaka/${id}`
        );
        setFormData(response.data.data);
      } catch (err) {
        alert(err.message || "Failed to fetch Ashta Vinayaka details");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNotesChange = (index, noteType, value) => {
    const updatedFormData = { ...formData };
    if (!updatedFormData.notes[index]) {
      updatedFormData.notes[index] = {};
    }
    updatedFormData.notes[index][noteType] = value;
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      await axios.put(`${apiUrl}/places/Ashtavinayaka/${id}`, filteredFormData);
      alert("Data updated successfully");
      navigate(`/place/ashta-vinayaka/${id}`);
    } catch (err) {
      alert(err.message || "Failed to update Ashta Vinayaka details");
    }
  };

  return (
    <div>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Update Ashta Vinayaka</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
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
          <input
            type="text"
            name="significance"
            value={formData.significance}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Legend:</label>
          <input
            type="text"
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
          <button
            type="button"
            onClick={() => {
              const updatedFormData = { ...formData };
              updatedFormData.notes.push({ key: "", value: "" });
              setFormData(updatedFormData);
            }}
          >
            Add Note
          </button>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
