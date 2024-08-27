import { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import GetRedirectLink from "../../utils/GetRedirectLink";

export default function NagaIndex() {
  return (
    <>
      <ProfileHeader
        title="Nagas of Hinduism"
        desc="Explore the mystical world of the Nagas, the serpent beings in Hindu mythology. Revered as divine entities with great spiritual significance, Nagas are often depicted as possessing both human and serpent attributes. They are associated with water, fertility, and protection and play key roles in various myths and legends. Their presence reflects the deep connection between the divine and the natural world."
      />
      <AllNagas />
      <GetRedirectLink text="Naga" path="add-naga" />
    </>
  );
}

export function AllNagas() {
  const [naga, setNagas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNagas = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/profiles/allnaga"
        );
        if (data?.success) {
          setNagas(data.data);
        } else {
          throw new Error("Failed to fetch Nagas");
        }
      } catch (err) {
        alert(err.message || "Error while fetching the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchNagas();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {naga.map((naga) => (
          <ProfileCard key={naga._id} data={naga} />
        ))}
      </div>
    </>
  );
}
