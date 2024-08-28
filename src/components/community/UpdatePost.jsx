import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";

export default function UpdatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${apiUrl}/community/post/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        setMessage("Failed to fetch post");
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/community/post/${id}`, {
        title,
        content,
      });
      toast.success("Post updated successfully!");
      navigate(`/community/post/${id}`);
    } catch (error) {
      toast.error("Failed to update post");
    }
  };
  return (
    <div>
      <h1 className="create-post-title">Update Post</h1>
      <form onSubmit={handleUpdate} className="create-post-form">
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="content">
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="form-textarea"
          />
        </div>
        <button type="submit" className="submit-post-btn">
          Update Post
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}
