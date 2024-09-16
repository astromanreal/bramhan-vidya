import GetRedirectLink from "../../utils/GetRedirectLink";
import { useEffect, useState } from "react";
import ProfileHeader from "../ProfileHeader";
import apiUrl from "../../utils/GetApiUrl";
import ProfileCard from "../ProfileCard";
import axios from "axios";

export default function VishnuIndex() {
  return (
    <>
      <ProfileHeader
        title="Vishnu Avatars"
        desc="Discover the divine avatars of Vishnu, one of the principal deities of Hinduism. Each avatar represents different aspects of Vishnu's divine intervention in the world to restore cosmic order. From the heroic Rama and Krishna to the lesser-known avatars, explore their stories, significance, and impact on Hindu tradition."
      />
      <AllVishnu />
      <GetRedirectLink text="Vishnu avatar" path="add-vishnu" />
    </>
  );
}

export function AllVishnu() {
  const [vishnus, setVishnus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allvishnu`);
        if (data?.success) {
          setVishnus(data.data);
          document.title = "All Vishnu Avatars";
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        alert(err.message || "Error while fetching the data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredVishnus = vishnus.filter((vishnu) =>
    vishnu.name.toLowerCase().includes(searchTerm)
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
        {filteredVishnus.length > 0 ? (
          filteredVishnus.map((vishnu) => (
            <ProfileCard key={vishnu._id} data={vishnu} />
          ))
        ) : (
          <p>No Vishnu Avatars found</p>
        )}
      </div>
    </>
  );
}
