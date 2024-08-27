import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import GetUserId from "../utils/GetUserId";
import toast from "react-hot-toast";

export default function DetailPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://bramhan-vidya-api.vercel.app/community/post/${id}`
        );
        setPost(response.data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(
          `https://bramhan-vidya-api.vercel.app/community/post/${post._id}`
        );
        toast.success("Post deleted successfully");
        navigate(`/community/${post.communityId}`);
        window.location.reload();
      } catch (err) {
        toast.error(err.message || "An error occurred while deleting the post");
      }
    }
  };

  return (
    <div className="post-container">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-info">
        Views: {post.views} | Last updated at:{" "}
        {new Date(post.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        |{" "}
        {new Date(post.updatedAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
      <hr />
      <p className="post-content">{post.content}</p>
      {GetUserId() === post.userId && (
        <div className="post-actions">
          <button className="btn-delete" onClick={handleDelete}>
            Delete Post
          </button>
          <button className="btn-update">
            <Link to={`/community/post/update/${post._id}`}>Update Post</Link>
          </button>
        </div>
      )}
    </div>
  );
}
