import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateNoteBooks() {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: [""],
    likes: {
      count: 0,
      users: [],
    },
    comments: [],
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await axios.get(
          `https://bramhan-vidya-api.vercel.app/books/note/${noteId}`
        );
        setFormData(data.notes);
      } catch (error) {
        toast.error(error.message || "Error while getting the Note info");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [noteId]);

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
      };
      try {
        await axios.put(
          `https://bramhan-vidya-api.vercel.app/books/note/${noteId}`,
          data
        );
        toast.success("Data updated");
        navigate(`/book/note/${noteId}`);
      } catch (error) {
        toast.error(error.message || "Error while updating the Notes");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        {" "}
        <h1>Update book notes from here..</h1>
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
        {formData.description?.map((desc, index) => (
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
        </button>{" "}
        <hr />
        <button type="submit">Update Note</button>
      </form>
    </>
  );
}
