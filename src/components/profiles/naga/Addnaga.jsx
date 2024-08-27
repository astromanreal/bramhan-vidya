import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import toast from "react-hot-toast";

export default function AddNaga() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    timeline: "",
    title: "",
    description: "",
    deity: "",
    powersAbility: "",
    knownWork: "",
    region: "",
    event: "",
    textualReference: "",
    weakness: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "naga",
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
        "https://bramhan-vidya-api.vercel.app/profiles/addnaga",
        filteredFormData
      );
      if (data?.success) {
        toast.success("Naga added successfully!");
        navigate("/profile/naga");
      } else {
        throw new Error("Failed to add Naga");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while adding the Naga");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        <h1>Add Naga</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>image:</label>
          <input
            type="text"
            name="image"
            placeholder="Public URL only"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Timeline:</label>
          <select
            required
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
          >
            <option value="">Select Timeline</option>
            <option value="Satyayuga">Satyayuga</option>
            <option value="Tretayuga">Tretayuga</option>
            <option value="Dvaparayuga">Dvaparayuga</option>
            <option value="Kaliyuga">Kaliyuga</option>
          </select>
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="commonly known as"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Short introduction"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Deity:</label>
          <input
            type="text"
            name="deity"
            placeholder="Deity associated with (if any)"
            value={formData.deity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Powers/Abilitie:</label>
          <input
            type="text"
            name="powersAbilities"
            placeholder="Special Ability or power"
            value={formData.powersAbility}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Known Work:</label>
          <input
            type="text"
            name="knownWorks"
            placeholder="Significant deed or story associated"
            value={formData.knownWork}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Known Region"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Event:</label>
          <input
            type="text"
            name="event"
            placeholder="Important event associated with the Naga"
            value={formData.event}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Textual Reference:</label>
          <input
            type="text"
            name="textualReference"
            placeholder="References in scripture or text"
            value={formData.textualReference}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weakness:</label>
          <input
            type="text"
            name="weakness"
            placeholder=" Any known weaknesses"
            value={formData.weakness}
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
            Add Note
          </button>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Naga"}
        </button>
      </form>
    </>
  );
}
