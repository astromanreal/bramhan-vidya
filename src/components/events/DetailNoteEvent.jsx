import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import GetUserId from "../utils/GetUserId";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function DetailNoteEvent() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`${apiUrl}/event/note/${noteId}`);
        setNote(response.data);
      } catch (error) {
        alert(noteId);
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
        `${apiUrl}/event/note/${noteId}/comment`,
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
      await axios.delete(`${apiUrl}/event/note/${noteId}/comment/${commentId}`);
      toast.success("Comment deleted successfully!");
      const response = await axios.get(`${apiUrl}/event/note/${noteId}`);
      setNote(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/event/note/${noteId}`);
      toast.success("Note deleted successfully");
      navigate(`/event/${note.eventId}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handelLike = async () => {
    if (!note.notes.likes.users.includes(GetUserId())) {
      try {
        const response = await axios.put(
          `${apiUrl}/event/note/${noteId}/like`,
          { userId: GetUserId() }
        );
        toast("Liked!", { icon: "👍" });
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
          `${apiUrl}/event/note/${noteId}/unlike`,
          { userId: GetUserId() }
        );
        toast("Disliked!", { icon: "👎" });
        setNote(response.data);
      } catch (error) {
        toast.error(error.message || "Error while dislike");
      }
    }
  };

  return (
    <div className="event-note">
      <h1 className="event-note-title">{note.notes?.title}</h1>
      {note?.notes ? (
        <div className="event-note-content">
          <div className="event-note-like-dislike-btn-holder">
            <span onClick={handelLike}>👍 </span>: {note.notes.likes.count} :{" "}
            <span onClick={handelDislike}>👎</span>
          </div>
          <p className="event-note-info">
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
            <div className="event-note-action-btns">
              <button onClick={() => navigate("update")}>Update</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
          <hr />
          {note.notes.description?.map((desc, index) => (
            <p key={index} className="event-note-description">
              {desc}
            </p>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <hr />
      <h2 className="event-note-comments-title">Community Responses:</h2>
      {note?.notes ? (
        <div className="event-note-comments-section">
          {note.notes.comments?.length > 0 ? (
            note.notes.comments.map((comment, index) => (
              <div key={index} className="event-note-comment">
                <p>
                  <Link to={`/user/${comment.userId}`}>🥷🏻</Link> : {"  "}
                  {comment.comment}
                </p>
                {GetUserId() === comment.userId && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="event-note-delete-comment-btn"
                  >
                    Delete
                  </button>
                )}
                <small>{new Date(comment.createdAt).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p className="no-event-note-comments">
              No comments to display yet!
            </p>
          )}
          <div className="event-note-add-comment-container">
            <span>
              <input
                type="text"
                value={comment}
                required
                onChange={(e) => setComment(e.target.value)}
                placeholder="What are you thinking?"
                // className="event-note-comment-input"
              />
              <button
                onClick={addComment}
                // className="event-note-add-comment-btn"
              >
                share
              </button>
            </span>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
