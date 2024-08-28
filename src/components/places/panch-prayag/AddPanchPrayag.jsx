import GetUserId from "./../../utils/GetUserId";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function AddPanchPrayag() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    path: "panch-prayag",
    userId: GetUserId(),
    notes: [{ key: "", value: "" }],
    image: "",
    location: {
      city: "",
      state: "",
      country: "",
      latitude: 0,
      longitude: 0,
    },
    significance: "",
    legend: "",
    description: "",
    bestTimeToVisit: "",
    visitingHours: "",
    offerings: "",
    accommodation: "",
    nearbyPlaces: "",
    prayagOrder: 0,
    associatedRivers: "",
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

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
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
        `${apiUrl}/places/addPanchPrayag`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Panch Prayag added!");
        navigate("/place/panch-prayag");
      } else {
        throw new Error("Failed to add Panch Prayag");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while adding Panch Prayag");
    }
  };

  return (
    <div>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Add Panch Prayag</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
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
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.location.city}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.location.state}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.location.country}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={formData.location.latitude}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={formData.location.longitude}
            onChange={handleLocationChange}
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
          <input
            type="text"
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
          <label>Prayag Order:</label>
          <select
            name="prayagOrder"
            required
            value={formData.prayagOrder}
            onChange={handleChange}
          >
            <option value="0">Select Prayag Order</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label>Associated Rivers:</label>
          <input
            type="text"
            name="associatedRivers"
            value={formData.associatedRivers}
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
