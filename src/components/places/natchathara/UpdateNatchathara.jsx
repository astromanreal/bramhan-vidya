import { useParams, useNavigate } from "react-router-dom";
import apiUrl from "../../utils/GetApiUrl";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateNatchathara() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    notes: [{ key: "", value: "" }],
    location: {
      city: "",
      state: "",
      country: "",
      latitude: 0,
      longitude: 0,
    },
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
    natchatharaOrder: 0,
    associatedStar: "",
    associatedDeity: "",
    festivals: "",
    rituals: "",
  });

  useEffect(() => {
    const fetchNatchatharaTemple = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/places/NatchatharaTemple/${id}`
        );
        setFormData(data.data);
      } catch (err) {
        toast.error(
          err.message ||
            "An error occurred while fetching Natchathara Temple details"
        );
      }
    };
    fetchNatchatharaTemple();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    const locationField = name.split(".")[1];
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [locationField]: value,
      },
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
      await axios.put(
        `${apiUrl}/places/NatchatharaTemple/${id}`,
        filteredFormData
      );
      toast.success("Natchathara Temple updated successfully");
      navigate(`/place/natchathara/${id}`);
    } catch (err) {
      toast.error(
        err.message || "An error occurred while updating Natchathara Temple"
      );
    }
  };

  return (
    <div>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Update Natchathara Temple</h1>
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
            name="location.city"
            value={formData.location.city}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="location.state"
            value={formData.location.state}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="location.country"
            value={formData.location.country}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            name="location.latitude"
            value={formData.location.latitude}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            name="location.longitude"
            value={formData.location.longitude}
            onChange={handleLocationChange}
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
          <label>Natchathara Order:</label>
          <input
            type="number"
            name="natchatharaOrder"
            value={formData.natchatharaOrder}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Star:</label>
          <select
            required
            name="associatedStar"
            value={formData.associatedStar}
            onChange={handleChange}
          >
            <option value="">Select a Star</option>
            <option value="Ashwini">Ashwini</option>
            <option value="Bharani">Bharani</option>
            <option value="Krittika">Krittika</option>
            <option value="Rohini">Rohini</option>
            <option value="Mrigashira">Mrigashira</option>
            <option value="Ardra">Ardra</option>
            <option value="Punarvasu">Punarvasu</option>
            <option value="Pushya">Pushya</option>
            <option value="Ashlesha">Ashlesha</option>
            <option value="Magha">Magha</option>
            <option value="Purva Phalguni">Purva Phalguni</option>
            <option value="Uttara Phalguni">Uttara Phalguni</option>
            <option value="Hasta">Hasta</option>
            <option value="Chitra">Chitra</option>
            <option value="Swati">Swati</option>
            <option value="Vishaka">Vishaka</option>
            <option value="Anuradha">Anuradha</option>
            <option value="Jyeshtha">Jyeshtha</option>
            <option value="Mula">Mula</option>
            <option value="Purva Ashadha">Purva Ashadha</option>
            <option value="Uttara Ashadha">Uttara Ashadha</option>
            <option value="Sravana">Sravana</option>
            <option value="Dhanishta">Dhanishta</option>
            <option value="Shatabhisha">Shatabhisha</option>
            <option value="Purva Bhadrapada">Purva Bhadrapada</option>
            <option value="Uttara Bhadrapada">Uttara Bhadrapada</option>
            <option value="Revati">Revati</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label>Associated Deity:</label>
          <input
            type="text"
            name="associatedDeity"
            value={formData.associatedDeity}
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
        <button type="submit">Update Natchathara Temple</button>
      </form>
    </div>
  );
}
