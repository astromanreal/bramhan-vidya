import { useNavigate, useParams, Link } from "react-router-dom";
import GetUserId from "../utils/GetUserId";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function DetailsTech() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tech, setTech] = useState({});
  const [comment, setComment] = useState("");
  const [showFullNotes, setShowFullNotes] = useState(false);

  useEffect(() => {
    axios
      .get(`https://bramhan-vidya-api.vercel.app/tech/tech/${id}`)
      .then((response) => {
        setTech(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Data?")) {
      try {
        const { data } = await axios.delete(
          `https://bramhan-vidya-api.vercel.app/tech/tech/${id}`
        );
        if (data?.success) {
          toast.success("Deleted successfully");
          navigate("/tech");
        } else {
          throw new Error("Failed to delete Data");
        }
      } catch (err) {
        toast.error(err.message || "An error occurred while deleting the Data");
      }
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axios.put(
        `https://bramhan-vidya-api.vercel.app/tech/like/${id}`,
        {
          userId: GetUserId(),
        }
      );
      setTech(data);
      toast.success("Liked!");
    } catch (err) {
      toast("Already liked", {
        icon: "👍",
        duration: 2000,
      });
    }
  };

  const handleDislike = async () => {
    try {
      const { data } = await axios.put(
        `https://bramhan-vidya-api.vercel.app/tech/dislike/${id}`,
        {
          userId: GetUserId(),
        }
      );
      setTech(data);
      toast.success("Disliked!");
    } catch (err) {
      toast("Already disliked", {
        icon: "👎",
        duration: 2000,
      });
    }
  };

  const handleAddComment = async () => {
    if (!comment) {
      toast.error("Please enter a comment");
      return;
    }
    try {
      const techId = id;
      const { data } = await axios.post(
        `https://bramhan-vidya-api.vercel.app/tech/${techId}/Comment`,
        {
          comment,
          userId: GetUserId(),
        }
      );
      setTech(data);
      setComment("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error(err.message || "Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const { data } = await axios.delete(
        `https://bramhan-vidya-api.vercel.app/tech/${id}/comment/${commentId}`
      );
      setTech(data);
      toast.success("Comment deleted!");
    } catch (err) {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <>
      <div className="tech-details-container">
        <h1 className="tech-name">{tech.name}</h1>
        <p className="tech-info">
          👁️ : {tech.views} | ✎ :{" "}
          {new Date(tech.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚
          {new Date(tech.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <p className="tech-description">{tech.description}</p>
        <div className="tech-like-dislike-btn-holder">
          <span onClick={handleLike} className="like-btn">
            👍{" "}
          </span>
          : {tech.likes ? tech.likes.count : 0} :{" "}
          <span onClick={handleDislike} className="dislike-btn">
            👎
          </span>
        </div>
        <hr />
        <div className="tech-details">
          <p>
            {tech.randomKeyDetails && tech.randomKeyDetails.length > 0 && (
              <>
                {tech.randomKeyDetails.map((detail) => (
                  <li key={detail.key}>
                    <strong>{detail.key}:</strong> {detail.value}
                  </li>
                ))}
              </>
            )}
          </p>
          <p>
            <strong>Reference : </strong>
            {tech.reference}
          </p>
          <p>
            <strong>Owner : </strong>
            {tech.owner}
          </p>
          <p>
            <strong>Created By : </strong>
            {tech.createdBy}
          </p>
          <p>
            <strong>Category : </strong>
            {tech.category}
          </p>
        </div>
        <div className="tech-update-delete-btn">
          {GetUserId() === tech.userId && (
            <div>
              <button
                onClick={() => {
                  navigate(`/tech/update/${id}`);
                }}
              >
                Update Data
              </button>
              <button onClick={handleDelete}>Delete Data</button>{" "}
            </div>
          )}
        </div>{" "}
        <hr />
        {tech.notes && tech.notes.length > 0 && (
          <div className="tech-notes">
            {tech.notes.map((note) => (
              <div key={note.listName}>
                <h2> {note.key}</h2>
                <p>
                  {showFullNotes
                    ? note.value
                    : note.value.substring(0, 400) +
                      (note.value.length > 400 ? "..." : "")}
                  {note.value.length > 400 && !showFullNotes && (
                    <span
                      style={{ cursor: "pointer", color: "#00BFFF" }}
                      onClick={() => setShowFullNotes(true)}
                    >
                      See More
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
        {/* comments */}
        <div className="tech-comments">
          <hr />
          <h2>"Thoughts on this Tech"</h2>
          <>
            {tech.comments?.comments?.length > 0 ? (
              tech.comments.comments.map((comment, index) => (
                <li key={comment._id}>
                  <p className="tech-comment-title">
                    <Link to={`/user/${comment.userId}`}>
                      <img src={"https://i.pravatar.cc/?img=68"} alt="user" />
                    </Link>{" "}
                    : {"  "}
                    {comment.comment}
                  </p>
                  {GetUserId() === comment.userId && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="delete-comment-btn"
                    >
                      Delete
                    </button>
                  )}
                  <small>{new Date(comment.createdAt).toLocaleString()}</small>
                </li>
              ))
            ) : (
              <li>No comments yet!</li>
            )}
          </>
          <div className="add-comment">
            <input
              type="text"
              value={comment}
              required
              onChange={(e) => setComment(e.target.value)}
              placeholder="What's on your mind?"
            />
            <button onClick={handleAddComment} className="share-btn">
              Share
            </button>
          </div>
        </div>
        {/* comment end */}
      </div>
    </>
  );
}
