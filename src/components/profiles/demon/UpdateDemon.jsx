import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateDemon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    timeline: "",
    image: "",
    title: "",
    description: "",
    ancestry: "",
    powersAbility: "",
    knownWork: "",
    region: "",
    textualReference: "",
    weakness: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchDemon = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/demon/${id}`);
        if (data?.success) {
          setFormData(data.data);
        } else {
          throw new Error("Demon not found");
        }
      } catch (err) {
        toast.error(err.message || "Error fetching demon details");
      }
    };

    fetchDemon();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNotesChange = (index, noteType, value) => {
    const updatedFormData = { ...formData };
    if (!updatedFormData.notes[index]) {
      updatedFormData.notes[index] = {};
    }
    updatedFormData.notes[index][noteType] = value;
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      const { data } = await axios.put(
        `${apiUrl}/profiles/demon/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Demon updated successfully!");
        navigate(`/profile/demon/${id}`);
      } else {
        throw new Error("Failed to update demon");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while updating the demon");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="add-profile-form">
        {" "}
        <h1>Update Demon</h1>
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
            required
            name="class"
            value={formData.class}
            onChange={handleChange}
          >
            <option value="">Select Class</option>
            <option value="asura">Asura</option>
            <option value="rakshasa">Rakshasa</option>
            <option value="daitya">Daitya</option>
            <option value="pisacha">Pisacha</option>
            <option value="others">Others</option>
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
            <option value="satyayuga">Satyayuga</option>
            <option value="tretayuga">Tretayuga</option>
            <option value="dvaparayuga">Dvaparayuga</option>
            <option value="kaliyuga">Kaliyuga</option>
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
            placeholder="short introduction"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ancestry:</label>
          <input
            type="text"
            name="ancestry"
            placeholder="parents details"
            value={formData.ancestry}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Power and ability:</label>
          <input
            type="text"
            name="powersAbility"
            placeholder="unique ability"
            value={formData.powersAbility}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Known Work :</label>
          <input
            type="text"
            name="knownWork"
            placeholder="known  Battle"
            value={formData.knownWork}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region :</label>
          <input
            type="text"
            name="region"
            placeholder="Area of living"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Textual Reference:</label>
          <input
            type="text"
            name="textualReference"
            placeholder="Where is reference"
            value={formData.textualReference}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weakness :</label>
          <input
            type="text"
            name="weakness"
            placeholder="Known weakness (if any)"
            value={formData.weakness}
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
          <button
            type="button"
            onClick={() => {
              const updatedFormData = { ...formData };
              updatedFormData.notes.push({ key: "", value: "" });
              setFormData(updatedFormData);
            }}
          >
            Add Note
          </button>
        </div>
        <button type="submit">Update Demon</button>
      </form>
    </>
  );
}
