import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import GetRedirectLink from "../../utils/GetRedirectLink";

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

  useEffect(() => {
    const fetchCreatures = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/profiles/allcreatures"
        );
        if (data?.success) {
          setCreatures(data.data);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {creatures.length === 0 ? (
          <p>No creatures found</p>
        ) : (
          <>
            {creatures.map((creature) => (
              <ProfileCard key={creature._id} data={creature} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
