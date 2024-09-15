import { useState, useEffect } from "react";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";
import "./Temple.css";
import { Link } from "react-router-dom";
import GetRedirectLink from "../utils/GetRedirectLink";

export default function IndexTemple() {
  return (
    <>
      <AllTemples />
      <GetRedirectLink text="temples" path="add" />
    </>
  );
}

export function AllTemples() {
  const [temples, setTemples] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchAllTemples = async () => {
      try {
        const response = await axios.get(`${apiUrl}/temples/alltemples`);
        if (response.data.success) {
          setTemples(response.data.data);
          const uniqueTypes = [
            ...new Set(response.data.data.map((temple) => temple.type)),
          ];
          setTypes(["All", ...uniqueTypes]);
        } else {
          throw new Error("Failed to fetch Temple lists");
        }
      } catch (error) {
        alert(error.message || "Error while getting the Data");
      }
    };
    fetchAllTemples();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredTemples =
    selectedType === "All"
      ? temples
      : temples.filter((temple) => temple.type === selectedType);

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
        {filteredTemples.length > 0 ? (
          filteredTemples.map((temple) => (
            <TempleCard key={temple._id} data={temple} />
          ))
        ) : (
          <p>No temples found in this type</p>
        )}
      </div>
    </>
  );
}

const TempleCard = ({ data }) => {
  return (
    <div className="temple-card">
      <h2 className="temple-name">{data.name}</h2>
      <p className="temple-type">Type: {data.type}</p>
      <p className="temple-description">{data.description}</p>
      <Link to={data._id}>
        <button>View More</button>
      </Link>
    </div>
  );
};
