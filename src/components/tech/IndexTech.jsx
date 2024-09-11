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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllTech = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tech/alltech`);
        if (response.data.success) {
          setTechnologies(response.data.data);
          const uniqueCategories = [
            ...new Set(response.data.data.map((tech) => tech.category)),
          ];
          setCategories(["All", ...uniqueCategories]);
        } else {
          throw new Error("Failed to fetch Technology lists");
        }
      } catch (error) {
        alert(error.message || "Error while getting the Data");
      }
    };
    fetchAllTech();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredTechnologies =
    selectedCategory === "All"
      ? technologies
      : technologies.filter((tech) => tech.category === selectedCategory);

  return (
    <>
      <img
        src="https://i.postimg.cc/3RRrpN2q/Technology.jpg"
        alt=""
        className="tech-hero-image"
      />
      <div className="filter-data-container">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="profile-card-holder">
        {filteredTechnologies.length > 0 ? (
          filteredTechnologies.map((technology) => (
            <TechCard key={technology._id} data={technology} />
          ))
        ) : (
          <p>No technologies found in this category</p>
        )}
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
