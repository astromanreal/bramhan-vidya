import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateCreature() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    image: "",
    title: "",
    associatedDeity: "",
    description: "",
    feature: "",
    symbolicMeaning: "",
    mythologyReferences: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchCreatureDetails = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/creature/${id}`);
        if (data?.success) {
          setFormData(data.data);
          document.title = `Update Creature - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch creature details");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching the creature details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCreatureDetails();
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
        `${apiUrl}/profiles/creature/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Creature updated successfully!");
        navigate(`/profile/creature/${id}`);
      } else {
        throw new Error("Failed to update creature");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while updating the creature"
      );
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
        <h1>Update Creature</h1>
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
          <label>Type:</label>
          <select
            required
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Vahana">Vahana</option>
            <option value="Animal">Animal</option>
            <option value="Bird">Bird</option>
            <option value="Serpent">Serpent</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Associated Deity:</label>
          <input
            type="text"
            name="associatedDeity"
            placeholder="Deity or god the creature is associated with"
            value={formData.associatedDeity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="significance of the creature"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Feature :</label>
          <input
            type="text"
            name="feature"
            placeholder="Key feature or attribute"
            value={formData.feature}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbolic Meaning:</label>
          <input
            type="text"
            name="symbolicMeaning"
            placeholder="Symbolic meaning or significance "
            value={formData.symbolicMeaning}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mythology References :</label>
          <input
            type="text"
            name="mythologyReferences"
            placeholder=" texts or stories where the creature appears"
            value={formData.mythologyReferences}
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
            Add one more Note
          </button>
        </div>
        <button type="submit">Update Creature</button>
      </form>
    </>
  );
}
