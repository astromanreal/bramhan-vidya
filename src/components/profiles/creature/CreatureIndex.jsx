import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function CreatureIndex() {
  return (
    <>
      <ProfileHeader
        title="Creatures of Hinduism"
        desc="Explore the fascinating creatures of Hindu mythology, which include a diverse range of beings from mythical animals to fantastical entities. These creatures often possess symbolic meanings and play significant roles in various Hindu legends and epics. Their stories and characteristics reflect the rich imagination and spiritual depth of Hindu culture."
      />
      <Allcreature />
      <GetRedirectLink text="Creatures" path="add-creature" />
    </>
  );
}

export function Allcreature() {
  const [creatures, setCreatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchCreatures = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allcreatures`);
        if (data?.success) {
          setCreatures(data.data);
          const uniqueTypes = [
            ...new Set(data.data.map((creature) => creature.type)),
          ];
          setTypes(["All", ...uniqueTypes]);
        } else {
          throw new Error("Failed to fetch creatures");
        }
      } catch (err) {
        alert(err.message || "An error occurred while fetching creatures");
      } finally {
        setLoading(false);
      }
    };

    fetchCreatures();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredCreatures =
    selectedType === "All"
      ? creatures
      : creatures?.filter((creature) => creature.type === selectedType);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="filter-data-container">
        <select value={selectedType} onChange={handleTypeChange}>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="profile-card-holder">
        {filteredCreatures.length === 0 ? (
          <p>No creatures found of this type</p>
        ) : (
          filteredCreatures.map((creature) => (
            <ProfileCard key={creature._id} data={creature} />
          ))
        )}
      </div>
    </>
  );
}
