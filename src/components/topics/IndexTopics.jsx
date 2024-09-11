import GetRedirectLink from "../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import apiUrl from "../utils/GetApiUrl";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Topic.css";

export default function IndexTopics() {
  return (
    <>
      <Helmet>
        <title>Discover Topics | Sanatan Dharma</title>
        <meta
          name="description"
          content="Explore various topics related to Sanatan Dharma, including spirituality, philosophy, and culture."
        />
        <meta
          name="keywords"
          content="Sanatan Dharma, hindusim topics, spirituality, philosophy, culture"
        />
      </Helmet>
      <img
        src="https://i.postimg.cc/X7vKJkZK/home-header.jpg"
        alt="Sanatan dharma is great!"
        className="topic-hero-image"
      />

      <div className="topic-card-holder">
        <AllTopics />
      </div>

      <GetRedirectLink text="Topics" path="add" />
    </>
  );
}

export function AllTopics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/topics/alltopics`)
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <>
      {topics.map((topic) => (
        <>
          <Link to={`/topic/${topic._id}`}>
            <IndexTopicsCard data={topic} />
          </Link>
        </>
      ))}
    </>
  );
}

export function IndexTopicsCard({ data }) {
  return (
    <>
      <div className="topic-card">
        <div className="topic-card-image">
          <img
            src={data.image || "https://i.postimg.cc/GpXfFkXL/topics.jpg"}
            alt={data.name}
          />
        </div>
        <div className="topic-card-content">
          <h3>{data.name}</h3>
          <p>
            {data.description.length > 150
              ? `${data.description.substring(0, 150)}...`
              : data.description}
          </p>
        </div>
        <div className="topic-card-footer">
          <div className="topic-like-comment">
            <button>❤</button>
            <button>💬</button>
          </div>
          <div className="topic-comments-count">
            <p>{data.views} views</p>
          </div>
        </div>
      </div>
    </>
  );
}
