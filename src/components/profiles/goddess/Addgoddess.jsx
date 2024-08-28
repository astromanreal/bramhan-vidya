import { useNavigate } from "react-router-dom";
import GetUserId from "../../utils/GetUserId";
import apiUrl from "../../utils/GetApiUrl";
import { useState } from "react";
import axios from "axios";

export default function Addgoddess() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    domain: "",
    attribute: "",
    consort: "",
    temple: "",
    festival: "",
    region: "",
    sacredText: "",
    iconography: "",
    notes: [{ key: "", value: "" }],
    userId: GetUserId(),
    path: "goddess",
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
        `${apiUrl}/profiles/addgoddess`,
        filteredFormData
      );
      if (data?.success) {
        alert("Goddess added successfully!");
        navigate(`/profile/goddess/${data.data._id}`);
      } else {
        throw new Error("Failed to add goddess");
      }
    } catch (err) {
      alert(err.message || "An error occurred while adding the goddess");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Add Goddess</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
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
          <label>Domain:</label>
          <select
            required
            name="domain"
            value={formData.domain}
            onChange={handleChange}
          >
            <option value="">Select a domain</option>
            <option value="Knowledge">Knowledge</option>
            <option value="Wealth">Wealth</option>
            <option value="Power">Power</option>
            <option value="Fertility">Fertility</option>
            <option value="Love">Love</option>
            <option value="Justice">Justice</option>
            <option value="Protection">Protection</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label>Attribute:</label>
          <input
            type="text"
            name="attribute"
            placeholder="attribute or symbol associated with the goddess"
            value={formData.attribute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Consort:</label>
          <input
            type="text"
            name="consort"
            placeholder="The male counterpart or spouse (if any)"
            value={formData.consort}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Temple:</label>
          <input
            type="text"
            name="temple"
            placeholder="Main temple dedicated to her"
            value={formData.temple}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Main Festival celebrated in her honor"
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Region or geographical area"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sacred Text:</label>
          <input
            type="text"
            name="sacredText"
            placeholder="Text or scripture where she is mentioned"
            value={formData.sacredText}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Iconography :</label>
          <input
            type="text"
            name="iconography"
            placeholder="Description of her physical appearance and symbols in art"
            value={formData.iconography}
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
          {loading ? "Adding..." : "Add Goddess"}
        </button>
      </form>
    </>
  );
}
