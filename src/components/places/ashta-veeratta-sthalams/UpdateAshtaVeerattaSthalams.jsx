import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function UpdateAshtaVeerattaSthalams() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
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
    images: [],
    description: "",
    bestTimeToVisit: "",
    visitingHours: "",
    offerings: "",
    accommodation: "",
    nearbyPlaces: "",
    veerata: "",
    associatedStory: "",
    festivals: "",
    rituals: "",
  });

  useEffect(() => {
    const fetchAshtaVeerattaSthalams = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/places/AshtaVeerattaSthalam/${id}`
        );
        if (data?.success) {
          setData(data.data);
        } else {
          throw new Error("Failed to fetch Ashta Veeratta Sthalams details");
        }
      } catch (err) {
        alert(
          err.message ||
            "An error occurred while fetching Ashta Veeratta Sthalams details"
        );
      }
    };
    fetchAshtaVeerattaSthalams();
  }, [id]);

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
    const updatedFormData = { ...data };
    if (!updatedFormData.notes[index]) {
      updatedFormData.notes[index] = {};
    }
    updatedFormData.notes[index][noteType] = value;
    setData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredFormData = {
      ...data,
      notes: data.notes.filter((note) => note.key && note.value),
    };
    try {
      const response = await axios.put(
        `${apiUrl}/places/AshtaVeerattaSthalam/${id}`,
        filteredFormData
      );
      if (response.data.success) {
        alert("Ashta Veeratta Sthalams updated successfully!");
        navigate(`/place/ashta-veeratta-sthalams/${id}`);
      } else {
        throw new Error("Failed to update Ashta Veeratta Sthalams");
      }
    } catch (err) {
      alert(
        err.message ||
          "An error occurred while updating Ashta Veeratta Sthalams"
      );
    }
  };

  return (
    <>
      <div>
        <form id="add-profile-form" onSubmit={handleSubmit}>
          {" "}
          <h1>Update Ashta Veeratta Sthalams</h1>
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
            <label>Veerata:</label>
            <select
              required
              name="veerata"
              value={data.veerata}
              onChange={handleChange}
            >
              <option value="">Select Veerata</option>
              <option value="Bhima">Bhima</option>
              <option value="Panchapandava">Panchapandava</option>
              <option value="Arjuna">Arjuna</option>
              <option value="Nakula">Nakula</option>
              <option value="Sahadeva">Sahadeva</option>
              <option value="Dharmaraja">Dharmaraja</option>
              <option value="Draupadi">Draupadi</option>
              <option value="Karna">Karna</option>
            </select>
          </div>
          <div>
            <label>Associated Story:</label>
            <input
              type="text"
              name="associatedStory"
              value={data.associatedStory}
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
            <button
              type="button"
              onClick={() => {
                const updatedFormData = { ...data };
                updatedFormData.notes.push({ key: "", value: "" });
                setData(updatedFormData);
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
