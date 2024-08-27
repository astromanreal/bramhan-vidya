import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateCommunity() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`https://bramhan-vidya-api.vercel.app/community/community/${id}`)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `https://bramhan-vidya-api.vercel.app/community/community/${id}`,
        {
          name,
          description,
        }
      );
      navigate(`/community/${id}`);
      toast.success("Updated!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <h1>Update Community</h1>
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
            <label className="community-form-label">Description:</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="community-form-input"
              rows="8"
            />
          </div>
          <button type="submit" className="community-create-btn">
            Update
          </button>
        </form>
      </div>
    </>
  );
}
