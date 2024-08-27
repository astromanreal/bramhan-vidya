import axios from "axios";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { useState, useEffect } from "react";
import GetRedirectLink from "../../utils/GetRedirectLink";

export default function GoddessIndex() {
  return (
    <>
      <ProfileHeader
        title="Goddesses of Hinduism"
        desc="Explore the divine goddesses of Hinduism, who embody various aspects of power, wisdom, and grace. Each goddess represents unique attributes and virtues, playing a significant role in the spiritual and cultural life of Hindu tradition. From the nurturing Lakshmi to the fierce Kali, these goddesses are celebrated for their diverse powers and influence in both cosmic and earthly realms."
      />

      <Allgoddess />
      <GetRedirectLink text="Devi" path="add-goddess" />
    </>
  );
}

export function Allgoddess() {
  const [goddesses, setGoddesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoddesses = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/profiles/allgoddess"
        );
        if (data?.success) {
          setGoddesses(data.data);
        } else {
          throw new Error("Failed to fetch goddesses");
        }
      } catch (err) {
        alert(err.message || "Failed to fetch goddesses");
      } finally {
        setLoading(false);
      }
    };

    fetchGoddesses();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {goddesses.length === 0 ? (
          <p>No goddesses found</p>
        ) : (
          goddesses.map((goddess) => (
            <>
              <ProfileCard key={goddess._id} data={goddess} />
            </>
          ))
        )}
      </div>
    </>
  );
}
