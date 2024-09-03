import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import GetUserId from "../utils/GetUserId";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
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

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/books/book/${id}`);
        setBook(data.data);
      } catch (error) {
        toast.error(error.message || "Error fetching book details");
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredBook = {
      ...book,
      userId: GetUserId(),
      keyDetails: book.keyDetails.filter(
        (keyDetail) => keyDetail.key && keyDetail.value
      ),
    };
    try {
      await axios.put(`${apiUrl}/books/book/${id}`, filteredBook);
      toast.success("Book updated successfully");
      navigate(`/book/${id}`);
    } catch (error) {
      toast.error(error.response.data.errors || "Error while updating ");
    }
  };

  const handleChange = (e) => {
    setBook((prevBook) => ({ ...prevBook, [e.target.name]: e.target.value }));
  };

  const handleKeyDetailsChange = (index, keyType, value) => {
    const updatedBook = { ...book };
    if (!updatedBook.keyDetails[index]) {
      updatedBook.keyDetails[index] = {};
    }
    updatedBook.keyDetails[index][keyType] = value;
    setBook(updatedBook);
  };

  return (
    <>
      <form id="add-profile-form" onSubmit={handleSubmit}>
        <h1>Update Book</h1>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Google Book Link:</label>
          <input
            type="url"
            name="googleBookSrc"
            value={book.googleBookSrc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            value={book.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Language:</label>
          <input
            type="text"
            name="language"
            value={book.language}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={book.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Subcategory:</label>
          <input
            type="text"
            name="subcategory"
            value={book.subcategory}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={book.type}
            onChange={handleChange}
          />
        </div>

        <div id="profile-add-key-details">
          <h2>Key Details:</h2>
          {book.keyDetails.map((keyDetail, index) => (
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
                type="text"
                name={`keyDetails-${index}-value`}
                placeholder={`Value ${index + 1}`}
                value={keyDetail.value}
                onChange={(e) =>
                  handleKeyDetailsChange(index, "value", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const updatedBook = { ...book };
              updatedBook.keyDetails.push({ key: "", value: "" });
              setBook(updatedBook);
            }}
          >
            Add Key Detail
          </button>
        </div>

        <button type="submit">Update Book</button>
      </form>
    </>
  );
}
