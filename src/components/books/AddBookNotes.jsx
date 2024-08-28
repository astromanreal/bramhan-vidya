import { useNavigate, useParams } from "react-router-dom";
import GetUserId from "../utils/GetUserId";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function AddBookNotes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: [""],
    likes: {
      count: 0,
      users: [],
    },
    comments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      const index = e.target.dataset.index;
      setFormData((prevFormData) => ({
        ...prevFormData,
        description: prevFormData.description.map((desc, i) =>
          i === parseInt(index) ? value : desc
        ),
      }));
    }
  };

  const addDescription = () => {
    if (formData.description.length < 3) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        description: [...prevFormData.description, ""],
      }));
    } else {
      toast.error("You can't add more than 3 descriptions");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Title is required");
    } else if (formData.description.every((desc) => desc.trim() === "")) {
      toast.error("Description is required");
    } else {
      const data = {
        notes: {
          title: formData.title,
          description: formData.description,
          likes: formData.likes,
          comments: formData.comments,
        },
        bookId: id,
        userId: GetUserId(),
      };
      try {
        await axios.post(`${apiUrl}/books/${id}/addnotes`, data);
        toast.success("Data added");
        navigate(`/book/${id}`);
      } catch (error) {
        toast.error(error.message || "Error while posting the Notes");
      }
    }
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Add book notes from here..</h1>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Give a simple title, to stand out"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <label>Description:</label>
        {formData.description.map((desc, index) => (
          <div key={index}>
            <textarea
              name="description"
              value={desc}
              placeholder={`${index + 1} Desc`}
              onChange={handleChange}
              data-index={index}
            />
          </div>
        ))}
        <button type="button" onClick={addDescription}>
          Add another description
        </button>
        <button type="submit">Add Note</button>
      </form>
    </>
  );
}
