import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiUrl from "../utils/GetApiUrl";
import moment from "moment";
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
    <>
      <div class="community-post-card">
        <div class="text-wrap">
          <h2>{post.title}</h2>
          <p>
            {post.content.length > 200
              ? `${post.content.substring(0, 200)}...`
              : post.content}
          </p>
          <small class="time">{moment(post.createdAt).fromNow()}</small>
        </div>
        <div class="button-wrap">
          <Link class="primary-cta" to={`/community/post/${post._id}`}>
            View
          </Link>
          <button class="secondary-cta">disscuss</button>
          <button class="secondary-cta">{post.views} views</button>
        </div>
      </div>
      <hr />
    </>
  );
}
