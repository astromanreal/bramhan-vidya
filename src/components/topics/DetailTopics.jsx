import { useNavigate, useParams, Link } from "react-router-dom";
import GetUserId from "../utils/GetUserId";
import { useState, useEffect } from "react";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";

export default function DetailTopics() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [topic, setTopic] = useState({});
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/topics/topic/${id}`)
      .then((response) => {
        setTopic(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Data?")) {
      try {
        const { data } = await axios.delete(`${apiUrl}/topics/topic/${id}`);
        if (data?.success) {
          toast.success("Deleted successfully");
          navigate("/topic");
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
      const { data } = await axios.put(`${apiUrl}/topics/like/${id}`, {
        userId: GetUserId(),
      });
      setTopic(data);
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
      const { data } = await axios.put(`${apiUrl}/topics/dislike/${id}`, {
        userId: GetUserId(),
      });
      setTopic(data);
      toast.success("Disliked!");
    } catch (err) {
      toast("Already disliked", {
        icon: "👎",
        duration: 2000,
      });
    }
  };

  const handleAddComment = async () => {
    try {
      const topicId = id;
      const { data } = await axios.post(`${apiUrl}/topics/${topicId}/Comment`, {
        comment,
        userId: GetUserId(),
      });
      setTopic(data);
      setComment("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error(err.message || "Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const { data } = await axios.delete(
        `${apiUrl}/topics/${id}/comment/${commentId}`
      );
      setTopic(data);
      toast.success("Comment deleted!");
    } catch (err) {
      toast.error("Failed to delete comment");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (topic.comments && topic.comments.comments) {
        const usersData = await Promise.all(
          topic.comments.comments.map((comment) =>
            axios
              .get(`${apiUrl}/users/user/${comment.userId}`)
              .catch((error) => {
                if (error.response.status === 404) {
                  return null; // or a fallback user object
                }
                throw error;
              })
          )
        );
        const users = usersData
          .filter(Boolean)
          .map((response) => response.data);
        setUsers(users);
      }
    };
    fetchUsers();
  }, [topic]);

  return (
    <>
      <div className="topic-detail-container">
        <h1>{topic.name}</h1>

        <div className="like-dislike-btn-holder">
          <span onClick={handleLike}>👍 </span>:{" "}
          {topic.likes ? topic.likes.count : 0} :{" "}
          <span onClick={handleDislike}>👎</span>
        </div>

        <p className="topic-info">
          👁️ : {topic.views} | ✎ :{" "}
          {new Date(topic.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          |⌚
          {new Date(topic.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <hr />

        <p>{topic.description}</p>
        {topic.randomKeyDetails && topic.randomKeyDetails.length > 0 && (
          <>
            <div className="topic-detail-card">
              {topic.randomKeyDetails.map((detail) => (
                <li key={detail.key}>
                  <strong>{detail.key}:</strong> {detail.value}
                </li>
              ))}
            </div>
          </>
        )}

        {topic.lists && topic.lists.length > 0 && (
          <>
            <div className="topic-detail-card">
              {topic.lists.map((list) => (
                <>
                  <div className="topic-detail-card">
                    <div key={list.listName}>
                      <h2>{list.listName}</h2>
                      <ul>
                        {list.items &&
                          list.items.length > 0 &&
                          list.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
        <div className="topic-detail-btn-holder">
          {GetUserId() === topic.userId && (
            <div>
              <Link to={`/topic/update/${id}`}>
                <button>Update Data</button>
              </Link>
              <button onClick={handleDelete}>Delete Data</button>
            </div>
          )}
        </div>

        {/* comments */}

        <div className="topic-comments-section">
          <h2>Comments</h2>

          <ul className="topic-comments-list">
            {topic.comments?.comments?.length > 0 ? (
              topic.comments.comments.map((comment, index) => (
                <li key={comment._id} className="topic-comment-item">
                  <p className="topic-comment-text">
                    <Link to={`/user/${comment.userId}`}>
                      <img
                        src={
                          users[index]?.avatar ||
                          "https://i.pravatar.cc/?img=68"
                        }
                        alt="user"
                        className="topic-comment-avatar"
                      />
                    </Link>{" "}
                    : {"  "}
                    {comment.comment}
                  </p>
                  {GetUserId() === comment.userId && (
                    <button
                      className="topic-comment-delete-btn"
                      onClick={() => handleDeleteComment(comment._id)}
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
          </ul>

          <div className="topic-add-comment">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What's on your mind?"
              className="topic-comment-input"
            />
            <button className="topic-add-btn" onClick={handleAddComment}>
              Share
            </button>
          </div>
        </div>
        {/* comment end */}
      </div>
    </>
  );
}
