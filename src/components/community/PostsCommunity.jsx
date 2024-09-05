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
        <h2>No posts yet!</h2>
      )}
    </>
  );
}

export function PostCard({ post }) {
  return (
    <>
      <div className="community-post-card">
        <div className="text-wrap">
          <h2>{post.title}</h2>
          <p>
            {post.content.length > 200
              ? `${post.content.substring(0, 200)}...`
              : post.content}
          </p>
          <small className="time">{moment(post.createdAt).fromNow()}</small>
        </div>
        <div className="button-wrap">
          <Link className="primary-cta" to={`/community/post/${post._id}`}>
            View
          </Link>
          <button className="secondary-cta">disscuss</button>
          <button className="secondary-cta">{post.views} views</button>
        </div>
      </div>
      <hr />
    </>
  );
}
