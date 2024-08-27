import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateRamayana() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    role: "",
    affiliation: "",
    family: "",
    skill: "",
    attribute: "",
    symbolism: "",
    associatedCharacter: "",
    worship: "",
    festival: "",
    iconography: "",
    region: "",
    notes: [{ key: "", value: "" }],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRamayana = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/profiles/ramayana/${id}`
        );
        if (data?.success) {
          setFormData(data.data);
          document.title = `Update Ramayana - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch Ramayana details");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching the Ramayana details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRamayana();
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
        `https://bramhan-vidya-api.vercel.app/profiles/ramayana/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Ramayana updated successfully!");
        navigate(`/profile/ramayana/${id}`);
      } else {
        throw new Error("Failed to update Ramayana");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while updating the Ramayana"
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
        <h1>Update Ramayana</h1>
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
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            {["Prince", "King", "Sage", "Demon", "Vanara", "Others"].map(
              (role) => (
                <option value={role}>{role}</option>
              )
            )}
          </select>
        </div>
        <div>
          <label>Affiliation:</label>
          <input
            type="text"
            name="affiliation"
            placeholder="Ayodhya, Lanka, Vanaras, etc."
            value={formData.affiliation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Family:</label>
          <input
            type="text"
            name="family"
            placeholder="Parents, spouse, children, etc."
            value={formData.family}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Skill:</label>
          <input
            type="text"
            name="skills"
            placeholder="Special skill or ability"
            value={formData.skill}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Attributes:</label>
          <input
            type="text"
            name="attributes"
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
            placeholder="Symbolism or significance of the character"
            value={formData.symbolism}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Characters:</label>
          <input
            type="text"
            name="associatedCharacter"
            placeholder="Characters closely associated with this one"
            value={formData.associatedCharacter}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Worship:</label>
          <input
            type="text"
            name="worship"
            placeholder="How and where this character is revered"
            value={formData.worship}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Festival associated with the character"
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
            placeholder="Region where the character is prominently revered"
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
          {loading ? "Updating..." : "Update Ramayana"}
        </button>
      </form>
    </>
  );
}
