import { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import GetRedirectLink from "../../utils/GetRedirectLink";

export default function RamayanaIndex() {
  return (
    <>
      <ProfileHeader
        title="Characters of Ramayana"
        desc="Explore the legendary characters from the epic tale of Ramayana, a story of heroism, loyalty, and devotion."
      />
      <AllRamayanaCharacters />
      <GetRedirectLink text="Ramayana Charecters" path="add-ramayana" />
    </>
  );
}

export function AllRamayanaCharacters() {
  const [ramayanaCharacters, setRamayanaCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRamayanaCharacters = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/profiles/allramayana"
        );
        if (data?.success) {
          setRamayanaCharacters(data.data);
          document.title = "All Ramayana Characters";
        } else {
          throw new Error("Failed to fetch Ramayana characters data");
        }
      } catch (err) {
        alert(err.message || "Error while fetching the data");
      } finally {
        setLoading(false);
      }
    };

    fetchRamayanaCharacters();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (ramayanaCharacters.length === 0) {
    return <p>No Ramayana characters found</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {ramayanaCharacters.map((character) => (
          <ProfileCard key={character._id} data={character} />
        ))}
      </div>
    </>
  );
}
