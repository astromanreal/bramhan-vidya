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
                  "https://i.postimg.cc/3xPxN5WN/user-alt-image.png"
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

export function MyDocumentSlider() {
  const navigate = useNavigate();
  const [topicDocuments, setTopicDocuments] = useState([]);
  const [blogDocuments, setBlogDocuments] = useState([]);
  const [eventDocuments, setEventDocuments] = useState([]);
  const [techDocuments, setTechDocuments] = useState([]);
  const [bookDocuments, setBookDocuments] = useState([]);
  const [profileDocuments, setProfileDocuments] = useState([]);
  const [placeDocuments, setPlaceDocuments] = useState([]);

  const [loading, setLoading] = useState(true);

  const userId = GetUserId();

  const settings = {
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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
        const topicResponse = await axios.get(
          `${apiUrl}/users/alltopicdoc/${userId}`
        );
        const blogResponse = await axios.get(
          `${apiUrl}/users/allblogdoc/${userId}`
        );
        const eventResponse = await axios.get(
          `${apiUrl}/users/alleventdoc/${userId}`
        );
        const techResponse = await axios.get(
          `${apiUrl}/users/alltechdoc/${userId}`
        );
        const bookResponse = await axios.get(
          `${apiUrl}/users/allbookdoc/${userId}`
        );
        const profileResponse = await axios.get(
          `${apiUrl}/users/allprofiledoc/${userId}`
        );
        const placeResponse = await axios.get(
          `${apiUrl}/users/allplacedoc/${userId}`
        );

        setTopicDocuments(topicResponse.data.data);
        setBlogDocuments(blogResponse.data.data);
        setEventDocuments(eventResponse.data.data);
        setTechDocuments(techResponse.data.data);
        setBookDocuments(bookResponse.data.data);
        setProfileDocuments(profileResponse.data.data);
        setPlaceDocuments(placeResponse.data.data);

        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <>
      <section className="slider-section">
        <div className="slider-container">
          {loading ? (
            <p>Loading your document feeds...</p>
          ) : (
            <>
              <div className="my-document-container">
                <h2>Topic Documents</h2>
                {topicDocuments.length > 0 ? (
                  topicDocuments.length === 1 ? (
                    <div className="slider-card">
                      <img
                        src={
                          topicDocuments[0].image ||
                          "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                        }
                        alt={topicDocuments[0].title}
                      />
                      <div className="slider-card-content">
                        <h2>{topicDocuments[0].name}</h2>
                        <p>
                          {topicDocuments[0].description ||
                            "Description not available!"}
                        </p>
                        <button
                          onClick={() => {
                            navigate(`/topic/${topicDocuments[0]._id}`);
                          }}
                        >
                          Revise Content
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Slider {...settings}>
                      {topicDocuments.map((document, index) => (
                        <div className="slider-card" key={index}>
                          <img
                            src={
                              document.image ||
                              "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                            }
                            alt={document.title}
                          />
                          <div className="slider-card-content">
                            <h2>{document.name}</h2>
                            <p>
                              {document.description ||
                                "Description not available!"}
                            </p>
                            <button
                              onClick={() => {
                                navigate(`/topic/${document._id}`);
                              }}
                            >
                              Revise Content
                            </button>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  )
                ) : (
                  <p>No topic documents available.</p>
                )}
              </div>
              {/* topic end */}
              <div className="my-document-container">
                <h2>Blog Documents</h2>
                {blogDocuments.length > 0 ? (
                  blogDocuments.length === 1 ? (
                    <div className="slider-card">
                      <img
                        src={
                          blogDocuments[0].image ||
                          "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                        }
                        alt={blogDocuments[0].title}
                      />
                      <div className="slider-card-content">
                        <h2>{blogDocuments[0].title}</h2>
                        <h3>{blogDocuments[0].name}</h3>
                        <p>
                          {blogDocuments[0].subtitle ||
                            "subtitle not available!"}
                        </p>
                        <button
                          onClick={() => {
                            navigate(`/blog/${blogDocuments[0]._id}`);
                          }}
                        >
                          Revise Content
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Slider {...settings}>
                      {blogDocuments.map((document, index) => (
                        <div className="slider-card" key={index}>
                          <img
                            src={
                              document.image ||
                              "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                            }
                            alt={document.title}
                          />
                          <div className="slider-card-content">
                            <h2>{document.title}</h2>
                            <h3>{document.name}</h3>
                            <p>
                              {document.subtitle || "subtitle not available!"}
                            </p>
                            <button
                              onClick={() => {
                                navigate(`/blog/${document._id}`);
                              }}
                            >
                              Revise Content
                            </button>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  )
                ) : (
                  <p>No blog documents available.</p>
                )}
              </div>
              {/* blog end */}
              <div className="my-document-container">
                <h2>Event Documents</h2>
                {eventDocuments.length > 0 ? (
                  eventDocuments.length === 1 ? (
                    <div className="slider-card">
                      <img
                        src={
                          eventDocuments[0].image ||
                          "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                        }
                        alt={eventDocuments[0].title}
                      />
                      <div className="slider-card-content">
                        <h2>{eventDocuments[0].name}</h2>
                        <p>
                          {eventDocuments[0].description ||
                            "Description not available!"}
                        </p>
                        <button
                          onClick={() => {
                            navigate(`/event/${eventDocuments[0]._id}`);
                          }}
                        >
                          Revise Content
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Slider {...settings}>
                      {eventDocuments.map((document, index) => (
                        <div className="slider-card" key={index}>
                          <img
                            src={
                              document.image ||
                              "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                            }
                            alt={document.title}
                          />
                          <div className="slider-card-content">
                            <h2>{document.name}</h2>
                            <p>
                              {document.description ||
                                "Description not available!"}
                            </p>
                            <button
                              onClick={() => {
                                navigate(`/event/${document._id}`);
                              }}
                            >
                              Revise Content
                            </button>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  )
                ) : (
                  <p>No event documents available.</p>
                )}
              </div>
              {/* event end */}
              <div className="my-document-container">
                <h2>Tech Documents</h2>
                {techDocuments.length > 0 ? (
                  techDocuments.length === 1 ? (
                    <div className="slider-card">
                      <img
                        src={
                          techDocuments[0].image ||
                          "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                        }
                        alt={techDocuments[0].title}
                      />
                      <div className="slider-card-content">
                        <h2>{techDocuments[0].name}</h2>
                        <p>
                          {techDocuments[0].description ||
                            "Description not available!"}
                        </p>
                        <button
                          onClick={() => {
                            navigate(`/tech/${techDocuments[0]._id}`);
                          }}
                        >
                          Revise Content
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Slider {...settings}>
                      {techDocuments.map((document, index) => (
                        <div className="slider-card" key={index}>
                          <img
                            src={
                              document.image ||
                              "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                            }
                            alt={document.title}
                          />
                          <div className="slider-card-content">
                            <h2>{document.name}</h2>
                            <p>
                              {document.description ||
                                "Description not available!"}
                            </p>
                            <button
                              onClick={() => {
                                navigate(`/tech/${document._id}`);
                              }}
                            >
                              Revise Content
                            </button>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  )
                ) : (
                  <p>No tech documents available.</p>
                )}
              </div>
              {/* tech end */}

              <h2>Book Documents</h2>
              {bookDocuments.length > 0 ? (
                bookDocuments.length === 1 ? (
                  <div className="slider-card">
                    <img
                      src={
                        bookDocuments[0].image ||
                        "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                      }
                      alt={bookDocuments[0].title}
                    />
                    <div className="slider-card-content">
                      <h2>{bookDocuments[0].title}</h2>
                      <h3>{bookDocuments[0].language}</h3>
                      <p>
                        {bookDocuments[0].description ||
                          "Description not available!"}
                      </p>
                      <button
                        onClick={() => {
                          navigate(`/book/${bookDocuments[0]._id}`);
                        }}
                      >
                        Revise Content
                      </button>
                    </div>
                  </div>
                ) : (
                  <Slider {...settings}>
                    {bookDocuments.map((document, index) => (
                      <div className="slider-card" key={index}>
                        <img
                          src={
                            document.image ||
                            "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                          }
                          alt={document.title}
                        />
                        <div className="slider-card-content">
                          <h2>{document.title}</h2>
                          <h3>{document.language}</h3>
                          <p>
                            {document.description ||
                              "Description not available!"}
                          </p>
                          <button
                            onClick={() => {
                              navigate(`/book/${document._id}`);
                            }}
                          >
                            Revise Content
                          </button>
                        </div>
                      </div>
                    ))}
                  </Slider>
                )
              ) : (
                <p>No book documents available.</p>
              )}
              {/* book end */}
              <h2>Profile Documents</h2>
              {profileDocuments.length > 0 ? (
                profileDocuments.length === 1 ? (
                  <div className="slider-card">
                    <img
                      src={
                        profileDocuments[0].image ||
                        "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                      }
                      alt={profileDocuments[0].title}
                    />
                    <div className="slider-card-content">
                      <h2>{profileDocuments[0].title}</h2>
                      <h3>{profileDocuments[0].name}</h3>
                      <p>
                        {profileDocuments[0].description ||
                          "Description not available!"}
                      </p>
                      <button
                        onClick={() => {
                          navigate(
                            `/profile/${profileDocuments[0].path}/${profileDocuments[0]._id}`
                          );
                        }}
                      >
                        Revise Content
                      </button>
                    </div>
                  </div>
                ) : (
                  <Slider {...settings}>
                    {profileDocuments.map((document, index) => (
                      <div className="slider-card" key={index}>
                        <img
                          src={
                            document.image ||
                            "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                          }
                          alt={document.title}
                        />
                        <div className="slider-card-content">
                          <h2>{document.title}</h2>
                          <h3>{document.name}</h3>
                          <p>
                            {document.description ||
                              "Description not available!"}
                          </p>
                          <button
                            onClick={() => {
                              navigate(
                                `/profile/${document.path}/${document._id}`
                              );
                            }}
                          >
                            Revise Content
                          </button>
                        </div>
                      </div>
                    ))}
                  </Slider>
                )
              ) : (
                <p>No profile documents available.</p>
              )}
              {/* prifile end */}

              <h2>Place Documents</h2>
              {placeDocuments.length > 0 ? (
                placeDocuments.length === 1 ? (
                  <div className="slider-card">
                    <img
                      src={
                        placeDocuments[0].image ||
                        "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                      }
                      alt={placeDocuments[0].title}
                    />
                    <div className="slider-card-content">
                      <h2>{placeDocuments[0].name}</h2>
                      <h3>{placeDocuments[0].location.state}</h3>
                      <p>
                        {placeDocuments[0].description ||
                          "Description not available!"}
                      </p>
                      <button
                        onClick={() => {
                          navigate(
                            `/place/${placeDocuments[0].path}/${placeDocuments[0]._id}`
                          );
                        }}
                      >
                        Revise Content
                      </button>
                    </div>
                  </div>
                ) : (
                  <Slider {...settings}>
                    {placeDocuments.map((document, index) => (
                      <div className="slider-card" key={index}>
                        <img
                          src={
                            document.image ||
                            "https://i.postimg.cc/x1vLt3JT/profiles-alt-image.jpg"
                          }
                          alt={document.title}
                        />
                        <div className="slider-card-content">
                          <h2>{document.name}</h2>
                          <h3>{document.location.state}</h3>
                          <p>
                            {document.description ||
                              "Description not available!"}
                          </p>
                          <button
                            onClick={() => {
                              navigate(
                                `/place/${document.path}/${document._id}`
                              );
                            }}
                          >
                            Revise Content
                          </button>
                        </div>
                      </div>
                    ))}
                  </Slider>
                )
              ) : (
                <p>No place documents available.</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
