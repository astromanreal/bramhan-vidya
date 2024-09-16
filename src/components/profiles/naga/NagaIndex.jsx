import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function NagaIndex() {
  return (
    <>
      <ProfileHeader
        title="Nagas of Hinduism"
        desc="Explore the mystical world of the Nagas, the serpent beings in Hindu mythology. Revered as divine entities with great spiritual significance, Nagas are often depicted as possessing both human and serpent attributes. They are associated with water, fertility, and protection and play key roles in various myths and legends. Their presence reflects the deep connection between the divine and the natural world."
      />
      <AllNagas />
      <GetRedirectLink text="Naga" path="add-naga" />
    </>
  );
}

export function AllNagas() {
  const [naga, setNagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNagas = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allnaga`);
        if (data?.success) {
          setNagas(data.data);
        } else {
          throw new Error("Failed to fetch Nagas");
        }
      } catch (err) {
        alert(err.message || "Error while fetching the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchNagas();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredNagas = naga.filter((naga) =>
    naga.name.toLowerCase().includes(searchTerm)
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
        {filteredNagas.length > 0 ? (
          filteredNagas.map((naga) => (
            <ProfileCard key={naga._id} data={naga} />
          ))
        ) : (
          <p>No Nagas found</p>
        )}
      </div>
    </>
  );
}
