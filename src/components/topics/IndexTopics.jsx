import GetRedirectLink from "../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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
      .get("https://bramhan-vidya-api.vercel.app/topics/alltopics")
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
      <div class="topic-card">
        <div class="topic-card-image">
          <img src="https://i.postimg.cc/D0bRyws5/puspak.jpg" alt={data.name} />
        </div>
        <div class="topic-card-content">
          <h3>{data.name}</h3>
          <p>
            {data.description.length > 150
              ? `${data.description.substring(0, 150)}...`
              : data.description}
          </p>
        </div>
        <div class="topic-card-footer">
          <div class="topic-like-comment">
            <button>❤</button>
            <button>💬</button>
          </div>
          <div class="topic-comments-count">
            <p>{data.views} views</p>
          </div>
        </div>
      </div>
    </>
  );
}
