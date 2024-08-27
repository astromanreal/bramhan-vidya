import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import GetRedirectLink from "../../utils/GetRedirectLink";

export default function VishnuIndex() {
  return (
    <>
      <ProfileHeader
        title="Vishnu Avatars"
        desc="Discover the divine avatars of Vishnu, one of the principal deities of Hinduism. Each avatar represents different aspects of Vishnu's divine intervention in the world to restore cosmic order. From the heroic Rama and Krishna to the lesser-known avatars, explore their stories, significance, and impact on Hindu tradition."
      />
      <AllVishnu />
      <GetRedirectLink text="Vishnu avatar" path="add-vishnu" />
    </>
  );
}

export function AllVishnu() {
  const [vishnus, setVishnus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/profiles/allvishnu"
        );
        if (data?.success) {
          setVishnus(data.data);
          document.title = "All Vishnu Avatars";
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        alert(err.message || "Error while fetching the data");
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
        {vishnus.length > 0 ? (
          vishnus.map((vishnu) => (
            <ProfileCard key={vishnu._id} data={vishnu} />
          ))
        ) : (
          <p>No Vishnu Avatars found</p>
        )}
      </div>
    </>
  );
}
