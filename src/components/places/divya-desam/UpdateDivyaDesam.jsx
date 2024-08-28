import { useParams, useNavigate } from "react-router-dom";
import apiUrl from "../../utils/GetApiUrl";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateDivyaDesam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    notes: [{ key: "", value: "" }],
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
    accommodation: "",
    nearbyPlaces: "",
    desamOrder: "",
    associatedVishnuForm: "",
    festivals: "",
    rituals: "",
  });

  useEffect(() => {
    const fetchDivyaDesam = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/places/DivyaDesam/${id}`);
        setFormData(data.data);
      } catch (err) {
        alert(err.message || "Failed to fetch Divya Desam details");
      } finally {
        setLoading(false);
      }
    };

    fetchDivyaDesam();
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
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
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
    try {
      await axios.put(`${apiUrl}/places/DivyaDesam/${id}`, formData);
      alert("Data updated successfully");
      navigate(`/place/divya-desam/${id}`);
    } catch (err) {
      alert(err.message || "Failed to update Divya Desam");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        <h1>Update Divya Desam</h1>
        <div>
          <labe>Name:</labe>
          <input
            type="text"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <labe>Image:</labe>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.location?.city}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.location?.state}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.location?.country}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.location?.latitude}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.location?.longitude}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label htmlFor="deity">Deity:</label>
          <input
            type="text"
            id="deity"
            name="deity"
            value={formData.deity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="templeName">Temple Name:</label>
          <input
            type="text"
            id="templeName"
            name="templeName"
            value={formData.templeName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="significance">Significance:</label>
          <input
            type="text"
            id="significance"
            name="significance"
            value={formData.significance}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="legend">Legend:</label>
          <input
            type="text"
            id="legend"
            name="legend"
            value={formData.legend}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bestTimeToVisit">Best Time to Visit:</label>
          <input
            type="text"
            id="bestTimeToVisit"
            name="bestTimeToVisit"
            value={formData.bestTimeToVisit}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="visitingHours">Visiting Hours:</label>
          <input
            type="text"
            id="visitingHours"
            name="visitingHours"
            value={formData.visitingHours}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="offerings">Offerings:</label>
          <input
            type="text"
            id="offerings"
            name="offerings"
            value={formData.offerings}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="accommodation">Accommodation:</label>
          <input
            type="text"
            id="accommodation"
            name="accommodation"
            value={formData.accommodation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nearbyPlaces">Nearby Places:</label>
          <input
            type="text"
            id="nearbyPlaces"
            name="nearbyPlaces"
            value={formData.nearbyPlaces}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="desamOrder">Desam Order:</label>
          <input
            type="number"
            id="desamOrder"
            name="desamOrder"
            value={formData.desamOrder}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="associatedVishnuForm">Associated Vishnu Form:</label>
          <input
            type="text"
            id="associatedVishnuForm"
            name="associatedVishnuForm"
            value={formData.associatedVishnuForm}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="festivals">Festivals:</label>
          <input
            type="text"
            id="festivals"
            name="festivals"
            value={formData.festivals}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rituals">Rituals:</label>
          <input
            type="text"
            id="rituals"
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
