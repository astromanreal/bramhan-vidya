import { useState, useEffect } from "react";
import apiUrl from "../utils/GetApiUrl";
import axios from "axios";
import "./Organisation.css";
import { Link } from "react-router-dom";
import GetRedirectLink from "../utils/GetRedirectLink";

export default function IndexOrganisation() {
  return (
    <>
      <AllOrganisation />
      <GetRedirectLink text="organisations" path="add" />
    </>
  );
}

export function AllOrganisation() {
  const [organisations, setOrganisations] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchAllOrganisations = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/organisations/allorganisations`
        );
        if (response.data.success) {
          setOrganisations(response.data.data);
          const uniqueTypes = [
            ...new Set(response.data.data.map((org) => org.type)),
          ];
          setTypes(["All", ...uniqueTypes]);
        } else {
          throw new Error("Failed to fetch Organisation lists");
        }
      } catch (error) {
        alert(error.message || "Error while getting the Data");
      }
    };
    fetchAllOrganisations();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredOrganisations =
    selectedType === "All"
      ? organisations
      : organisations.filter((org) => org.type === selectedType);

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
        {filteredOrganisations.length > 0 ? (
          filteredOrganisations.map((organisation) => (
            <OrgCard key={organisation._id} data={organisation} />
          ))
        ) : (
          <p>No organisations found in this type</p>
        )}
      </div>
    </>
  );
}

const OrgCard = ({ data }) => {
  return (
    <div className="org-card">
      <h2 className="org-name">{data.organisationName}</h2>
      <p className="org-type">Type: {data.type}</p>
      <p className="org-description">{data.description}</p>
      <Link to={data._id}>
        <button>View More</button>
      </Link>
    </div>
  );
};
