import { useNavigate } from "react-router-dom";
import GetUserId from "../utils/GetUserId";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    userId: GetUserId(),
    author: "",
    description: "",
    googleBookSrc: "",
    image: "",
    language: "",
    category: "",
    subcategory: "",
    type: "",
    keyDetails: [{ key: "", value: "" }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredFormData = {
      ...formData,
      keyDetails: formData.keyDetails.filter(
        (keyDetail) => keyDetail.key && keyDetail.value
      ),
    };
    toast.promise(axios.post(`${apiUrl}/books/addbook`, filteredFormData), {
      loading: "Saving book...",
      success: <b>Book added successfully!</b>,
      error: <b>Could not add book.</b>,
    });
    navigate("/book");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleKeyDetailsChange = (index, noteType, value) => {
    const updatedKeyDetails = [...formData.keyDetails];
    if (!updatedKeyDetails[index]) {
      updatedKeyDetails[index] = {};
    }
    updatedKeyDetails[index][noteType] = value;
    setFormData({ ...formData, keyDetails: updatedKeyDetails });
  };

  const handleAddKeyDetail = () => {
    setFormData({
      ...formData,
      keyDetails: [...formData.keyDetails, { key: "", value: "" }],
    });
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Add Book</h1>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Google Book Link:</label>
          <input
            type="url"
            name="googleBookSrc"
            value={formData.googleBookSrc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Language:</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Subcategory:</label>
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div id="profile-add-key-details">
          <h2>Key Details:</h2>
          {formData.keyDetails.map((keyDetail, index) => (
            <div key={index}>
              <input
                type="text"
                name={`keyDetails-${index}-key`}
                placeholder={`Key ${index + 1}`}
                value={keyDetail.key}
                onChange={(e) =>
                  handleKeyDetailsChange(index, "key", e.target.value)
                }
              />
              <textarea
                name={`keyDetails-${index}-value`}
                placeholder={`Value ${index + 1}`}
                value={keyDetail.value}
                onChange={(e) =>
                  handleKeyDetailsChange(index, "value", e.target.value)
                }
              />
            </div>
          ))}
          <button type="button" onClick={handleAddKeyDetail}>
            Add Key Detail
          </button>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </>
  );
}
