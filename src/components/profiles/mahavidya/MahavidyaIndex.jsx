import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { useEffect, useState } from "react";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function MahavidyaIndex() {
  return (
    <>
      <ProfileHeader
        title="Mahavidyas of Hinduism"
        desc="Explore the sacred and powerful Mahavidyas, a group of ten goddesses in Hinduism known for their profound spiritual significance and diverse attributes. Each Mahavidya embodies unique aspects of divine feminine power, wisdom, and protection, contributing to the rich tapestry of Hindu worship and philosophy."
      />
      <AllMahavidya />
    </>
  );
}
export function AllMahavidya() {
  const [mahavidyas, setMahavidyas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allmahavidya`);
        if (data?.success) {
          setMahavidyas(data.data);
          document.title = "All Mahavidyas";
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        alert(err.message || "Error while data fetching");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredMahavidyas = mahavidyas.filter((mahavidya) =>
    mahavidya.name.toLowerCase().includes(searchTerm)
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
        {filteredMahavidyas.length > 0 ? (
          filteredMahavidyas.map((mahavidya) => (
            <ProfileCard key={mahavidya._id} data={mahavidya} />
          ))
        ) : (
          <p>No Mahavidyas found</p>
        )}
      </div>
    </>
  );
}
