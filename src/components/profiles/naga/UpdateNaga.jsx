import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateNaga() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    timeline: "",
    title: "",
    description: "",
    deity: "",
    powersAbility: "",
    knownWork: "",
    region: "",
    event: "",
    textualReference: "",
    weakness: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchNagaDetails = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/naga/${id}`);
        if (data?.success) {
          setFormData(data.data);
          document.title = `Update - ${data.data.name} Naga`;
        } else {
          throw new Error("Failed to fetch Naga details");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching Naga details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNagaDetails();
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
    setLoading(true);

    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };

    try {
      const { data } = await axios.put(
        `${apiUrl}/profiles/naga/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Naga updated successfully!");
        navigate(`/profile/naga/${id}`);
      } else {
        throw new Error("Failed to update Naga");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while updating the Naga");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} id="add-profile-form">
        {" "}
        <h1>Update Naga</h1>
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
          <label>Timeline:</label>
          <select
            required
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
          >
            <option value="">Select Timeline</option>
            <option value="Satyayuga">Satyayuga</option>
            <option value="Tretayuga">Tretayuga</option>
            <option value="Dvaparayuga">Dvaparayuga</option>
            <option value="Kaliyuga">Kaliyuga</option>
          </select>
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
          <label>Deity:</label>
          <input
            type="text"
            name="deity"
            placeholder="Deity associated iwth (if any)"
            value={formData.deity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Powers/Abilitie:</label>
          <input
            type="text"
            name="powersAbilities"
            placeholder="Special Ability or power"
            value={formData.powersAbility}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Known Work:</label>
          <input
            type="text"
            name="knownWorks"
            placeholder="Significant deed or story associated"
            value={formData.knownWork}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Known Region"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Event:</label>
          <input
            type="text"
            name="event"
            placeholder="Important event associated with the Naga"
            value={formData.event}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Textual Reference:</label>
          <input
            type="text"
            name="textualReference"
            placeholder="References in scripture or text"
            value={formData.textualReference}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weakness:</label>
          <input
            type="text"
            name="weakness"
            placeholder=" Any known weaknesses"
            value={formData.weakness}
            onChange={handleChange}
          />
        </div>
        <hr />{" "}
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
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Naga"}
        </button>
      </form>
    </>
  );
}
