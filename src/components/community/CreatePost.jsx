import { useParams } from "react-router-dom";
import GetUserId from "../utils/GetUserId";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${apiUrl}/community/Addpost/${id}`, {
        title,
        content,
        userId: GetUserId(),
      });
      toast.success("Post created");
      setTitle("");
      setContent("");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <h1 className="create-post-title">Create Post</h1>
      <form onSubmit={handleSubmit} className="create-post-form">
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
          Create Post
        </button>
      </form>
    </>
  );
}
