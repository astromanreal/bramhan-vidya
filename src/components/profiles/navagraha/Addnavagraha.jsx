import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import toast from "react-hot-toast";

export default function AddNavagraha() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    celestialBody: "",
    otherName: "",
    weapon: "",
    mantra: "",
    gemstone: "",
    color: "",
    day: "",
    mount: "",
    festival: "",
    temple: "",
    mother: "",
    father: "",
    notes: [{ key: "", value: "" }],
    path: "navagraha",
    userId: GetUserId(),
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
        "https://bramhan-vidya-api.vercel.app/profiles/addnavagraha",
        filteredFormData
      );
      if (data.success) {
        toast.success("Navagraha profile created successfully!");
        navigate("/profile/navagraha");
      } else {
        toast.error("Failed to create Navagraha profile.");
      }
    } catch (err) {
      toast.error("An error occurred while creating Navagraha profile.");
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Add and Manage Your Navagraha Index</h1>
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
          <label>Image:</label>
          <input
            type="text"
            name="image"
            placeholder="Public URL only"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Celestial Body:</label>
          <input
            type="text"
            name="celestialBody"
            placeholder="Planet, Moon, Sun, etc."
            value={formData.celestialBody}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Other Name:</label>
          <input
            type="text"
            name="otherName"
            value={formData.otherName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weapon:</label>
          <input
            type="text"
            name="weapon"
            value={formData.weapon}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mantra :</label>
          <input
            type="text"
            name="mantra"
            value={formData.mantra}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gemstone:</label>
          <input
            type="text"
            name="gemstone"
            value={formData.gemstone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Day:</label>
          <input
            type="text"
            name="day"
            value={formData.day}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mount:</label>
          <input
            type="text"
            name="mount"
            placeholder="Mount"
            value={formData.mount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festivals"
            placeholder="Main festival associated with"
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Temple:</label>
          <input
            type="text"
            name="temples"
            placeholder="Main or popular temple"
            value={formData.temple}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mother:</label>
          <input
            type="text"
            name="mother"
            value={formData.mother}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Father:</label>
          <input
            type="text"
            name="father"
            value={formData.father}
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
        <button type="submit">Add Navagraha</button>
      </form>
    </>
  );
}
