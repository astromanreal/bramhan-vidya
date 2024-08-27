import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import GetUserId from "../utils/GetUserId";

export default function DetailNoteBooks() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `https://bramhan-vidya-api.vercel.app/books/note/${noteId}`
        );
        setNote(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchNote();
  }, [noteId]);

  const addComment = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    try {
      const response = await axios.post(
        `https://bramhan-vidya-api.vercel.app/books/note/${noteId}/comment`,
        { comment, userId: GetUserId() }
      );
      setNote((prevNote) => ({ ...prevNote, ...response.data }));
      toast.success("Comment created");
      setComment("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `https://bramhan-vidya-api.vercel.app/books/note/${noteId}/comment/${commentId}`
      );
      toast.success("Comment deleted successfully!");
      // Update the notes to remove the deleted comment from view
      const response = await axios.get(
        `https://bramhan-vidya-api.vercel.app/books/note/${noteId}`
      );
      setNote(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://bramhan-vidya-api.vercel.app/books/note/${noteId}`
      );
      toast.success("Note deleted successfully");
      navigate(`/book/${note.bookId}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handelLike = async () => {
    if (!note.notes.likes.users.includes(GetUserId())) {
      try {
        const response = await axios.put(
          `https://bramhan-vidya-api.vercel.app/books/note/${noteId}/like`,
          { userId: GetUserId() }
        );
        toast("Liked!", {
          icon: "👍",
        });
        setNote(response.data);
      } catch (error) {
        toast.error(error.message || "Error while liking the Note");
      }
    }
  };

  const handelDislike = async () => {
    if (note.notes.likes.users.includes(GetUserId())) {
      try {
        const response = await axios.put(
          `https://bramhan-vidya-api.vercel.app/books/note/${noteId}/unlike`,
          { userId: GetUserId() }
        );
        toast("Disliked!", {
          icon: "👎",
        });
        setNote(response.data);
      } catch (error) {
        toast.error(error.message || "Error while dislike");
      }
    }
  };

  return (
    <div className="book-note">
      <h1 className="book-note-title">{note.notes?.title}</h1>
      {note?.notes ? (
        <div className="book-note-content">
          <div className="book-note-like-dislike-btn-holder">
            <span onClick={handelLike}>👍 </span>: {note.notes.likes.count} :{" "}
            <span onClick={handelDislike}>👎</span>
          </div>
          <p className="book-note-info">
            ✎ :{" "}
            {new Date(note.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            |⌚ :{" "}
            {new Date(note.updatedAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>

          {GetUserId() === note.userId && (
            <div className="book-note-action-btns">
              <button onClick={() => navigate("update")}>Update</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
          <hr />
          {note.notes.description?.map((desc, index) => (
            <p key={index} className="book-note-description">
              {desc}
            </p>
          ))}
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
      <hr />
      <h2 className="book-note-comments-title">Community Responses:</h2>
      {note?.notes ? (
        <div className="book-note-comments-section">
          {note.notes.comments?.length > 0 ? (
            note.notes.comments.map((comment, index) => (
              <div key={index} className="book-note-comment">
                <p>
                  <Link to={`/user/${comment.userId}`}>🥷🏻</Link> :
                  {comment.comment}
                </p>
                {GetUserId() === comment.userId && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="book-note-delete-comment-btn"
                  >
                    Delete
                  </button>
                )}
                <small>{new Date(comment.createdAt).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p className="no-book-note-comments">No comments to display yet!</p>
          )}
          <div className="book-note-add-comment-container">
            <input
              type="text"
              value={comment}
              required
              onChange={(e) => setComment(e.target.value)}
              placeholder="What are you thinking?"
              className="book-note-comment-input"
            />
            <button onClick={addComment} className="book-note-add-comment-btn">
              share
            </button>
          </div>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
}
