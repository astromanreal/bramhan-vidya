import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateShakti() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    attribute: "",
    weapon: "",
    temple: "",
    festival: "",
    iconography: "",
    region: "",
    sacredText: "",
    consort: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchShakti = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/shakti/${id}`);
        if (data?.success) {
          setFormData(data.data);
        } else {
          throw new Error("Failed to fetch Shakti details");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching Shakti details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShakti();
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
    if (!updatedFormData.notes[index]) {
      updatedFormData.notes[index] = {};
    }
    updatedFormData.notes[index][noteType] = value;
    setFormData(updatedFormData);
  };

  const handleUpdateShakti = async (e) => {
    e.preventDefault();
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      const { data } = await axios.put(
        `${apiUrl}/profiles/shakti/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Shakti data updated successfully");
        navigate(`/profile/shakti/${id}`, { replace: true });
      } else {
        throw new Error("Failed to update Shakti details");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while updating Shakti details."
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleUpdateShakti} id="add-profile-form">
        {" "}
        <h1>Update Shakti Data</h1>
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
          <label>Attribute:</label>
          <input
            type="text"
            name="attribute"
            placeholder="Symbol or attribute"
            value={formData.attribute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weapon:</label>
          <input
            type="text"
            name="weapon"
            placeholder="Weapons (if any)"
            value={formData.weapon}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Temple:</label>
          <input
            type="text"
            name="temple"
            placeholder="Main temple"
            value={formData.temple}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Major festivals like Navratri."
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="Description of her depiction in art."
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Region where she is predominantly worshipped."
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sacred Text:</label>
          <input
            type="text"
            name="sacredTexts"
            placeholder="Text or scripture mentioning Shakti."
            value={formData.sacredText}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Consort:</label>
          <input
            type="text"
            name="consort"
            placeholder=" Consort or associated deity (if any)"
            value={formData.consort}
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
        <button type="submit">Update Shakti</button>
      </form>
    </>
  );
}
