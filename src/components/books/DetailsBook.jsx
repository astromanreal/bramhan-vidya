import { Link, useNavigate, useParams } from "react-router-dom";
import GetRedirectLink from "./../utils/GetRedirectLink";
import GetUserId from "../utils/GetUserId";
import { useEffect, useState } from "react";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function DetailsBook() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  if (!book) return <p>Loading...</p>;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Book?")) {
      try {
        const { data } = await axios.delete(`${apiUrl}/books/book/${id}`);
        if (data?.success) {
          toast.success("Book deleted successfully");
          navigate("/book");
        } else {
          throw new Error("Failed to delete Book");
        }
      } catch (err) {
        toast.error(err.message || "An error occurred while deleting the Book");
      }
    }
  };

  return (
    <>
      <div className="books-detail-container">
        <h1>{book.title}</h1>
        <p className="books-info">
          👁️ : {book.views} | ✎ :{" "}
          {new Date(book.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚ :{" "}
          {new Date(book.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />
        <div>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Language: </strong>
            {book.language}
          </p>
          <p>
            <strong>Category:</strong> {book.category}
          </p>
          <p>
            <strong>Type: </strong>
            {book.type}
          </p>

          <div>
            <h2>Key details:</h2>
            {book.keyDetails?.length > 0 ? (
              book.keyDetails.map((note, index) => (
                <div key={index}>
                  <p>
                    <strong>{note.key} : </strong>
                    {note.value}
                  </p>
                </div>
              ))
            ) : (
              <p className="no-data">No More details available!</p>
            )}
          </div>
        </div>
        <hr />

        {book.googleBookSrc ? (
          <iframe
            title="Google Books Preview"
            src={`${book.googleBookSrc}&pg=PA1`}
            className="google-books-iframe"
          />
        ) : (
          <p>Loading book...</p>
        )}

        {GetUserId() === (book && book.userId) && (
          <div style={{ margin: "20px" }}>
            <Link to={`/book/update/${id}`}>
              <button style={{ margin: "10px 30px" }}>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
            <hr />
          </div>
        )}

        <GetAllNotes />
        <GetRedirectLink text="notes" path="add-note" />
      </div>
    </>
  );
}

export function GetAllNotes() {
  const { id } = useParams();
  const [bookNotes, setBookNotes] = useState({ notes: [] });

  useEffect(() => {
    const fetchBookNotes = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/books/${id}/allnotes`);
        setBookNotes(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchBookNotes();
  }, [id]);

  return (
    <>
      <div className="book-notes-container">
        <h2 className="heading">"Discover Key Takeaways and Notes"</h2>
        {bookNotes.length > 0 ? (
          <>
            {bookNotes.map((note, index) => (
              <li key={note._id} className="book-notes-list">
                <Link to={`/book/note/${note._id}`}>
                  {index + 1}. {note.notes.title}
                </Link>
                <p> {note.notes.description[0]}</p> <hr />
              </li>
            ))}
          </>
        ) : (
          <p>No book notes found</p>
        )}
      </div>
    </>
  );
}
