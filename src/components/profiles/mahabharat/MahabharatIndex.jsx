import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import ProfileHeader from "../ProfileHeader";
import apiUrl from "../../utils/GetApiUrl";
import ProfileCard from "../ProfileCard";
import axios from "axios";

export default function MahabharataIndex() {
  return (
    <>
      <ProfileHeader
        title="Characters of Mahabharata"
        desc="Explore the legendary characters from the epic tale of Mahabharata, a story of heroism, loyalty, and devotion."
      />
      <AllMahabharataCharacters />
      <GetRedirectLink text="Mahabharat Characters" path="add-mahabharat" />
    </>
  );
}

export function AllMahabharataCharacters() {
  const [mahabharataCharacters, setMahabharataCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMahabharataCharacters = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allmahabharat`);
        if (data?.success) {
          setMahabharataCharacters(data.data);
          document.title = "List of Mahabharata Characters";
        } else {
          throw new Error("Failed to fetch Mahabharata characters data");
        }
      } catch (err) {
        alert(err.message || "Error while getting the Mahabharat charecters");
      } finally {
        setLoading(false);
      }
    };

    fetchMahabharataCharacters();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (mahabharataCharacters.length === 0) {
    return <p>No Mahabharata characters found</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {mahabharataCharacters.map((character) => (
          <ProfileCard key={character._id} data={character} />
        ))}
      </div>
    </>
  );
}
