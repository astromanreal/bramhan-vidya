import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import ProfileCard from "../ProfileCard";
import apiUrl from "../../utils/GetApiUrl";

import axios from "axios";

export default function RamayanaIndex() {
  return (
    <>
      <h1>Characters of Ramayana</h1>
      <AllRamayanaCharacters />
      <GetRedirectLink text="Ramayana Charecters" path="add-ramayana" />
    </>
  );
}

export function AllRamayanaCharacters() {
  const [ramayanaCharacters, setRamayanaCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("All");
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add search term state

  useEffect(() => {
    const fetchRamayanaCharacters = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allramayana`);
        if (data?.success) {
          setRamayanaCharacters(data.data);
          const uniqueRoles = [
            ...new Set(data.data.map((character) => character.role)),
          ];
          setRoles(["All", ...uniqueRoles]);
          document.title = "All Ramayana Characters";
        } else {
          throw new Error("Failed to fetch Ramayana characters data");
        }
      } catch (err) {
        alert(err.message || "Error while fetching the data");
      } finally {
        setLoading(false);
      }
    };

    fetchRamayanaCharacters();
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCharacters =
    selectedRole === "All"
      ? ramayanaCharacters.filter((character) =>
          character.name.toLowerCase().includes(searchTerm)
        )
      : ramayanaCharacters.filter(
          (character) =>
            character.role === selectedRole &&
            character.name.toLowerCase().includes(searchTerm)
        );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="filter-data-container">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search by name"
        />
        <select value={selectedRole} onChange={handleRoleChange}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="profile-card-holder">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <ProfileCard key={character._id} data={character} />
          ))
        ) : (
          <p>No characters found </p>
        )}
      </div>
    </>
  );
}
