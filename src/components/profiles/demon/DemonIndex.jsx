import axios from "axios";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import React, { useState, useEffect } from "react";
import GetRedirectLink from "../../utils/GetRedirectLink";

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

  useEffect(() => {
    const fetchDemons = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/profiles/alldemons"
        );
        if (data?.success) {
          setDemons(data.data);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {demons.length === 0 ? (
          <p>No demons found</p>
        ) : (
          <>
            {demons.map((demon) => (
              <ProfileCard key={demon._id} data={demon} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
