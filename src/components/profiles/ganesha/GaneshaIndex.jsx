import GetRedirectLink from "../../utils/GetRedirectLink";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function GaneshaIndex() {
  return (
    <>
      <ProfileHeader
        title="Avatars of Ganesha"
        desc="Explore the various forms of Ganesha, each with its unique characteristics and significance in Hindu mythology."
      />
      <AllGaneshaAvatars />
      <GetRedirectLink text="Ganesh forms" path="add-ganesha" />
    </>
  );
}

export function AllGaneshaAvatars() {
  const [ganeshaAvatars, setGaneshaAvatars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGaneshaAvatars = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allganesha`);
        if (data?.success) {
          setGaneshaAvatars(data.data);
          document.title = "List of Ganesha Avatars";
        } else {
          throw new Error("Failed to fetch Ganesha avatars data");
        }
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGaneshaAvatars();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (ganeshaAvatars.length === 0) {
    return <p>No Ganesha avatars found</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {ganeshaAvatars.map((avatar) => (
          <ProfileCard key={avatar._id} data={avatar} />
        ))}
      </div>
    </>
  );
}
