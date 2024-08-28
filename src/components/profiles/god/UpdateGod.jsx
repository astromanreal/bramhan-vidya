import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateGod() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    description: "",
    deityType: "",
    attribute: "",
    weapon: "",
    mount: "",
    symbol: "",
    associatedWith: "",
    associatedText: "",
    iconography: "",
    worshippedIn: "",
    festival: "",
    avatarOf: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchGod = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/god/${id}`);
        if (data?.success) {
          setFormData(data.data);
          document.title = `Update - ${data.data.name}`;
        } else {
          throw new Error("Failed to fetch god details");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching the god details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGod();
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
        `${apiUrl}/profiles/god/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("God updated successfully!");

        navigate(`/profile/god/${id}`);
      } else {
        throw new Error("Failed to update god");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while updating the god");
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
        <h1>Update God</h1>
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
        </div>{" "}
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="short description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Deity Type:</label>
          <select
            required
            name="deityType"
            value={formData.deityType}
            onChange={handleChange}
          >
            <option value="Major Deity">Major Deity</option>
            <option value="Minor Deity">Minor Deity</option>
            <option value="Avatara">Avatara</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label>Attribute:</label>
          <input
            type="text"
            name="attribute"
            placeholder="Attribute (if any)"
            value={formData.attribute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weapon:</label>
          <input
            type="text"
            name="weapon"
            placeholder="Weapon (if any)"
            value={formData.weapon}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mount:</label>
          <input
            type="text"
            name="mount"
            placeholder="mount (if any)"
            value={formData.mount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbol:</label>
          <input
            type="text"
            name="symbol"
            placeholder="symbol (if any)"
            value={formData.symbol}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated With:</label>
          <input
            type="text"
            name="associatedWith"
            placeholder="Elements, natural forces, etc"
            value={formData.associatedWith}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Text:</label>
          <input
            type="text"
            name="associatedText"
            placeholder="Main Text or scripture"
            value={formData.associatedText}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="how the deity is depicted"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Worshipped In:</label>
          <input
            type="text"
            name="worshippedIn"
            placeholder="Region or temple where the deity is primarily worshipped"
            value={formData.worshippedIn}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Main festival associated with the deity"
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Avatar Of:</label>
          <input
            type="text"
            name="avatarOf"
            placeholder="If the deity is an avatar of another deity"
            value={formData.avatarOf}
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
          {loading ? "Updating..." : "Update God"}
        </button>
      </form>
    </>
  );
}
