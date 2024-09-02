import { Link, useNavigate } from "react-router-dom";
import GetUserId from "./../utils/GetUserId";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { jwtDecode } from "jwt-decode";
import apiUrl from "../utils/GetApiUrl";
import toast from "react-hot-toast";
import Slider from "react-slick";
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
          const response = await axios.get(`${apiUrl}/users/user/${userId}`);
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
    navigate("/user");
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const response = await axios.put(`${apiUrl}/users/updateuser/${userId}`, {
        role: "admin",
      });
      setUserProfile(response.data);
      toast.success("You are now an admin!");
    } catch (error) {
      toast.error(error.message || "Failed to become admin");
    }
  };

  return (
    <>
      <div id="user-profile-container">
        {token ? (
          userProfile ? (
            <div className="user-profile-info">
              <h1>{userProfile.username}</h1>
              <img
                src={
                  userProfile.avatar ||
                  "https://i.postimg.cc/9QW1LDRr/user-alt-image.png"
                }
                alt={`${userProfile.name} not found`}
              />
              <p>{userProfile.email}</p>
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
          <div className="user-profile-info">
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

      {token && <MyDocumentSlider />}
    </>
  );
}

const SingleDocumentCard = ({ document }) => {
  const navigate = useNavigate();
  const redirectUrls = {
    topic: `/topic/${document._id}`,
    blog: `/blog/${document._id}`,
    event: `/event/${document._id}`,
    tech: `/tech/${document._id}`,
    book: `/book/${document._id}`,
    profile: `/profile/${document.path}/${document._id}`,
    place: `/place/${document.path}/${document._id}`,
  };
  return (
    <div className="doc-card">
      <img
        src={document.image || "https://i.postimg.cc/GpXfFkXL/topics.jpg"}
        alt={document.title}
        className="doc-image"
      />
      <div className="doc-content">
        <h2>{document.title}</h2>
        <h3>{document.name}</h3>
        <p>
          {document.description ||
            document.subtitle ||
            "Description not available!"}
        </p>
        <button
          onClick={() => navigate(redirectUrls[document.type])}
          className="doc-btn"
        >
          Revise Content
        </button>
      </div>
    </div>
  );
};

const DocumentCard = ({ document }) => {
  const navigate = useNavigate();
  const redirectUrls = {
    topic: `/topic/${document._id}`,
    blog: `/blog/${document._id}`,
    event: `/event/${document._id}`,
    tech: `/tech/${document._id}`,
    book: `/book/${document._id}`,
    profile: `/profile/${document.path}/${document._id}`,
    place: `/place/${document.path}/${document._id}`,
  };
  return (
    <div className="doc-card">
      <img
        src={document.image || "https://i.postimg.cc/GpXfFkXL/topics.jpg"}
        alt={document.title}
        className="doc-image"
      />
      <div className="doc-content">
        <h2>{document.title}</h2>
        <h3>{document.name}</h3>
        <p>
          {document.description ||
            document.subtitle ||
            "Description not available!"}
        </p>
        <button
          onClick={() => navigate(redirectUrls[document.type])}
          className="doc-btn"
        >
          Revise Content
        </button>
      </div>
    </div>
  );
};

export function MyDocumentSlider() {
  const [documents, setDocuments] = useState({
    topicDocuments: [],
    blogDocuments: [],
    eventDocuments: [],
    techDocuments: [],
    bookDocuments: [],
    profileDocuments: [],
    placeDocuments: [],
  });

  const [loading, setLoading] = useState(true);

  const userId = GetUserId();

  const settings = {
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 9000,
    speed: 1000,
    pauseOnHover: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(`${apiUrl}/users/alltopicdoc/${userId}`),
          axios.get(`${apiUrl}/users/allblogdoc/${userId}`),
          axios.get(`${apiUrl}/users/alleventdoc/${userId}`),
          axios.get(`${apiUrl}/users/alltechdoc/${userId}`),
          axios.get(`${apiUrl}/users/allbookdoc/${userId}`),
          axios.get(`${apiUrl}/users/allprofiledoc/${userId}`),
          axios.get(`${apiUrl}/users/allplacedoc/${userId}`),
        ]);

        const data = responses.map((response, index) => {
          const keys = Object.keys({
            topicDocuments: [],
            blogDocuments: [],
            eventDocuments: [],
            techDocuments: [],
            bookDocuments: [],
            profileDocuments: [],
            placeDocuments: [],
          });
          return response.data.data.map((document) => {
            return {
              ...document,
              type: keys[index].replace("Documents", "").toLowerCase(),
            };
          });
        });

        setDocuments({
          topicDocuments: data[0],
          blogDocuments: data[1],
          eventDocuments: data[2],
          techDocuments: data[3],
          bookDocuments: data[4],
          profileDocuments: data[5],
          placeDocuments: data[6],
        });

        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <>
      <section className="doc-slider-wrap">
        <div className="doc-slider-inner">
          {loading ? (
            <p className="loading-msg">Loading your document feeds...</p>
          ) : (
            <>
              {Object.keys(documents).map((key) => (
                <div key={key} className="doc-category">
                  <h2 className="doc-category-title">
                    {key.replace("Documents", " Documents")}
                  </h2>
                  {documents[key].length === 0 ? (
                    <p className="no-docs-msg">
                      No {key.replace("Documents", " documents")} available.
                    </p>
                  ) : documents[key].length === 1 ? (
                    <SingleDocumentCard document={documents[key][0]} />
                  ) : (
                    <Slider {...settings}>
                      {documents[key].map((document, index) => (
                        <DocumentCard key={index} document={document} />
                      ))}
                    </Slider>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
