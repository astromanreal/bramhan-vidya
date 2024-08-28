import { useNavigate } from "react-router-dom";
import GetUserId from "../utils/GetUserId";
import toast from "react-hot-toast";
import apiUrl from "../utils/GetApiUrl";
import { useState } from "react";
import axios from "axios";

export default function AddBlogs() {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    userId: GetUserId(),
    keyDetails: [{ key: "", value: "" }],
    content: [{ key: "", value: "" }],
    category: "",
    tags: [],
    image: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filteredBlogData = {
      ...blogData,
      content: blogData.content.filter(
        (item) => item.key.trim() !== "" && item.value.trim() !== ""
      ),
      keyDetails: blogData.keyDetails.filter(
        (item) => item.key.trim() !== "" && item.value.trim() !== ""
      ),
    };
    try {
      await axios.post(`${apiUrl}/blogs/addblog`, filteredBlogData);
      toast.success("Data added successfully");
      navigate("/blog");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleContentChange = (index, event) => {
    const { name, value } = event.target;
    const newContent = blogData.content.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setBlogData({ ...blogData, content: newContent });
  };

  const handleKeyDetailsChange = (index, event) => {
    const { name, value } = event.target;
    const newKeyDetails = blogData.keyDetails.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setBlogData({ ...blogData, keyDetails: newKeyDetails });
  };

  return (
    <>
      <form className="add-blog-form" onSubmit={handleSubmit}>
        <h1>Add blogs</h1>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Subtitle:
          <input
            type="text"
            name="subtitle"
            value={blogData.subtitle}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Key Details:
          {blogData.keyDetails.map((item, index) => (
            <div className="blog-content" key={index}>
              <input
                type="text"
                name="key"
                placeholder={`Title ${index + 1}`}
                value={item.key}
                onChange={(event) => handleKeyDetailsChange(index, event)}
              />
              <textarea
                name="value"
                placeholder={`Description ${index + 1}`}
                value={item.value}
                onChange={(event) => handleKeyDetailsChange(index, event)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setBlogData({
                ...blogData,
                keyDetails: [...blogData.keyDetails, { key: "", value: "" }],
              })
            }
          >
            Add More Key Details
          </button>
        </label>

        <br />
        <label>
          Content:
          {blogData.content.map((item, index) => (
            <div className="blog-content" key={index}>
              <input
                type="text"
                name="key"
                placeholder={`Title ${index + 1}`}
                value={item.key}
                onChange={(event) => handleContentChange(index, event)}
              />
              <textarea
                name="value"
                placeholder={`Description ${index + 1}`}
                value={item.value}
                onChange={(event) => handleContentChange(index, event)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setBlogData({
                ...blogData,
                content: [...blogData.content, { key: "", value: "" }],
              })
            }
          >
            Add More Content
          </button>
        </label>
        <br />
        <label>
          Category:
          <select
            required
            name="category"
            value={blogData.category}
            onChange={handleChange}
          >
            <option disabled value="">
              Choose one:
            </option>
            <option value="Scriptures">Scriptures</option>
            <option value="Deities">Deities</option>
            <option value="Festivals">Festivals</option>
            <option value="Events">Events</option>
            <option value="Places">Places</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Tags:
          <input
            type="text"
            name="tags"
            value={blogData.tags}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="url"
            name="image"
            value={blogData.image}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Blog</button>
      </form>
    </>
  );
}
