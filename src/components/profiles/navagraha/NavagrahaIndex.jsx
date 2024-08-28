import GetRedirectLink from "../../utils/GetRedirectLink";
import { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function NavagrahaIndex() {
  return (
    <>
      <ProfileHeader
        title="Navagrahas"
        desc="Explore the Navagrahas, the nine celestial deities in Hindu astrology. Each of these planets or deities is associated with specific aspects of life and has a significant impact on one's astrological chart. Learn about their attributes, symbolism, and influence on human affairs."
      />
      <AllNavagrahas />
      <GetRedirectLink text="Navagraha" path="add-navagraha" />
    </>
  );
}

export function AllNavagrahas() {
  const [navagrahas, setNavagrahas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allnavagraha`);
        if (data?.success) {
          setNavagrahas(data.data);
          document.title = "All Navagrahas";
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        alert(err.message || "Error while getting the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {navagrahas.length > 0 ? (
          navagrahas.map((navagraha) => (
            <ProfileCard key={navagraha._id} data={navagraha} />
          ))
        ) : (
          <p>No Navagrahas found</p>
        )}
      </div>
    </>
  );
}
