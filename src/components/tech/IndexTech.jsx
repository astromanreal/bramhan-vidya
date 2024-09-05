import GetRedirectLink from "../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";
import "./Technology.css";

export default function IndexTech() {
  return (
    <>
      <AllTech />
      <GetRedirectLink text="technology" path="add" />
    </>
  );
}

export function AllTech() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchAllTech = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tech/alltech`);
        if (response.data.success) {
          setTechnologies(response.data.data);
        } else {
          throw new Error("Failed to fetch Technology lists");
        }
      } catch (error) {
        alert(error.message || "Error while getting the Data");
      }
    };
    fetchAllTech();
  }, []);

  return (
    <>
      <div className="profile-card-holder">
        {technologies.map((technology) => (
          <TechCard data={technology} />
        ))}{" "}
      </div>
    </>
  );
}

export function TechCard({ data }) {
  return (
    <>
      {data && (
        <div className="tech-card">
          <div className="tech-card-image">
            <img src={data.image} alt="Description" />
          </div>
          <div className="tech-card-content">
            <div className="tech-meta">
              <span> 👁️ : {data.views}</span> ·
              <span>
                📅 :{" "}
                {new Date(data.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h2>{data.name}</h2>
            <p>
              {data.description.length > 140
                ? `${data.description.substring(0, 140)}...`
                : data.description}
            </p>
          </div>
          <div className="tech-card-footer">
            <Link to={`${data._id}`}>Read article</Link>
          </div>
        </div>
      )}
    </>
  );
}
