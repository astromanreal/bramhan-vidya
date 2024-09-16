import GetRedirectLink from "../../utils/GetRedirectLink";
import apiUrl from "../../utils/GetApiUrl";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShaktiIndex() {
  return (
    <>
      <ProfileHeader
        title="Shaktis of Hinduism"
        desc="Discover the diverse and powerful manifestations of Shakti, the divine feminine energy in Hinduism. Explore various aspects, attributes, and myths associated with Shakti, and learn about the significant temples and festivals dedicated to her."
      />
      <AllShakti />
      <GetRedirectLink text="Shakti" path="add-shakti" />
    </>
  );
}
export function AllShakti() {
  const [shaktis, setShaktis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allshakti`);
        if (data?.success) {
          setShaktis(data.data);
          document.title = "All Shaktis";
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        alert(err.message || "Error while fetching the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredShaktis = shaktis.filter((shakti) =>
    shakti.name.toLowerCase().includes(searchTerm)
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
        {filteredShaktis.length > 0 ? (
          filteredShaktis.map((shakti) => (
            <ProfileCard key={shakti._id} data={shakti} />
          ))
        ) : (
          <p>No Shaktis found</p>
        )}
      </div>
    </>
  );
}
