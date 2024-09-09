import GetRedirectLink from "./../utils/GetRedirectLink";
import ProfileHeader from "./../profiles/ProfileHeader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";
import "./Books.css";

export default function IndexBook() {
  return (
    <>
      <ProfileHeader
        title="Explore Collection: Discover New Books"
        desc="Browse through our vast collection of books, featuring a wide range of genres, authors, and topics. Discover new titles, explore different subjects, and find your next favorite book in our ever-growing library."
      />
      <AllBooks />
      <GetRedirectLink text="Books" path="add" />
    </>
  );
}

export function AllBooks() {
  const [books, setBooks] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/books/allbooks`);
        if (data?.status === "success") {
          setBooks(data.data);
          const uniqueCategories = [
            ...new Set(data.data.map((book) => book.category)),
          ];
          setCategories(["All", ...uniqueCategories]);
          document.title = "All Sanatan Books";
        } else {
          throw new Error("Failed to fetch books data");
        }
      } catch (error) {
        toast.error(error.message || "Error while fetching the Data");
      }
    };
    fetchBooks();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books?.filter((book) => book.category === selectedCategory);

  return (
    <>
      <div className="filter-data-container">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="book-card-holder">
        {filteredBooks?.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book._id} data={book} />)
        ) : (
          <p>No books found in this category</p>
        )}
      </div>
    </>
  );
}

export function BookCard({ data }) {
  return (
    <>
      <div className="book-card">
        <div className="book-card-image">
          <img
            src={data.image || "https://wallpapercave.com/mwp/wp2036897.jpg"}
            alt={data.title}
          />
        </div>
        <div className="book-card-content">
          <div className="book-card-meta">
            <span>👁️ : {data.views}</span>
            <span>{data.category}</span>
            <span>
              {new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
          <h3>{data.title}</h3>
          <p>
            {data.description.length > 150
              ? `${data.description.substring(0, 150)}...`
              : data.description}
          </p>
          <Link to={`${data._id}`} className="book-card-btn">
            <span>Read this..</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
