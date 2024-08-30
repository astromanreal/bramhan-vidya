import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateMahavidya() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    attribute: "",
    iconography: "",
    symbolism: "",
    associatedDeitie: "",
    mantra: "",
    worshipPractice: "",
    benefit: "",
    festival: "",
    region: "",
    otherNames: "",
    notes: [{ key: "", value: "" }],
  });

  useEffect(() => {
    const fetchMahavidya = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/mahavidya/${id}`);
        if (data?.success) {
          setFormData(data.data);
        } else {
          throw new Error("Failed to fetch Mahavidya details");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching Mahavidya details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMahavidya();
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

  const handleUpdateMahavidya = async (e) => {
    e.preventDefault();
    const filteredFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.key && note.value),
    };

    try {
      const { data } = await axios.put(
        `${apiUrl}/profiles/mahavidya/${id}`,
        filteredFormData
      );
      if (data?.success) {
        toast.success("Mahavidya data updated successfully");
        navigate(`/profile/mahavidya/${id}`);
      } else {
        throw new Error("Failed to update Mahavidya details");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while updating Mahavidya details"
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleUpdateMahavidya} id="add-profile-form">
        {" "}
        <h1>Update Mahavidya Data</h1>
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
            placeholder="Key attributes or characteristics"
            value={formData.attribute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Iconography:</label>
          <input
            type="text"
            name="iconography"
            placeholder="Description of how the Mahavidya is depicted"
            value={formData.iconography}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Symbolism:</label>
          <input
            type="text"
            name="symbolism"
            placeholder=" Symbolic meanings and representations"
            value={formData.symbolism}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Associated Deitie:</label>
          <input
            type="text"
            name="associatedDeitie"
            placeholder="Other deities they are associated with"
            value={formData.associatedDeitie}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mantra:</label>
          <input
            type="text"
            name="mantra"
            placeholder="Sacred mantra dedicated to the Mahavidya"
            value={formData.mantra}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Worship Practice:</label>
          <input
            type="text"
            name="worshipPractice"
            placeholder="Ritual and practice for worshipping"
            value={formData.worshipPractice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Benefit:</label>
          <input
            type="text"
            name="benefit"
            placeholder="Spiritual or material benefit of worship"
            value={formData.benefit}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Festival:</label>
          <input
            type="text"
            name="festival"
            placeholder="Festival dedicated to the Mahavidya"
            value={formData.festival}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region :</label>
          <input
            type="text"
            name="region"
            placeholder="Region where the Mahavidya is prominently worshipped"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Other Names :</label>
          <input
            type="text"
            name="otherNames"
            placeholder="Any nick names"
            value={formData.otherNames}
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
        <button type="submit">Update Mahavidya</button>
      </form>
    </>
  );
}
