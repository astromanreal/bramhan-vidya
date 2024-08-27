import { Link, useNavigate } from "react-router-dom";
import GetUserId from "./../utils/GetUserId";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import axios from "axios";
import "./Users.css";

export default function MyProfile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          const response = await axios.get(
            `https://bramhan-vidya-api.vercel.app/users/user/${userId}`
          );
          setUserProfile(response.data);
        } catch (error) {
          toast.error("Failed to fetch user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/user/login");
  };

  const handleBecomeAdmin = async () => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const response = await axios.put(
        `https://bramhan-vidya-api.vercel.app/users/updateuser/${userId}`,
        {
          role: "admin",
        }
      );
      setUserProfile(response.data);
      toast.success("You are now an admin!");
    } catch (error) {
      toast.error(error.message || "Failed to become admin");
    }
  };

  return (
    <>
      <div id="user-profile-container">
        <h1>My Profile</h1>
        {token ? (
          userProfile ? (
            <div className="user-profile-info">
              <img
                src={userProfile.avatar}
                alt="User Avatar"
                className="user-avatar"
              />
              <p>Email: {userProfile.email}</p>
              <p>Username: {userProfile.username}</p>
            </div>
          ) : (
            <p>Loading user information...</p>
          )
        ) : (
          <div>
            <p>
              Please <Link to="/user/login">login</Link> to see your profile.
            </p>
            <p>
              Don't have an account? <Link to="/user/signup"> Sign up</Link>
            </p>
          </div>
        )}
        {token && (
          <div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            {userProfile && userProfile.role === "user" && (
              <button className="logout-btn" onClick={handleBecomeAdmin}>
                Be an Admin
              </button>
            )}
          </div>
        )}
      </div>
      <MyBlogDocuments />
      <MyEventDocuments />
      <MyTechDocuments />
      <MyBookDocuments />
      <MyTopicDocuments />
      <MyProfileDocuments />
      <MyPlaceDocuments />
    </>
  );
}

export function MyProfileDocuments() {
  const [documents, setDocuments] = useState([]);
  const userId = GetUserId();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `https://bramhan-vidya-api.vercel.app/users/allprofiledoc/${userId}`
        );
        setDocuments(response.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchDocuments();
  }, [userId]);

  return (
    <>
      <div id="profile-docs-container">
        <h1>All Profiles</h1>
        {documents.length > 0 ? (
          documents.map((document) => (
            <div key={document._id} className="profile-doc">
              <Link
                to={`/profile/${document.path}/${document._id}`}
                className="profile-link"
              >
                <h2> {document.name}</h2>
                <p>{document.description || "No description available!"}</p>
              </Link>
            </div>
          ))
        ) : (
          <h1 className="missing-link">No documents available!</h1>
        )}
      </div>
    </>
  );
}

export function MyPlaceDocuments() {
  const [documents, setDocuments] = useState([]);
  const userId = GetUserId();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://bramhan-vidya-api.vercel.app/users/allplacedoc/${userId}`
        );
        setDocuments(response.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [userId]);

  return (
    <>
      <div id="profile-docs-container">
        <h1>All Places</h1>
        {documents.length > 0 ? (
          documents.map((document) => (
            <div key={document._id} className="profile-doc">
              <Link
                to={`/place/${document.path}/${document._id}`}
                className="profile-link"
              >
                <h2>{document.name}</h2>
                <p>{document.description || "No description available!"}</p>
              </Link>
            </div>
          ))
        ) : (
          <h1 className="missing-link">No documents available!</h1>
        )}
      </div>
    </>
  );
}

export function MyTopicDocuments() {
  const [documents, setDocuments] = useState([]);
  const userId = GetUserId();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://bramhan-vidya-api.vercel.app/users/alltopicdoc/${userId}`
        );
        setDocuments(response.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [userId]);

  return (
    <>
      <div id="profile-docs-container">
        <h1>All Topics</h1>
        {documents.length > 0 ? (
          documents.map((document) => (
            <div key={document._id} className="profile-doc">
              <Link to={`/topic/${document._id}`} className="profile-link">
                <h2>{document.name}</h2>
                <p>{document.description || "No description available!"}</p>
              </Link>
            </div>
          ))
        ) : (
          <h1 className="missing-link">No documents available!</h1>
        )}
      </div>
    </>
  );
}

export function MyBlogDocuments() {
  const [documents, setDocuments] = useState([]);
  const userId = GetUserId();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://bramhan-vidya-api.vercel.app/users/allblogdoc/${userId}`
        );
        setDocuments(response.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [userId]);

  return (
    <>
      <div id="profile-docs-container">
        <h1>All Blogs</h1>
        {documents.length > 0 ? (
          documents.map((document) => (
            <div key={document._id} className="profile-doc">
              <Link to={`/blog/${document._id}`} className="profile-link">
                <h2>{document.title}</h2>
                <p>{document.subtitle || "No subtitle available!"}</p>
              </Link>
            </div>
          ))
        ) : (
          <h1 className="missing-link">No documents available!</h1>
        )}
      </div>
    </>
  );
}

export function MyEventDocuments() {
  const [documents, setDocuments] = useState([]);
  const userId = GetUserId();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://bramhan-vidya-api.vercel.app/users/alleventdoc/${userId}`
        );
        setDocuments(response.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [userId]);

  return (
    <>
      <div id="profile-docs-container">
        <h1>All Events</h1>
        {documents.length > 0 ? (
          documents.map((document) => (
            <div key={document._id} className="profile-doc">
              <Link to={`/event/${document._id}`} className="profile-link">
                <h2>{document.name}</h2>
                <p>{document.description || "No description available!"}</p>
              </Link>
            </div>
          ))
        ) : (
          <h1 className="missing-link">No documents available!</h1>
        )}
      </div>
    </>
  );
}

export function MyTechDocuments() {
  const [documents, setDocuments] = useState([]);
  const userId = GetUserId();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://bramhan-vidya-api.vercel.app/users/alltechdoc/${userId}`
        );
        setDocuments(response.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [userId]);

  return (
    <>
      <div id="profile-docs-container">
        <h1>All Tech</h1>
        {documents.length > 0 ? (
          documents.map((document) => (
            <div key={document._id} className="profile-doc">
              <Link to={`/tech/${document._id}`} className="profile-link">
                <h2>{document.name}</h2>
                <p>{document.description || "No description available!"}</p>
              </Link>
            </div>
          ))
        ) : (
          <h1 className="missing-link">No documents available!</h1>
        )}
      </div>
    </>
  );
}

export function MyBookDocuments() {
  const [documents, setDocuments] = useState([]);
  const userId = GetUserId();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://bramhan-vidya-api.vercel.app/users/allbookdoc/${userId}`
        );
        setDocuments(response.data.data);
      } catch (error) {
        toast.error("Book error " || error.message);
      }
    })();
  }, [userId]);

  return (
    <>
      <div id="profile-docs-container">
        <h1>All Books</h1>
        {documents.length > 0 ? (
          documents.map((document) => (
            <div key={document._id} className="profile-doc">
              <Link to={`/book/${document._id}`} className="profile-link">
                <h2>{document.title}</h2>
                <p>{document.description || "No description available!"}</p>
              </Link>
            </div>
          ))
        ) : (
          <h1 className="missing-link">No documents available!</h1>
        )}
      </div>
    </>
  );
}
