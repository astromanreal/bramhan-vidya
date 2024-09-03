import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function Adddurga() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    day: "",
    otherNames: "",
    attribute: "",
    weapons: "",
    mount: "",
    iconography: "",
    symbolism: "",
    associatedLegend: "",
    mantra: "",
    worshipPractice: "",
    benefit: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "durga",
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
        `${apiUrl}/profiles/addnavdurga`,
        filteredFormData
      );
      if (data.success) {
        toast.success("Durga profile created successfully!");
        navigate("/profile/durga");
      } else {
        toast.error("Failed to create Durga profile.");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while creating Durga profile."
      );
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        <h1>Add and Manage Your Nava Durga Index</h1>
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
            placeholder="Short introduction"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Day:</label>
          <input
            type="number"
            name="day"
            placeholder="The day of Navaratri associated with this form"
            value={formData.day}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Other Names:</label>
          <input
            type="text"
            name="otherNames"
            placeholder="nick name"
            value={formData.otherNames}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Attribute:</label>
          <input
            type="text"
            name="attribute"
            value={formData.attribute}
            onChange={handleChange}
            placeholder="Key attribute or characteristic"
          />
        </div>
        <div>
          <label>weapons:</label>
          <input
            type="text"
            name="weapons"
            value={formData.weapons}
            onChange={handleChange}
            placeholder="weapons if any"
          />
        </div>
        <div>
          <label>Mount:</label>
          <input
            type="text"
            name="mount"
            value={formData.mount}
            onChange={handleChange}
            placeholder="mount if any"
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="Description of how the form is depicted"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbolism:</label>
          <input
            type="text"
            name="symbolism"
            placeholder="Symbolic meanings and representations"
            value={formData.symbolism}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Legend:</label>
          <input
            type="text"
            name="associatedLegend"
            value={formData.associatedLegend}
            onChange={handleChange}
            placeholder="Legend associated with the form"
          />
        </div>
        <div>
          <label>Mantra:</label>
          <input
            type="text"
            name="mantra"
            value={formData.mantra}
            onChange={handleChange}
            placeholder="Sacred mantra dedicated to the form"
          />
        </div>
        <div>
          <label>Worship Practice:</label>
          <input
            type="text"
            name="worshipPractice"
            value={formData.worshipPractice}
            onChange={handleChange}
            placeholder="Ritual and practice for worshipping this form"
          />
        </div>
        <div>
          <label>Benefit:</label>
          <input
            type="text"
            name="benefit"
            value={formData.benefit}
            onChange={handleChange}
            placeholder="Spiritual or material benefit of worship"
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
        <button type="submit">Add Durga</button>
      </form>
    </>
  );
}
