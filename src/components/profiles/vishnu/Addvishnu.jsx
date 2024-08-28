import GetUserId from "../../utils/GetUserId";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function Addvishnu() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    attribute: "",
    symbolism: "",
    worship: "",
    festival: "",
    iconography: "",
    region: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "vishnu",
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
        `${apiUrl}/profiles/addvishnu`,
        filteredFormData
      );
      if (data.success) {
        toast.success("Vishnu Avatar profile created successfully!");
        navigate("/profile/vishnu");
      } else {
        toast.error("Failed to create Vishnu Avatar profile.");
      }
    } catch (err) {
      toast.error("An error occurred while creating Vishnu Avatar profile.");
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        <h1>Add and Manage Your Vishnu Avatar Index</h1>
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
            value={formData.image}
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
          <label>Attribute:</label>
          <input
            type="text"
            name="attribute"
            placeholder="Attribute or characteristic"
            value={formData.attribute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbolism:</label>
          <input
            type="text"
            name="symbolism"
            placeholder=" Symbolism or significance of the avatar"
            value={formData.symbolism}
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
            placeholder="Festival associated with the avatar"
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="Description of how the avatar is depicted in art"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Region where the avatar is prominently revered"
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
        <button type="submit">Add Vishnu Avatar</button>
      </form>
    </>
  );
}
