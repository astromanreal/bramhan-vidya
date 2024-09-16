import GetRedirectLink from "../../utils/GetRedirectLink";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function GodIndex() {
  return (
    <>
      <ProfileHeader
        title="Gods of Hinduism"
        desc="Discover the rich tapestry of Hindu mythology through the gods that
            embody various aspects of the universe. From the powerful Shiva to
            the benevolent Vishnu, each deity has a unique story and
            significance that continues to inspire and guide followers around
            the world."
      />
      <Allgods />
      <GetRedirectLink text="Gods" path="add-god" />
    </>
  );
}
export function Allgods() {
  const [gods, setGods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchGods = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allgods`);
        if (data?.success) {
          setGods(data.data);
          document.title = "List of Gods";
        } else {
          throw new Error("Failed to fetch gods data");
        }
      } catch (err) {
        alert(err.message || "Error while fetching gods data");
      } finally {
        setLoading(false);
      }
    };

    fetchGods();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredGods = gods.filter((god) =>
    god.name.toLowerCase().includes(searchTerm)
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
        {filteredGods.length === 0 ? (
          <p>No Gods found matching your search criteria.</p>
        ) : (
          filteredGods.map((god) => <ProfileCard key={god._id} data={god} />)
        )}
      </div>
    </>
  );
}
