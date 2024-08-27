import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import GetRedirectLink from "../../utils/GetRedirectLink";

export default function ModernIndex() {
  return (
    <>
      <ProfileHeader
        title="Modern Hindus"
        desc="Discover the influential figures of modern Hinduism who have made significant contributions to spiritual, philosophical, and social realms. These contemporary leaders, scholars, and reformers continue to inspire and guide through their teachings, writings, and actions. Their efforts shape the ongoing evolution of Hindu thought and practice in the modern world."
      />

      <Allmodern />
      <GetRedirectLink text="Modern Hindu peoples" path="add-modern" />
    </>
  );
}

export function Allmodern() {
  const [modernCharacters, setModernCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModernCharacters = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/profiles/allmodern"
        );
        if (data?.success) {
          setModernCharacters(data.data);
        } else {
          throw new Error("Failed to fetch modern characters");
        }
      } catch (err) {
        alert(
          err.message || "An error occurred while fetching modern characters"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchModernCharacters();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {modernCharacters.map((modern) => (
          <ProfileCard key={modern._id} data={modern} />
        ))}
      </div>
    </>
  );
}
