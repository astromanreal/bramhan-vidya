import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";

export default function PostsCommunity() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/community/Allposts/${id}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [id]);

  return (
    <>
      <h1>Posts</h1>
      {posts.length > 0 ? (
        posts.reverse().map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <div className="no-posts-message">
          <h2>No posts yet!</h2>
          <p>Create your first post to get started!</p>
        </div>
      )}
    </>
  );
}

export function PostCard({ post }) {
  return (
    <div className="community-post-card">
      <Link to={`/community/post/${post._id}`}>
        <h2 className="community-post-title">{post.title}</h2>
      </Link>
      <p className="community-post-content">
        {post.content.length > 200
          ? `${post.content.substring(0, 200)}...`
          : post.content}
      </p>
    </div>
  );
}
