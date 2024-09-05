import { useNavigate } from "react-router-dom";
import GetUserId from "./../utils/GetUserId";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

export default function AddCommunity() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${apiUrl}/community/Addcommunity`, {
        name,
        image,
        description,
        createdBy: GetUserId(),
        userId: GetUserId(),
      });
      toast.success("Community added successfully");
      navigate("/community");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <h1>Create Community</h1>
      <div className="community-create-form-container">
        <form onSubmit={handleSubmit}>
          <div className="community-form-group">
            <label className="community-form-label">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="community-form-input"
            />
          </div>
          <div className="community-form-group">
            <label className="community-form-label">Image:</label>
            <input
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              className="community-form-input"
            />
          </div>
          <div className="community-form-group">
            <label className="community-form-label">Description:</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="community-form-input"
              rows="8"
            />
          </div>
          <button type="submit" className="community-create-btn">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
