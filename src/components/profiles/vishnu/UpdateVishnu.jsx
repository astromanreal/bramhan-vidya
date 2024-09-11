import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateVishnu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    attribute: "",
    symbolism: "",
    worship: "",
    festival: "",
    iconography: "",
    region: "",

    purpose: "",
    vehicle: "",
    weapon: "",
    mantra: "",
    temple: "",
    reference: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchVishnu = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/vishnu/${id}`);
        if (data?.success) {
          setFormData(data.data);
        } else {
          throw new Error("Failed to fetch Vishnu Avatar details");
        }
      } catch (err) {
        toast.error(err.message || "Error while getting the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchVishnu();
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

  const handleUpdateVishnu = async (e) => {
    e.preventDefault();
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      const { data } = await axios.put(
        `${apiUrl}/profiles/vishnu/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Vishnu Avatar data updated successfully");
        navigate(`/profile/vishnu/${id}`, { replace: true });
      } else {
        throw new Error("Failed to update Vishnu Avatar details");
      }
    } catch (err) {
      toast.error(err.message || "Error while updating the data");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleUpdateVishnu} id="add-profile-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
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
          <label>Attribute:</label>
          <input
            type="text"
            name="attribute"
            placeholder="Attribute or characteristic"
            value={formData.attribute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbolism:</label>
          <input
            type="text"
            name="symbolism"
            placeholder=" Symbolism or significance of the avatar"
            value={formData.symbolism}
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
            placeholder="Festival associated with the avatar"
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

        <div>
          <label>Purpose:</label>
          <input
            type="text"
            name="purpose"
            placeholder="The purpose or reason for the avatar's incarnation"
            value={formData.purpose}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>vehicle:</label>
          <input
            type="text"
            name="vehicle"
            placeholder="avatar's vehicle or mount "
            value={formData.vehicle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>weapon:</label>
          <input
            type="text"
            name="weapon"
            placeholder="avatar's weapon or symbol"
            value={formData.weapon}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>mantra:</label>
          <input
            type="text"
            name="mantra"
            placeholder="sacred mantra associated with the avatar"
            value={formData.mantra}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>temple:</label>
          <input
            type="text"
            name="temple"
            placeholder="notable temple dedicated to the avatar "
            value={formData.temple}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Reference:</label>
          <input
            type="text"
            name="reference"
            placeholder="References where the avatar is mentioned"
            value={formData.reference}
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
        <button type="submit">Update Vishnu Avatar</button>
      </form>
    </>
  );
}
