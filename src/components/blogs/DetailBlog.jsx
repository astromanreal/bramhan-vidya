import { Link, useNavigate, useParams } from "react-router-dom";
import GetUserId from "../utils/GetUserId";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";

export default function DetailBlog() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({});

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/blogs/blog/${id}`);
        setBlogData(response.data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchBlogData();
  }, [id]);

  return (
    <>
      <Header data={blogData} />

      <div className="detail-blog-container">
        <div className="blog-content-section">
          {blogData.content && blogData.content.length > 0 ? (
            <div>
              {blogData.content.map((item) => (
                <div key={item._id} className="content-item">
                  <h2>{item.key}</h2>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <h2>No content available</h2>
          )}
        </div>
      </div>
    </>
  );
}

export function Header({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Blog?")) {
      try {
        const { data } = await axios.delete(
          `http://localhost:4000/blogs/blog/${id}`
        );
        if (data?.success) {
          toast.success("Blog deleted successfully");
          navigate("/blog");
        }
      } catch (err) {
        toast.error(err.message || "An error occurred while deleting the Blog");
      }
    }
  };
  return (
    <>
      <h2 className="blog-detail-title">{data.title}</h2>

      <div className="blog-key-detail">
        <h2>Key details</h2>
        <p>{data.subtitle}</p>
        <p>
          <strong>Views : </strong> {data.views}
        </p>
        <p>
          <strong>Category : </strong> {data.category}
        </p>
        <ul>
          {data.keyDetails && data.keyDetails.length > 0 ? (
            data.keyDetails.map((item, index) => (
              <li key={index}>
                <strong>{item.key} : </strong> {item.value}
              </li>
            ))
          ) : (
            <li>No key details available</li>
          )}
        </ul>

        {GetUserId() === (data && data.userId) && (
          <div className="blog-update-delete-btn">
            <Link to={`/blog/update/${id}`}>
              <button>Update Data</button>
            </Link>
            <button onClick={handleDelete}>Delete Data</button>
          </div>
        )}
      </div>
    </>
  );
}
