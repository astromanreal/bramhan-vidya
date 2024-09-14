import { useNavigate, useParams } from "react-router-dom";
import apiUrl from "../../utils/GetApiUrl";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateShiva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    image: "",
    title: "",
    description: "",
    attribute: "",
    symbolism: "",
    associatedDeity: "",
    worship: "",
    festival: "",
    iconography: "",
    region: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchShiva = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/shiva/${id}`);
        if (data?.success) {
          setFormData(data.data);
        } else {
          throw new Error("Failed to fetch Shiva details");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching Shiva details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShiva();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
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

  const handleUpdateShiva = async (e) => {
    e.preventDefault();

    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      const { data } = await axios.put(
        `${apiUrl}/profiles/shiva/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Shiva profile updated successfully");
        navigate(`/profile/shiva/${id}`);
      } else {
        throw new Error("Failed to update Shiva profile");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while updating Shiva profile"
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleUpdateShiva} id="add-profile-form">
        <h1>Update Shiva Profile</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
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
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Choose one</option>
            <option value="Avatar">Avatars</option>
            <option value="Forms">Forms</option>
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
          <textarea
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
            placeholder="Attribute or characteristic "
            value={formData.attribute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbolism:</label>
          <input
            type="text"
            name="symbolism"
            placeholder="Symbolism or significance"
            value={formData.symbolism}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Deitiy:</label>
          <input
            type="text"
            name="associatedDeity"
            placeholder="Deity or figure associated with this avatar"
            value={formData.associatedDeity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Worship:</label>
          <input
            type="text"
            name="worship"
            placeholder="How and where this avatar is worshipped"
            value={formData.worship}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Festival associated"
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="Description of how the avatar is depicted in art"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Region where the avatar is prominently revered"
            value={formData.region}
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
        <button type="submit">Update Shiva</button>
      </form>
    </>
  );
}
