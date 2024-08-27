import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import toast from "react-hot-toast";

export default function AddModern() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    teaching: "",
    notableWork: "",
    region: "",
    organizations: "",
    disciple: "",
    significantEvent: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "modern",
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
        "https://bramhan-vidya-api.vercel.app/profiles/addmodern",
        filteredFormData
      );
      if (data?.success) {
        toast.success("Modern character added successfully!");
        navigate("/profile/modern");
      } else {
        throw new Error("Failed to add modern character");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while adding the modern character"
      );
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        <h1>Add Modern Character</h1>
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
          <label>Teaching:</label>
          <input
            type="text"
            name="teaching"
            placeholder="Important teaching or philosophy"
            value={formData.teaching}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notable Work:</label>
          <input
            type="text"
            name="notableWork"
            placeholder="Book, speech, or any other significant work"
            value={formData.notableWork}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Place where they were born or worked"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Organization:</label>
          <input
            type="text"
            name="organization"
            placeholder="Organization or ashram founded or associated with"
            value={formData.organizations}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Disciple:</label>
          <input
            type="text"
            name="disciples"
            placeholder="Notable disciple or follower"
            value={formData.disciple}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Significant Event:</label>
          <input
            type="text"
            name="significantEvent"
            placeholder="Major event associated with their life"
            value={formData.significantEvent}
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
        <button type="submit">Add Modern Character</button>
      </form>
    </>
  );
}
