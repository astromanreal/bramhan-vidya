import { useNavigate, useParams } from "react-router-dom";
import apiUrl from "../../utils/GetApiUrl";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateMahaShaktiPitha() {
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
    pithaOrder: 0,
    associatedBodyPart: "",
    shaktiForm: "",
    bhairavaForm: "",
    festivals: "",
    rituals: "",
  });

  useEffect(() => {
    const fetchMahaShaktiPitha = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/places/MahaShaktiPitha/${id}`
        );
        if (data?.success) {
          setFormData(data.data);
        } else {
          throw new Error("Failed to fetch Maha Shakti Pitha details");
        }
      } catch (err) {
        toast.error(
          err.message ||
            "An error occurred while fetching Maha Shakti Pitha details"
        );
      }
    };
    fetchMahaShaktiPitha();
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
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      const { data } = await axios.put(
        `${apiUrl}/places/MahaShaktiPitha/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Maha Shakti Pitha updated!");
        navigate(`/place/maha-shakti-pitha/${id}`);
      } else {
        throw new Error("Failed to update Maha Shakti Pitha");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while updating Maha Shakti Pitha"
      );
    }
  };

  return (
    <>
      <div>
        <form id="add-profile-form" onSubmit={handleSubmit}>
          {" "}
          <h1>Update Maha Shakti Pitha</h1>
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
            <label>Pitha Order:</label>
            <input
              type="number"
              name="pithaOrder"
              value={formData.pithaOrder}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Associated Body Part:</label>
            <input
              type="text"
              name="associatedBodyPart"
              value={formData.associatedBodyPart}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Shakti Form:</label>
            <input
              type="text"
              name="shaktiForm"
              value={formData.shaktiForm}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Bhairava Form:</label>
            <input
              type="text"
              name="bhairavaForm"
              value={formData.bhairavaForm}
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
    </>
  );
}
