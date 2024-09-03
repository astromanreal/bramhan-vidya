import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateDurga() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    day: "",
    otherNames: "",
    attribute: "",
    weapons: "",
    mount: "",
    iconography: "",
    symbolism: "",
    associatedLegend: "",
    mantra: "",
    worshipPractice: "",
    benefit: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchDurga = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/navdurga/${id}`);
        if (data?.success) {
          setFormData(data.data);
        } else {
          throw new Error("Failed to fetch Durga details");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching Durga details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDurga();
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

  const handleUpdateDurga = async (e) => {
    e.preventDefault();

    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };
    try {
      const { data } = await axios.put(
        `${apiUrl}/profiles/navdurga/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Durga data updated successfully");
        navigate(`/profile/durga/${id}`);
      } else {
        throw new Error("Failed to update Durga details");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while updating Durga data");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleUpdateDurga} id="add-profile-form">
        {" "}
        <h1>Update Durga Data</h1>
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
          <textarea
            name="description"
            placeholder="Short introduction"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Day:</label>
          <input
            type="number"
            name="day"
            placeholder="The day of Navaratri associated with this form"
            value={formData.day}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Other Names:</label>
          <input
            type="text"
            name="otherNames"
            placeholder="nick name"
            value={formData.otherNames}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Attribute:</label>
          <input
            type="text"
            name="attribute"
            value={formData.attribute}
            onChange={handleChange}
            placeholder="Key attribute or characteristic"
          />
        </div>
        <div>
          <label>weapons:</label>
          <input
            type="text"
            name="weapons"
            value={formData.weapons}
            onChange={handleChange}
            placeholder="weapons if any"
          />
        </div>{" "}
        <div>
          <label>Mount:</label>
          <input
            type="text"
            name="mount"
            value={formData.mount}
            onChange={handleChange}
            placeholder="mount if any"
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="Description of how the form is depicted"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbolism:</label>
          <input
            type="text"
            name="symbolism"
            placeholder="Symbolic meanings and representations"
            value={formData.symbolism}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Legend:</label>
          <input
            type="text"
            name="associatedLegend"
            value={formData.associatedLegend}
            onChange={handleChange}
            placeholder="Legend associated with the form"
          />
        </div>
        <div>
          <label>Mantra:</label>
          <input
            type="text"
            name="mantra"
            value={formData.mantra}
            onChange={handleChange}
            placeholder="Sacred mantra dedicated to the form"
          />
        </div>
        <div>
          <label>Worship Practice:</label>
          <input
            type="text"
            name="worshipPractice"
            value={formData.worshipPractice}
            onChange={handleChange}
            placeholder="Ritual and practice for worshipping this form"
          />
        </div>
        <div>
          <label>Benefit:</label>
          <input
            type="text"
            name="benefit"
            value={formData.benefit}
            onChange={handleChange}
            placeholder="Spiritual or material benefit of worship"
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
        <button type="submit">Update Durga</button>
      </form>
    </>
  );
}
