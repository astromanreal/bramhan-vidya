import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateMahabharat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    role: "",
    affiliation: "",
    family: "",
    skill: "",
    attribute: "",
    symbolism: "",
    associatedCharacter: "",
    festival: "",
    iconography: "",
    region: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchMahabharat = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/profiles/mahabharat/${id}`
        );
        if (data?.success) {
          setFormData(data.data);
          document.title = `Update  - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Mahabharat details");
        }
      } catch (err) {
        toast.error(
          err.message ||
            "An error occurred while fetching the Mahabharat details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMahabharat();
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
        `https://bramhan-vidya-api.vercel.app/profiles/mahabharat/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Mahabharat updated successfully!");
        navigate(`/profile/mahabharat/${id}`);
      } else {
        throw new Error("Failed to update Mahabharat");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while updating the Mahabharat"
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
        <h1>Update Mahabharat</h1>
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
            placeholder="short introduction"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="Warrior">Warrior</option>
            <option value="King">King</option>
            <option value="Sage">Sage</option>
            <option value="Guru">Guru</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label>House:</label>
          <select
            name="house"
            required
            value={formData.house}
            onChange={handleChange}
          >
            <option value="">Select House</option>
            <option value="Kaurava">Kaurava</option>
            <option value="Pandava">Pandava</option>
            <option value="Others">Others</option>
            <option value="No one">No one</option>
          </select>
        </div>
        <div>
          <label>Family:</label>
          <input
            type="text"
            name="family"
            placeholder=" Parents, spouse, children, etc."
            value={formData.family}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Skill:</label>
          <input
            type="text"
            name="skills"
            placeholder="Special skill or abilitie or power"
            value={formData.skill}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Attribute:</label>
          <input
            type="text"
            name="attribute"
            placeholder="Personality traits or characteristics"
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
          <label>Associated Character:</label>
          <input
            type="text"
            name="associatedCharacter"
            placeholder="Characters closely associated with this one"
            value={formData.associatedCharacter}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Festivals associated with the character"
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="Description of how the character is depicted in art"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Regions where the character is prominently revered"
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
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Mahabharat"}
        </button>
      </form>
    </>
  );
}
