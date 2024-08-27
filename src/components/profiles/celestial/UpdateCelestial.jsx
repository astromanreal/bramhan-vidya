import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import GetUserId from "./../../utils/GetUserId";

export default function UpdateCelestial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    type: "",
    domain: "",
    role: "",
    description: "",
    ability: "",
    appearance: "",
    reference: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchCelestial = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/profiles/celestial/${id}`
        );
        if (data?.success) {
          setFormData(data.data);
        } else {
          throw new Error("Failed to fetch celestial data");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching the celestial data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCelestial();
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
    setLoading(true);
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
      userId: GetUserId(),
    };

    try {
      const { data } = await axios.put(
        `https://bramhan-vidya-api.vercel.app/profiles/celestial/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Celestial being updated!");
        navigate(`/profile/celestial/${id}`);
      } else {
        throw new Error("Failed to update celestial being");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while updating the celestial being"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} id="add-profile-form">
        <h1>Update Celestial Being</h1>
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
            placeholder="Public link only"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="commnly known as"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <select
            required
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select
            </option>
            {["Apsara", "Gandharva", "Yaksha", "Kinnara", "Others"].map(
              (option) => (
                <option value={option}>{option}</option>
              )
            )}
          </select>
        </div>
        <div>
          <label>Domain:</label>
          <select
            required
            name="domain"
            value={formData.domain}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select
            </option>
            {["Heavenly", "Nature", "Spiritual", "Others"].map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            placeholder="Role or function"
            value={formData.role}
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
          <label>Ability:</label>
          <input
            type="text"
            name="ability"
            placeholder="Special abilities or powers (comma-separated)"
            value={formData.ability}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Appearance:</label>
          <input
            type="text"
            name="appearance"
            placeholder="Physical appearance"
            value={formData.appearance}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Reference:</label>
          <input
            type="text"
            name="reference"
            placeholder="References to ancient texts or events (comma-separated)"
            value={formData.reference}
            onChange={handleChange}
          />
        </div>

        <hr />
        <div id="profile-add-notes">
          <h2>Notes:</h2>
          {formData.notes.map((note, index) => (
            <div key={index}>
              <label>Key:</label>
              <input
                type="text"
                name={`notes-${index}-key`}
                placeholder={`key ${index + 1}`}
                value={note.key}
                onChange={(e) =>
                  handleNotesChange(index, "key", e.target.value)
                }
              />
              <label>Value:</label>
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
            Add one more note
          </button>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Celestial Being"}
        </button>
      </form>
    </>
  );
}
