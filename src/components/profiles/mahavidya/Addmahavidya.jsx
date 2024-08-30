import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function AddMahavidya() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    attribute: "",
    iconography: "",
    symbolism: "",
    associatedDeitie: "",
    mantra: "",
    worshipPractice: "",
    benefit: "",
    festival: "",
    region: "",
    otherNames: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "mahavidya",
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
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      const { data } = await axios.post(
        `${apiUrl}/profiles/addmahavidya`,
        filteredFormData
      );
      if (data.success) {
        toast.success("Mahavidya profile created successfully!");
        navigate("/profile/mahavidya");
      } else {
        toast.error("Failed to create Mahavidya profile.");
      }
    } catch (err) {
      toast.error("An error occurred while creating Mahavidya profile.");
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Add and Manage Your Mahavidya Index</h1>
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
            placeholder="Key attributes or characteristics"
            value={formData.attribute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="Description of how the Mahavidya is depicted"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbolism:</label>
          <input
            type="text"
            name="symbolism"
            placeholder=" Symbolic meanings and representations"
            value={formData.symbolism}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Deitie:</label>
          <input
            type="text"
            name="associatedDeitie"
            placeholder="Other deities they are associated with"
            value={formData.associatedDeitie}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mantra:</label>
          <input
            type="text"
            name="mantra"
            placeholder="Sacred mantra dedicated to the Mahavidya"
            value={formData.mantra}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Worship Practice:</label>
          <input
            type="text"
            name="worshipPractice"
            placeholder="Ritual and practice for worshipping"
            value={formData.worshipPractice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Benefit:</label>
          <input
            type="text"
            name="benefit"
            placeholder="Spiritual or material benefit of worship"
            value={formData.benefit}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Festival dedicated to the Mahavidya"
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region :</label>
          <input
            type="text"
            name="region"
            placeholder="Region where the Mahavidya is prominently worshipped"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Other Names :</label>
          <input
            type="text"
            name="otherNames"
            placeholder="Any nick names"
            value={formData.otherNames}
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
        <button type="submit">Add Mahavidya</button>
      </form>
    </>
  );
}
