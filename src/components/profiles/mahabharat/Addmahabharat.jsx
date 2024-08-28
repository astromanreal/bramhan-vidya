import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function AddMahabharata() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    role: "",
    house: "",
    family: "",
    skill: "",
    attribute: "",
    symbolism: "",
    associatedCharacter: "",
    festival: "",
    iconography: "",
    region: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "mahabharat",
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
        `${apiUrl}/profiles/addmahabharat`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Mahabharata created!");
        navigate("/profile/mahabharat");
      } else {
        throw new Error("Failed to add Mahabharata");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while adding Mahabharata");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Add Mahabharata</h1>
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
            placeholder="short introduction"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="Warrior">Warrior</option>
            <option value="King">King</option>
            <option value="Sage">Sage</option>
            <option value="Guru">Guru</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label>House:</label>
          <select
            name="house"
            required
            value={formData.house}
            onChange={handleChange}
          >
            <option value="">Select House</option>
            <option value="Kaurava">Kaurava</option>
            <option value="Pandava">Pandava</option>
            <option value="Others">Others</option>
            <option value="No one">No one</option>
          </select>
        </div>
        <div>
          <label>Family:</label>
          <input
            type="text"
            name="family"
            placeholder=" Parents, spouse, children, etc."
            value={formData.family}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Skill:</label>
          <input
            type="text"
            name="skills"
            placeholder="Special skill or abilitie or power"
            value={formData.skill}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Attribute:</label>
          <input
            type="text"
            name="attribute"
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
            placeholder="Symbolism or significance"
            value={formData.symbolism}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Character:</label>
          <input
            type="text"
            name="associatedCharacter"
            placeholder="Characters closely associated with this one"
            value={formData.associatedCharacter}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Festivals associated with the character"
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
            placeholder="Regions where the character is prominently revered"
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
          {loading ? "Adding..." : "Add Mahabharata"}
        </button>
      </form>
    </>
  );
}
