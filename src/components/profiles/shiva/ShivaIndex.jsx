import GetRedirectLink from "../../utils/GetRedirectLink";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { useEffect, useState } from "react";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function ShivaIndex() {
  return (
    <>
      <ProfileHeader
        title="Shiva Profiles"
        desc="Discover the divine aspects and profound stories of Lord Shiva, one of the principal deities in Hinduism. Known as the 'Destroyer' within the Holy Trinity (Trimurti), Shiva embodies both the destructive and regenerative aspects of the universe. Learn about his various forms, teachings, and the rich tapestry of legends associated with him."
      />
      <AllShiva />
      <GetRedirectLink text="shiva avatars" path="add-shiva" />
    </>
  );
}

export function AllShiva() {
  const [shivas, setShivas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allshiva`);
        if (data?.success) {
          setShivas(data.data);
          document.title = "All Shiva Profiles";
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        alert(err.message || "Error while Fetching the Data");
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
        {shivas.length > 0 ? (
          shivas.map((shiva) => <ProfileCard key={shiva._id} data={shiva} />)
        ) : (
          <p>No Shiva profiles found</p>
        )}
      </div>
    </>
  );
}
