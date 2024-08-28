import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import { toast } from "react-hot-toast";
import apiUrl from "../../utils/GetApiUrl";
import { useState } from "react";
import axios from "axios";

export default function AddCelestial() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
    userId: GetUserId(),
    path: "celestial",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
    setLoading(true);
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      const { data } = await axios.post(
        `${apiUrl}/profiles/addcelestial`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Celestial being added!");
        navigate("/profile/celestial");
      } else {
        throw new Error("Failed to add celestial being");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while adding the celestial being"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Add Celestial Being</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name or title"
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
            required
            placeholder="short introduction"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ability:</label>
          <input
            type="text"
            name="ability"
            placeholder="Special abilities or powers (comma separated)."
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
            placeholder="References to ancient texts or events (comma separated)."
            value={formData.reference}
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
          <button type="button" onClick={handleAddNote}>
            Add one more note
          </button>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Celestial Being"}
        </button>
      </form>
    </>
  );
}
