import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateVanar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    iconography: "",
    roleInRamayana: "",
    ability: "",
    region: "",
    symbolism: "",
    worship: "",
    text: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchVanar = async () => {
      try {
        const response = await axios.get(`${apiUrl}/profiles/vanara/${id}`);
        if (response.data?.success) {
          setFormData(response.data.data);
        } else {
          throw new Error("Failed to fetch Vanar details");
        }
      } catch (error) {
        toast.error("Error fetching Vanar details!");
      }
    };
    fetchVanar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      const response = await axios.put(
        `${apiUrl}/profiles/vanara/${id}`,
        filteredFormData
      );
      if (response.data?.success) {
        toast.success("Vanar updated successfully!");
        navigate(`/profile/vanara/${id}`);
      } else {
        throw new Error("Failed to update Vanar");
      }
    } catch (error) {
      toast.error(error.message || "Error updating Vanar!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="add-profile-form">
        {" "}
        <h1>Update Vanar</h1>
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
            placeholder="Public link only"
            value={formData.image}
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
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder=" Description of how the avatar is depicted in art"
            value={formData.iconography}
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
          <label>Role in Ramayana:</label>
          <input
            type="text"
            name="roleInRamayana"
            placeholder="Description of their role or contribution in the Ramayana"
            value={formData.roleInRamayana}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ability:</label>
          <input
            type="text"
            name="ability"
            placeholder="Special ability"
            value={formData.ability}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Regios where they are believed to reside"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbolism:</label>
          <input
            type="text"
            name="symbolism"
            placeholder="Symbolic meaning or representation in Hinduism"
            value={formData.symbolism}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Worship:</label>
          <input
            type="text"
            name="worship"
            placeholder="How and where they are worshipped"
            value={formData.worship}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Text:</label>
          <input
            type="text"
            name="text"
            placeholder="Sacred text or scripture where Vanaras are mentioned"
            value={formData.text}
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
        <button type="submit">Update Vanar</button>
      </form>
    </>
  );
}
