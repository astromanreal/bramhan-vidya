import GetUserId from "../../utils/GetUserId";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../utils/GetApiUrl";
import { useState } from "react";
import axios from "axios";

export default function AddChakraVaishnava() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    path: "chakra-vaishnava",
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
    chakra: "",
    associatedChakraColor: "",
    associatedChakraDeity: "",
    festivals: "",
    rituals: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  const handleNotesChange = (index, noteType, value) => {
    const updatedNotes = [...data.notes];
    if (!updatedNotes[index]) {
      updatedNotes[index] = {};
    }
    updatedNotes[index][noteType] = value;
    setData({ ...data, notes: updatedNotes });
  };

  const handleAddNote = () => {
    setData({
      ...data,
      notes: [...data.notes, { key: "", value: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredFormData = {
      ...data,
      notes: data.notes.filter((note) => note.key && note.value),
    };
    try {
      const response = await axios.post(
        `${apiUrl}/places/addChakraVaishnava`,
        filteredFormData
      );
      if (response.data.success) {
        alert("Chakra Vaishnava added successfully!");
        navigate("/place/chakra-vaishnava");
      } else {
        throw new Error("Failed to add Chakra Vaishnava");
      }
    } catch (err) {
      alert(err.message || "An error occurred while adding Chakra Vaishnava");
    }
  };

  return (
    <div>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Add Chakra Vaishnava</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={data.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={data.location.city}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={data.location.state}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={data.location.country}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={data.location.latitude}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={data.location.longitude}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Deity:</label>
          <input
            type="text"
            name="deity"
            value={data.deity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Temple Name:</label>
          <input
            type="text"
            name="templeName"
            value={data.templeName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Significance:</label>
          <input
            type="text"
            name="significance"
            value={data.significance}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Legend:</label>
          <input
            type="text"
            name="legend"
            value={data.legend}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Best Time to Visit:</label>
          <input
            type="text"
            name="bestTimeToVisit"
            value={data.bestTimeToVisit}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Visiting Hours:</label>
          <input
            type="text"
            name="visitingHours"
            value={data.visitingHours}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Offerings:</label>
          <input
            type="text"
            name="offerings"
            value={data.offerings}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Accommodation:</label>
          <input
            type="text"
            name="accommodation"
            value={data.accommodation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nearby Places:</label>
          <input
            type="text"
            name="nearbyPlaces"
            value={data.nearbyPlaces}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Chakra:</label>
          <select
            required
            name="chakra"
            value={data.chakra}
            onChange={handleChange}
          >
            <option value="">Select Chakra</option>
            <option value="Muladhara">Muladhara</option>
            <option value="Svadhisthana">Svadhisthana</option>
            <option value="Manipura">Manipura</option>
            <option value="Anahata">Anahata</option>
            <option value="Vishuddha">Vishuddha</option>
            <option value="Ajna">Ajna</option>
            <option value="Sahasrara">Sahasrara</option>
            <option value="Guru Paduka">Guru Paduka</option>
          </select>
        </div>
        <div>
          <label>Associated Chakra Color:</label>
          <input
            type="text"
            name="associatedChakraColor"
            value={data.associatedChakraColor}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Chakra Deity:</label>
          <input
            type="text"
            name="associatedChakraDeity"
            value={data.associatedChakraDeity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festivals:</label>
          <input
            type="text"
            name="festivals"
            value={data.festivals}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rituals:</label>
          <input
            type="text"
            name="rituals"
            value={data.rituals}
            onChange={handleChange}
          />
        </div>{" "}
        <div id="profile-add-notes">
          <h2>Notes:</h2>
          {data.notes.map((note, index) => (
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
        <button type="submit">Add Chakra Vaishnava</button>
      </form>
    </div>
  );
}
