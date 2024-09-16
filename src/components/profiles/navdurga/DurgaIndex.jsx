import { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function DurgaIndex() {
  return (
    <>
      <ProfileHeader
        title="Goddesses of Hinduism"
        desc="Explore the divine manifestations of Durga, a powerful and revered goddess in Hinduism. Known for her strength, courage, and protection, Durga is worshipped in various forms across different regions. Her tales of victory over evil and her roles in festivals embody the essence of divine feminine power."
      />
      <AllDurga />
    </>
  );
}

export function AllDurga() {
  const [durgas, setDurgas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allnavdurga`);
        if (data?.success) {
          setDurgas(data.data);
          document.title = "All Durga Forms";
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

  const filteredDurgas = durgas.filter((durga) =>
    durga.name.toLowerCase().includes(searchTerm)
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
        {filteredDurgas.length > 0 ? (
          filteredDurgas.map((durga) => (
            <ProfileCard key={durga._id} data={durga} />
          ))
        ) : (
          <p>No Durga forms found</p>
        )}
      </div>
    </>
  );
}
