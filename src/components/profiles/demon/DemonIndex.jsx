import GetRedirectLink from "../../utils/GetRedirectLink";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function DemonIndex() {
  return (
    <>
      <ProfileHeader
        title="Demons of Hinduism"
        desc="Dive into the world of demons in Hindu mythology, where these beings often symbolize various obstacles and challenges faced by gods and humans alike. From the powerful Rakshasas to the cunning Asuras, these entities play crucial roles in Hindu epics and are central to many stories of divine battles and moral lessons. Their narratives illustrate the struggle between good and evil and offer insights into the complexity of cosmic forces."
      />

      <AllDemons />
      <GetRedirectLink text="Demons" path="add-demon" />
    </>
  );
}
export function AllDemons() {
  const [demons, setDemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("All");
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDemons = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/alldemons`);
        if (data?.success) {
          setDemons(data.data);
          const uniqueClasses = [
            ...new Set(data.data.map((demon) => demon.class)),
          ];
          setClasses(["All", ...uniqueClasses]);
        } else {
          throw new Error("Failed to fetch demons");
        }
      } catch (err) {
        alert(err.message || "An error occurred while fetching demons");
      } finally {
        setLoading(false);
      }
    };

    fetchDemons();
  }, []);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredDemons =
    selectedClass === "All"
      ? demons.filter((demon) => demon.name.toLowerCase().includes(searchTerm))
      : demons.filter(
          (demon) =>
            demon.class === selectedClass &&
            demon.name.toLowerCase().includes(searchTerm)
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
        <select value={selectedClass} onChange={handleClassChange}>
          {classes.map((classType) => (
            <option key={classType} value={classType}>
              {classType}
            </option>
          ))}
        </select>
      </div>
      <div className="profile-card-holder">
        {filteredDemons.length === 0 ? (
          <p>No demons found</p>
        ) : (
          filteredDemons.map((demon) => (
            <ProfileCard key={demon._id} data={demon} />
          ))
        )}
      </div>
    </>
  );
}
