import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import toast from "react-hot-toast";

export default function AddRamayana() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    role: "",
    affiliation: "",
    family: "",
    skill: "",
    attribute: "",
    symbolism: "",
    associatedCharacter: "",
    worship: "",
    festival: "",
    iconography: "",
    region: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "ramayana",
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
        "https://bramhan-vidya-api.vercel.app/profiles/addramayana",
        filteredFormData
      );
      if (data?.success) {
        toast.success("Ramayana charecter created!");
        navigate("/profile/ramayana");
      } else {
        throw new Error("Failed to add Ramayana");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while adding Ramayana");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        <h1>Add Ramayana</h1>
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
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            {["Prince", "King", "Sage", "Demon", "Vanara", "Others"].map(
              (role) => (
                <option value={role}>{role}</option>
              )
            )}
          </select>
        </div>
        <div>
          <label>Affiliation:</label>
          <input
            type="text"
            name="affiliation"
            placeholder="Ayodhya, Lanka, Vanaras, etc."
            value={formData.affiliation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Family:</label>
          <input
            type="text"
            name="family"
            placeholder="Parents, spouse, children, etc."
            value={formData.family}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Skill:</label>
          <input
            type="text"
            name="skills"
            placeholder="Special skill or ability"
            value={formData.skill}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Attributes:</label>
          <input
            type="text"
            name="attributes"
            placeholder="Personality traits or characteristics"
            value={formData.attribute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbolism:</label>
          <input
            type="text"
            name="symbolism"
            placeholder="Symbolism or significance of the character"
            value={formData.symbolism}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Characters:</label>
          <input
            type="text"
            name="associatedCharacter"
            placeholder="Characters closely associated with this one"
            value={formData.associatedCharacter}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Worship:</label>
          <input
            type="text"
            name="worship"
            placeholder="How and where this character is revered"
            value={formData.worship}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Festival associated with the character"
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="Description of how the character is depicted in art"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Region where the character is prominently revered"
            value={formData.region}
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
          {loading ? "Adding..." : "Add Ramayana"}
        </button>
      </form>
    </>
  );
}
