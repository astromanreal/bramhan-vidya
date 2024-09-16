import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function ModernIndex() {
  return (
    <>
      <ProfileHeader
        title="Modern Hindus"
        desc="Discover the influential figures of modern Hinduism who have made significant contributions to spiritual, philosophical, and social realms. These contemporary leaders, scholars, and reformers continue to inspire and guide through their teachings, writings, and actions. Their efforts shape the ongoing evolution of Hindu thought and practice in the modern world."
      />

      <Allmodern />
      <GetRedirectLink text="Modern Hindu peoples" path="add-modern" />
    </>
  );
}
export function Allmodern() {
  const [modernCharacters, setModernCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchModernCharacters = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allmodern`);
        if (data?.success) {
          setModernCharacters(data.data);
        } else {
          throw new Error("Failed to fetch modern characters");
        }
      } catch (err) {
        alert(
          err.message || "An error occurred while fetching modern characters"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchModernCharacters();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredModernCharacters = modernCharacters.filter((modern) =>
    modern.name.toLowerCase().includes(searchTerm)
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
      </div>
      <div className="profile-card-holder">
        {filteredModernCharacters.length > 0 ? (
          filteredModernCharacters.map((modern) => (
            <ProfileCard key={modern._id} data={modern} />
          ))
        ) : (
          <p>No modern characters found</p>
        )}
      </div>
    </>
  );
}
