import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function AddCreature() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    image: "",
    title: "",
    description: "",
    associatedDeity: "",
    iconography: "",
    symbolicMeaning: "",
    mythologyReferences: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "creature",
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
        `${apiUrl}/profiles/addcreature`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Creature added successfully!");
        navigate("/profile/creature");
      } else {
        throw new Error("Failed to add creature");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while adding the creature");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        <h1>Add Creature</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>image:</label>
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
            placeholder="commonly known as"
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
            <option value="">Select Type</option>
            <option value="Vahana">Vahana</option>
            <option value="Animal">Animal</option>
            <option value="Bird">Bird</option>
            <option value="Serpent">Serpent</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Associated Deity:</label>
          <input
            type="text"
            name="associatedDeity"
            placeholder="Deity or god the creature is associated with"
            value={formData.associatedDeity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="significance of the creature"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="Key features or attribute"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbolic Meaning:</label>
          <input
            type="text"
            name="symbolicMeaning"
            placeholder="Symbolic meaning or significance "
            value={formData.symbolicMeaning}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mythology References :</label>
          <input
            type="text"
            name="mythologyReferences"
            placeholder=" texts or stories where the creature appears"
            value={formData.mythologyReferences}
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
          {loading ? "Adding..." : "Add Creature"}
        </button>
      </form>
    </>
  );
}
