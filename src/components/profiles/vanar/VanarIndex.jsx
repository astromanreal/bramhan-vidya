import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import ProfileHeader from "../ProfileHeader";
import ProfileCard from "../ProfileCard";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function VanarIndex() {
  return (
    <div>
      <ProfileHeader
        title="Vanaras of Hindu Mythology"
        desc="Explore the legendary Vanaras, the heroic monkey-like beings in Hindu
            mythology. Known for their incredible strength, loyalty, and
            intelligence, Vanaras played a crucial role in assisting Lord Rama
            during his quest to rescue Sita in the epic Ramayana."
      />
      <AllVanaras />
      <GetRedirectLink text="Vanara" path="add-vanar" />
    </div>
  );
}

export function AllVanaras() {
  const [vanaras, setVanaras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVanaras = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allvanara`);
        if (data?.success) {
          setVanaras(data.data);
          document.title = "List of Vanaras";
        } else {
          throw new Error("Failed to fetch vanaras data");
        }
      } catch (err) {
        alert(err.message || "Error while fetching the data");
      } finally {
        setLoading(false);
      }
    };

    fetchVanaras();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (vanaras.length === 0) {
    return <p>No vanaras found</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {vanaras.map((vanar) => (
          <ProfileCard key={vanar._id} data={vanar} />
        ))}
      </div>
    </>
  );
}
