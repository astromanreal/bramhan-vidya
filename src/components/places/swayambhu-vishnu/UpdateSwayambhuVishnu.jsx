import { useNavigate, useParams } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateSwayambhuVishnu() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    path: "swayambhu-vishnu",
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
    deity: "Vishnu",
    templeName: "",
    significance: "",
    legend: "",
    description: "",
    bestTimeToVisit: "",
    visitingHours: "",
    offerings: "",
    accommodation: "",
    nearbyPlace: "",
    swayambhuType: "",
    vishnuForm: "",
    associatedLakshmi: "",
    festivals: "",
    rituals: "",
  });

  useEffect(() => {
    const fetchSwayambhuVishnu = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/places/swayambhuVishnu/${id}`
        );
        setFormData(data.data);
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching Swayambhu Vishnu"
        );
      }
    };
    fetchSwayambhuVishnu();
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
    setLoading(true);
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      const { data } = await axios.put(
        `${apiUrl}/places/swayambhuVishnu/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Swayambhu Vishnu updated!");
        navigate("/place/swayambhu-vishnu");
      } else {
        throw new Error("Failed to update Swayambhu Vishnu");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while updating Swayambhu Vishnu"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Update Swayambhu Vishnu</h1>
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
        <h2>Location</h2>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.location?.city}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.location?.state}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.location?.country}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={formData.location?.latitude}
            onChange={handleLocationChange}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={formData.location?.longitude}
            onChange={handleLocationChange}
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
          <label>Swayambhu Type:</label>
          <select
            required
            name="swayambhuType"
            value={formData.swayambhuType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Self-manifested">Self-manifested</option>
            <option value="Installed by a sage">Installed by a sage</option>
            <option value="Installed by a king">Installed by a king</option>
          </select>
        </div>
        <div>
          <label>Vishnu Form:</label>
          <input
            type="text"
            name="vishnuForm"
            value={formData.vishnuForm}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Lakshmi:</label>
          <input
            type="text"
            name="associatedLakshmi"
            value={formData.associatedLakshmi}
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
          <label>Nearby Place:</label>
          <input
            type="text"
            name="nearbyPlace"
            value={formData.nearbyPlace}
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
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Swayambhu Vishnu"}
        </button>
      </form>
    </>
  );
}
