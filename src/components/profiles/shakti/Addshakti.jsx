import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function Addshakti() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    attribute: "",
    weapon: "",
    temple: "",
    festival: "",
    iconography: "",
    region: "",
    sacredText: "",
    consort: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "shakti",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      const { data } = await axios.post(
        `${apiUrl}/profiles/addshakti`,
        filteredFormData
      );
      if (data.success) {
        toast.success("Shakti profile created successfully!");
        navigate("/profile/shakti");
      } else {
        toast.error("Failed to create Shakti profile.");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while creating Shakti profile."
      );
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        <h1>Add and Manage Your Shakti Index</h1>
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
            placeholder="Commonly known as"
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
          <label>Attribute:</label>
          <input
            type="text"
            name="attribute"
            placeholder="Symbol or attribute"
            value={formData.attribute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weapon:</label>
          <input
            type="text"
            name="weapon"
            placeholder="Weapons (if any)"
            value={formData.weapon}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Temple:</label>
          <input
            type="text"
            name="temple"
            placeholder="Main temple"
            value={formData.temple}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Major festivals like Navratri."
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="Description of her depiction in art."
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Region where she is predominantly worshipped."
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sacred Text:</label>
          <input
            type="text"
            name="sacredText"
            placeholder="Text or scripture mentioning Shakti."
            value={formData.sacredText}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Consort:</label>
          <input
            type="text"
            name="consort"
            placeholder=" Consort or associated deity (if any)"
            value={formData.consort}
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
        <button type="submit">Add Shakti</button>
      </form>
    </>
  );
}
