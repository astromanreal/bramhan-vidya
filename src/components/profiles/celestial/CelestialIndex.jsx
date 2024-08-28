import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { toast } from "react-hot-toast";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function CelestialIndex() {
  return (
    <>
      <ProfileHeader
        title="Celestial Beings of Hinduism"
        desc="Discover the celestial beings of Hindu mythology, revered as divine entities that embody various aspects of cosmic order and divine powers. These beings, including the celestial guardians and celestial deities, play a crucial role in maintaining balance in the universe and are often invoked for blessings and protection. Their stories reflect the grandeur and mystical aspects of the divine cosmos."
      />
      <AllCelestial />
      <GetRedirectLink text="Celestial beings" path="add-celestial" />
    </>
  );
}

export function AllCelestial() {
  const [celestials, setCelestials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCelestials = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allcelestial`);
        if (data?.success) {
          setCelestials(data.data);
        } else {
          throw new Error("Failed to fetch celestial beings");
        }
      } catch (err) {
        toast.error(
          err.message || "An error occurred while fetching celestial beings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCelestials();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {celestials.length === 0 ? (
          <p>No celestial beings found.</p>
        ) : (
          <>
            {celestials.map((celestial) => (
              <ProfileCard key={celestial._id} data={celestial} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
