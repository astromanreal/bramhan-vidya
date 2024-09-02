import GetRedirectLink from "./../utils/GetRedirectLink";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import axios from "axios";
import "./Blog.css";

export default function IndexBlog() {
  return (
    <>
      <AllBlogs />
      <GetRedirectLink text="Articles" path="add" />
    </>
  );
}

export function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/blogs/allblogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  return (
    <>
      <div className="blog-container">
        {blogs.map((blog) => (
          <BlogCard data={blog} />
        ))}
      </div>
    </>
  );
}

export function BlogCard({ data }) {
  return (
    <>
      <Link to={data._id}>
        <div class="blog-card">
          <img
            src={data.image}
            onError={(e) => {
              e.target.src = "https://i.postimg.cc/3xrVB7TK/blog.jpg";
            }}
            alt={data.title}
          />
          <div class="blog-card-content">
            <h3 class="title">
              {" "}
              {data.title.split(" ").slice(0, 9).join(" ") +
                (data.title.split(" ").length > 9 ? "..." : "")}
            </h3>
            <p class="date">
              {" "}
              {new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p class="description">
              {data.subtitle.substring(0, 100) +
                (data.subtitle.length > 100 ? "..." : "")}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
