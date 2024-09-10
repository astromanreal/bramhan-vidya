import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateChiranjivi() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    type: "",
    image: "",
    ability: "",
    iconography: "",
    mother: "",
    father: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchChiranjivi = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/chiranjivi/${id}`);
        if (data?.success) {
          setFormData(data.data);
          document.title = `Update  - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Chiranjivi details");
        }
      } catch (err) {
        toast.error(
          err.message ||
            "An error occurred while fetching the Chiranjivi details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChiranjivi();
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
        `${apiUrl}/profiles/chiranjivi/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Chiranjivi updated successfully!");
        navigate(`/profile/chiranjivi/${id}`);
      } else {
        throw new Error("Failed to update Chiranjivi");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while updating the Chiranjivi"
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
        <h1>Update Chiranjivi</h1>
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
          <label>Image:</label>
          <input
            type="text"
            name="image"
            placeholder="Public link only"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ability:</label>
          <input
            type="text"
            name="ability"
            placeholder="Poswer & ability"
            value={formData.ability}
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
            <option value="sage">Sage</option>
            <option value="king">King</option>
            <option value="god">God</option>
            <option value="warrior">Warrior</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="how the Chiranjivi is depicted"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mother:</label>
          <input
            type="text"
            name="mother"
            placeholder="Mother name"
            value={formData.mother}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Father:</label>
          <input
            type="text"
            name="father"
            placeholder="father name"
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
          {loading ? "Updating..." : "Update Chiranjivi"}
        </button>
      </form>
    </>
  );
}
