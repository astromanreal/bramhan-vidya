import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import ProfileHeader from "../ProfileHeader";
import apiUrl from "../../utils/GetApiUrl";
import ProfileCard from "../ProfileCard";
import axios from "axios";

export default function MahabharataIndex() {
  return (
    <>
      <ProfileHeader
        title="Characters of Mahabharata"
        desc="Explore the legendary characters from the epic tale of Mahabharata, a story of heroism, loyalty, and devotion."
      />
      <AllMahabharataCharacters />
      <GetRedirectLink text="Mahabharat Characters" path="add-mahabharat" />
    </>
  );
}
export function AllMahabharataCharacters() {
  const [mahabharataCharacters, setMahabharataCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("All");
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMahabharataCharacters = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allmahabharat`);
        if (data?.success) {
          setMahabharataCharacters(data.data);
          const uniqueRoles = [
            ...new Set(data.data.map((character) => character.role)),
          ];
          setRoles(["All", ...uniqueRoles]);
          document.title = "List of Mahabharata Characters";
        } else {
          throw new Error("Failed to fetch Mahabharata characters data");
        }
      } catch (err) {
        alert(err.message || "Error while getting the Mahabharat charecters");
      } finally {
        setLoading(false);
      }
    };

    fetchMahabharataCharacters();
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredMahabharataCharacters =
    selectedRole === "All"
      ? mahabharataCharacters.filter((character) =>
          character.name.toLowerCase().includes(searchTerm)
        )
      : mahabharataCharacters.filter(
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
        {filteredMahabharataCharacters.length === 0 ? (
          <p>No Mahabharata characters found matching your search criteria.</p>
        ) : (
          filteredMahabharataCharacters.map((character) => (
            <ProfileCard key={character._id} data={character} />
          ))
        )}
      </div>
    </>
  );
}
