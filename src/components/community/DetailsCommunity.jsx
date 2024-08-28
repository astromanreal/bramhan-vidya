import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PostsCommunity from "./PostsCommunity";
import GetUserId from "../utils/GetUserId";
import JoinCommunity from "./JoinCommunity";
import CreatePost from "./CreatePost";
import toast from "react-hot-toast";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";

export default function DetailsCommunity() {
  const navigate = useNavigate();
  const [community, setCommunity] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${apiUrl}/community/community/${id}`)
      .then((response) => {
        setCommunity(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this community?")) {
      try {
        await axios.delete(`${apiUrl}/community/community/${id}`);
        toast.success("Community deleted successfully");
        navigate("/community");
      } catch (err) {
        toast.error(
          err.message || "An error occurred while deleting the community"
        );
      }
    }
  };
  return (
    <>
      <div className="community-container">
        <div className="community-header">
          <h1 className="community-name">{community.name}</h1>
          <h3 className="community-description">{community.description}</h3>
          <div className="community-actions">
            {GetUserId() === community.createdBy && (
              <>
                <Link to={`/community/update/${community._id}`}>
                  <button className="community-btn community-btn-primary">
                    Update
                  </button>
                </Link>
                <button
                  className="community-btn community-btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </>
            )}
            <JoinCommunity />
          </div>
        </div>
        <div className="community-divider"></div>
        <PostsCommunity />
        <div className="community-divider"></div>
        <CreatePost />
      </div>
    </>
  );
}
