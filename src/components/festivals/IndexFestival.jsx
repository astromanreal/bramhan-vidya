import { useState, useEffect } from "react";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";
import "./Festival.css";
import { Link } from "react-router-dom";
import GetRedirectLink from "../utils/GetRedirectLink";

export default function IndexFestival() {
  return (
    <>
      <AllFestivals />
      <GetRedirectLink text="festivals" path="add" />
    </>
  );
}

export function AllFestivals() {
  const [festivals, setFestivals] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchAllFestivals = async () => {
      try {
        const response = await axios.get(`${apiUrl}/festivals/allfestivals`);
        if (response.data.success) {
          setFestivals(response.data.data);
          const uniqueTypes = [
            ...new Set(response.data.data.map((fest) => fest.type)),
          ];
          setTypes(["All", ...uniqueTypes]);
        } else {
          throw new Error("Failed to fetch Festival lists");
        }
      } catch (error) {
        alert(error.message || "Error while getting the Data");
      }
    };
    fetchAllFestivals();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredFestivals =
    selectedType === "All"
      ? festivals
      : festivals.filter((fest) => fest.type === selectedType);

  return (
    <>
      <div className="filter-data-container">
        <select value={selectedType} onChange={handleTypeChange}>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="profile-card-holder">
        {filteredFestivals.length > 0 ? (
          filteredFestivals.map((festival) => (
            <FestCard key={festival._id} data={festival} />
          ))
        ) : (
          <p>No festivals found in this type</p>
        )}
      </div>
    </>
  );
}

const FestCard = ({ data }) => {
  return (
    <div className="fest-card">
      <h2 className="fest-name">{data.name}</h2>
      <p className="fest-type">Type: {data.type}</p>
      <p className="fest-description">{data.description}</p>
      <Link to={data._id}>
        <button>View More</button>
      </Link>
    </div>
  );
};
