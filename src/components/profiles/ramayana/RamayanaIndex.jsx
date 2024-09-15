import GetRedirectLink from "../../utils/GetRedirectLink";
import ProfileHeader from "../ProfileHeader";
import ProfileCard from "../ProfileCard";
import apiUrl from "../../utils/GetApiUrl";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RamayanaIndex() {
  return (
    <>
      <ProfileHeader
        title="Characters of Ramayana"
        desc="Explore the legendary characters from the epic tale of Ramayana, a story of heroism, loyalty, and devotion."
      />
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

  const filteredCharacters =
    selectedRole === "All"
      ? ramayanaCharacters
      : ramayanaCharacters.filter(
          (character) => character.role === selectedRole
        );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (ramayanaCharacters.length === 0) {
    return <p>No Ramayana characters found</p>;
  }

  return (
    <>
      <div className="filter-data-container">
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
          <p>No characters found in this role</p>
        )}
      </div>
    </>
  );
}
