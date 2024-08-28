import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function AddGanesh() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    attribute: "",
    symbolism: "",
    associatedMantra: "",
    worship: "",
    festival: "",
    iconography: "",
    region: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "ganesha",
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
        `${apiUrl}/profiles/addganesha`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Ganesh created!");
        navigate("/profile/ganesha");
      } else {
        throw new Error("Failed to add Ganesh");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while adding Ganesh");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        <h1>Add Ganesh</h1>
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
          <textarea
            name="description"
            placeholder=" Description of the avatar"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Attribute:</label>
          <input
            type="text"
            name="attribute"
            placeholder="Attributes or characteristics"
            value={formData.attribute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbolism:</label>
          <input
            type="text"
            name="symbolism"
            placeholder="Symbolism or significance "
            value={formData.symbolism}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Mantra:</label>
          <input
            type="text"
            name="associatedMantra"
            placeholder="Mantras associated"
            value={formData.associatedMantra}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Worship:</label>
          <input
            type="text"
            name="worship"
            placeholder="How and where this avatar is worshipped"
            value={formData.worship}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Festival associated"
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="how the avatar is depicted in art"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="regions where the avatar is worshipped"
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
          {loading ? "Adding..." : "Add Ganesh"}
        </button>
      </form>
    </>
  );
}
