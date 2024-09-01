import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateNavagraha() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
  });

  useEffect(() => {
    const fetchNavagraha = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/navagraha/${id}`);
        if (data?.success) {
          setFormData(data.data);
        } else {
          throw new Error("Failed to fetch Navagraha details");
        }
      } catch (err) {
        toast.error(err.message || "Failed to fetched the data");
      } finally {
        setLoading(false);
      }
    };

    fetchNavagraha();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNotesChange = (index, noteType, value) => {
    const updatedFormData = { ...formData };
    if (!updatedFormData.notes) {
      updatedFormData.notes = [];
    }
    if (!updatedFormData.notes[index]) {
      updatedFormData.notes[index] = {};
    }
    updatedFormData.notes[index][noteType] = value;
    setFormData(updatedFormData);
  };

  const handleUpdateNavagraha = async (e) => {
    e.preventDefault();
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      const { data } = await axios.put(
        `${apiUrl}/profiles/navagraha/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Navagraha data updated successfully");
        navigate(`/profile/navagraha/${id}`);
      } else {
        throw new Error("Failed to update Navagraha details");
      }
    } catch (err) {
      toast.error(err.message || "Fail to update the data");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleUpdateNavagraha} id="add-profile-form">
        <h1>Update Navagraha Data</h1>
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
            name="festival"
            placeholder="Main festival associated with"
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Temple:</label>
          <input
            type="text"
            name="temple"
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
          <button
            type="button"
            onClick={() => {
              const updatedFormData = { ...formData };
              updatedFormData.notes = [
                ...(updatedFormData.notes || []),
                { key: "", value: "" },
              ];
              setFormData(updatedFormData);
            }}
          >
            Add Note
          </button>
        </div>
        <button type="submit">Update Navagra</button>
      </form>
    </>
  );
}
