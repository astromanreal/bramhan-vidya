import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import toast from "react-hot-toast";

export default function Addrishi() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    class: "",
    timeline: "",
    title: "",
    description: "",
    deity: "",
    disciple: "",
    ancestry: "",
    quality: "",
    knownWork: "",
    region: "",
    children: "",
    placesOfWorship: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "rishi",
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
        "https://bramhan-vidya-api.vercel.app/profiles/addrishi",
        filteredFormData
      );
      if (data.success) {
        toast.success("Rishi profile created successfully!");
        navigate("/profile/rishi");
      } else {
        toast.error("Failed to create Rishi profile.");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while creating Rishi profile."
      );
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Add and Manage Your Rishi Index</h1>
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
          <label>Class:</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
          >
            <option value="">Select Class</option>
            {[
              "saptarishis",
              "brahmarishis",
              "rajrishis",
              "maharishis",
              "devarishis",
              "paramrishis",
              "kantharishis",
              "others",
            ].map((cls) => (
              <option value={cls}>{cls}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Timeline:</label>
          <select
            name="timeline"
            required
            value={formData.timeline}
            onChange={handleChange}
          >
            <option value="">Select Timeline</option>
            {["satyayuga", "tretayuga", "dvaparayuga", "kaliyuga"].map((tl) => (
              <option value={tl}>{tl}</option>
            ))}
          </select>
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
          <label>Deity:</label>
          <input
            type="text"
            name="deity"
            placeholder="Associated Deity (if any)"
            value={formData.deity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Disciple:</label>
          <input
            type="text"
            name="disciple"
            placeholder="Disciple (if any)"
            value={formData.disciple}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ancestry:</label>
          <input
            type="text"
            name="ancestry"
            placeholder="Parent information "
            value={formData.ancestry}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Quality:</label>
          <input
            type="text"
            name="quality"
            placeholder="Personality, traits, or quirks "
            value={formData.quality}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Known Work:</label>
          <input
            type="text"
            name="knownWork"
            placeholder="Known work or accomplishment "
            value={formData.knownWork}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Place of birth or work"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Children:</label>
          <input
            type="text"
            name="children"
            placeholder="Childerns information"
            value={formData.children}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Places of Worship:</label>
          <input
            type="text"
            name="placesOfWorship"
            placeholder="Main place (if any)"
            value={formData.placesOfWorship}
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
        <button type="submit">Add Rishi</button>
      </form>
    </>
  );
}
