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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/blogs/allblogs`)
      .then((response) => {
        setBlogs(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((blog) => blog.category)),
        ];
        setCategories(["All", ...uniqueCategories]);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <>
      <div className="filter-data-container">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="blog-container">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog._id} data={blog} />)
        ) : (
          <p>No blogs found in this category</p>
        )}
      </div>
    </>
  );
}

// export function AllBlogs() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/blogs/allblogs`)
//       .then((response) => {
//         setBlogs(response.data);
//       })
//       .catch((error) => {
//         toast.error(error);
//       });
//   }, []);

//   return (
//     <>
//       <div className="blog-container">
//         {blogs.map((blog) => (
//           <BlogCard data={blog} />
//         ))}
//       </div>
//     </>
//   );
// }

export function BlogCard({ data }) {
  return (
    <>
      <Link to={data._id}>
        <div className="blog-card">
          <img
            src={data.image}
            onError={(e) => {
              e.target.src = "https://i.postimg.cc/3xrVB7TK/blog.jpg";
            }}
            alt={data.title}
          />
          <div className="blog-card-content">
            <h3 className="title">
              {" "}
              {data.title.split(" ").slice(0, 9).join(" ") +
                (data.title.split(" ").length > 9 ? "..." : "")}
            </h3>
            <p className="date">
              {" "}
              {new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="description">
              {data.subtitle.substring(0, 100) +
                (data.subtitle.length > 100 ? "..." : "")}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
