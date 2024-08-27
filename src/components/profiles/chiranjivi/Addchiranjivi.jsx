import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import toast from "react-hot-toast";

export default function Addchiranjivi() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    image: "",
    type: "",
    ability: "",
    iconography: "",
    worshippedIn: "",
    festival: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "chiranjivi",
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
        "https://bramhan-vidya-api.vercel.app/profiles/addchiranjivi",
        filteredFormData
      );
      if (data?.success) {
        toast.success("Chiranjivi created!");
        navigate("/profile/chiranjivi");
      } else {
        throw new Error("Failed to add Chiranjivi");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while adding the Chiranjivi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        <h1>Add Chiranjivi</h1>
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
          <textarea
            name="description"
            placeholder="Short introduction"
            value={formData.description}
            onChange={handleChange}
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
          <label>Abilty:</label>
          <input
            type="text"
            name="ability"
            placeholder="Poswer & ability"
            value={formData.ability}
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
            <option value="sage">Sage</option>
            <option value="king">King</option>
            <option value="god">God</option>
            <option value="warrior">Warrior</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="how the Chiranjivi is depicted"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Worshipped In:</label>
          <input
            type="text"
            name="worshippedIn"
            placeholder="Regions or temples where worshipped"
            value={formData.worshippedIn}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Major festival associated with"
            value={formData.festival}
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
          {loading ? "Adding..." : "Add Chiranjivi"}
        </button>
      </form>
    </>
  );
}
