import GetRedirectLink from "../../utils/GetRedirectLink";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function GoddessIndex() {
  return (
    <>
      <ProfileHeader
        title="Goddesses of Hinduism"
        desc="Explore the divine goddesses of Hinduism, who embody various aspects of power, wisdom, and grace. Each goddess represents unique attributes and virtues, playing a significant role in the spiritual and cultural life of Hindu tradition. From the nurturing Lakshmi to the fierce Kali, these goddesses are celebrated for their diverse powers and influence in both cosmic and earthly realms."
      />

      <Allgoddess />
      <GetRedirectLink text="Devi" path="add-goddess" />
    </>
  );
}
export function Allgoddess() {
  const [goddesses, setGoddesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Add search term state

  useEffect(() => {
    const fetchGoddesses = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allgoddess`);
        if (data?.success) {
          setGoddesses(data.data);
        } else {
          throw new Error("Failed to fetch goddesses");
        }
      } catch (err) {
        alert(err.message || "Failed to fetch goddesses");
      } finally {
        setLoading(false);
      }
    };

    fetchGoddesses();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredGoddesses = goddesses.filter((goddess) =>
    goddess.name.toLowerCase().includes(searchTerm)
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
        {filteredGoddesses.length === 0 ? (
          <p>No goddesses found</p>
        ) : (
          filteredGoddesses.map((goddess) => (
            <ProfileCard key={goddess._id} data={goddess} />
          ))
        )}
      </div>
    </>
  );
}
