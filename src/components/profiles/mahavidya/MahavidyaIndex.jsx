import GetRedirectLink from "../../utils/GetRedirectLink";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { useEffect, useState } from "react";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function MahavidyaIndex() {
  return (
    <>
      <ProfileHeader
        title="Mahavidyas of Hinduism"
        desc="Explore the sacred and powerful Mahavidyas, a group of ten goddesses in Hinduism known for their profound spiritual significance and diverse attributes. Each Mahavidya embodies unique aspects of divine feminine power, wisdom, and protection, contributing to the rich tapestry of Hindu worship and philosophy."
      />
      <AllMahavidya />
      <GetRedirectLink text="Mahavidyas" path="add-mahavidya" />
    </>
  );
}

export function AllMahavidya() {
  const [mahavidyas, setMahavidyas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allmahavidya`);
        if (data?.success) {
          setMahavidyas(data.data);
          document.title = "All Mahavidyas";
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        alert(err.message || "Error while data fetching");
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
        {mahavidyas.length > 0 ? (
          mahavidyas.map((mahavidya) => (
            <ProfileCard key={mahavidya._id} data={mahavidya} />
          ))
        ) : (
          <p>No Mahavidyas found</p>
        )}
      </div>
    </>
  );
}
