import GetRedirectLink from "../../utils/GetRedirectLink";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function GaneshaIndex() {
  return (
    <>
      <ProfileHeader
        title="Avatars of Ganesha"
        desc="Explore the various forms of Ganesha, each with its unique characteristics and significance in Hindu mythology."
      />
      <AllGaneshaAvatars />
      <GetRedirectLink text="Ganesh forms" path="add-ganesha" />
    </>
  );
}

export function AllGaneshaAvatars() {
  const [ganeshaAvatars, setGaneshaAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Add search term state

  useEffect(() => {
    const fetchGaneshaAvatars = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allganesha`);
        if (data?.success) {
          setGaneshaAvatars(data.data);
          document.title = "List of Ganesha Avatars";
        } else {
          throw new Error("Failed to fetch Ganesha avatars data");
        }
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGaneshaAvatars();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredGaneshaAvatars = ganeshaAvatars.filter((avatar) =>
    avatar.name.toLowerCase().includes(searchTerm)
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
        {filteredGaneshaAvatars.length === 0 ? (
          <p>No Ganesha avatars found matching your search criteria.</p>
        ) : (
          filteredGaneshaAvatars.map((avatar) => (
            <ProfileCard key={avatar._id} data={avatar} />
          ))
        )}
      </div>
    </>
  );
}
