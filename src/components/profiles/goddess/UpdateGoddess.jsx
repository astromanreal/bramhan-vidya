import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateGoddess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    domain: "",
    attribute: "",
    consort: "",
    temple: "",
    festival: "",
    region: "",
    sacredText: "",
    iconography: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchGoddessDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/profiles/goddess/${id}`
        );
        if (data?.success) {
          setFormData(data.data);
          document.title = `Update - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch goddess details");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching goddess details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGoddessDetails();
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
        `https://bramhan-vidya-api.vercel.app/profiles/goddess/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Goddess updated successfully!");
        navigate(`/profile/goddess/${id}`);
      } else {
        throw new Error("Failed to update goddess");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while updating the goddess"
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
      <form id="add-profile-form" onSubmit={handleSubmit}>
        <h1>Update Goddess</h1>
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
          <label>Domain:</label>
          <select
            required
            name="domain"
            value={formData.domain}
            onChange={handleChange}
          >
            <option value="">Select a domain</option>
            <option value="Knowledge">Knowledge</option>
            <option value="Wealth">Wealth</option>
            <option value="Power">Power</option>
            <option value="Fertility">Fertility</option>
            <option value="Love">Love</option>
            <option value="Justice">Justice</option>
            <option value="Protection">Protection</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label>Attribute:</label>
          <input
            type="text"
            name="attribute"
            placeholder="attribute or symbol associated with the goddess"
            value={formData.attribute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Consort:</label>
          <input
            type="text"
            name="consort"
            placeholder="The male counterpart or spouse (if any)"
            value={formData.consort}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Temple:</label>
          <input
            type="text"
            name="temple"
            placeholder="Main temple dedicated to her"
            value={formData.temple}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Main Festival celebrated in her honor"
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            placeholder="Region or geographical area"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sacred Text:</label>
          <input
            type="text"
            name="sacredText"
            placeholder="Text or scripture where she is mentioned"
            value={formData.sacredText}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Iconography :</label>
          <input
            type="text"
            name="iconography"
            placeholder="Description of her physical appearance and symbols in art"
            value={formData.iconography}
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
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Goddess"}
        </button>
      </form>
    </>
  );
}
