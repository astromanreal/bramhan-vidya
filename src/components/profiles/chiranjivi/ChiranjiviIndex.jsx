import { useState, useEffect } from "react";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { toast } from "react-hot-toast";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function ChiranjiviIndex() {
  return (
    <>
      <ProfileHeader
        title="Chiranjivis of Hinduism"
        desc="Discover the fascinating stories of Chiranjivis, the immortals of Hindu mythology. From the wise Ashwatthama to the devoted Vibhishana, each Chiranjivi has a unique tale of devotion, wisdom, and spiritual growth."
      />
      <AllChiranjivis />
    </>
  );
}
export function AllChiranjivis() {
  const [chiranjivis, setChiranjivis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchChiranjivis = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allchiranjivi`);
        if (data?.success) {
          setChiranjivis(data.data);
          const uniqueTypes = [
            ...new Set(data.data.map((chiranjivi) => chiranjivi.type)),
          ];
          setTypes(["All", ...uniqueTypes]);
          document.title = "List of Chiranjivis";
        } else {
          throw new Error("Failed to fetch Chiranjivis data");
        }
      } catch (err) {
        toast.error(err.message || "Error while getting the Chiranjivis");
      } finally {
        setLoading(false);
      }
    };

    fetchChiranjivis();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredChiranjivis =
    selectedType === "All"
      ? chiranjivis.filter((chiranjivi) =>
          chiranjivi.name.toLowerCase().includes(searchTerm)
        )
      : chiranjivis.filter(
          (chiranjivi) =>
            chiranjivi.type === selectedType &&
            chiranjivi.name.toLowerCase().includes(searchTerm)
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
        <select value={selectedType} onChange={handleTypeChange}>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="profile-card-holder">
        {filteredChiranjivis.length === 0 ? (
          <p>No Chiranjivis found matching your search criteria.</p>
        ) : (
          filteredChiranjivis.map((chiranjivi) => (
            <ProfileCard key={chiranjivi._id} data={chiranjivi} />
          ))
        )}
      </div>
    </>
  );
}
