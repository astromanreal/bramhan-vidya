import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import PlaceHeader from "../PlaceHeader";
import PlaceCard from "../PlaceCard";
import axios from "axios";

export default function IndexMahaShaktiPitha() {
  return (
    <>
      <PlaceHeader
        title="Maha Shakti Pitha Temples"
        desc="Explore the sacred and revered Maha Shakti Pitha temples, a group of ancient temples in India. These temples are revered for their spiritual significance and historical importance."
      />
      <AllMahaShaktiPithaTemples />
      <GetRedirectLink text="Maha Shakti Pitha Temples" path="add" />
    </>
  );
}

export function AllMahaShaktiPithaTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/places/allMahaShaktiPitha`);
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Maha Shakti Pitha Temples";
        } else {
          throw new Error("Failed to fetch temples data");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemples();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  if (temples.length === 0) {
    return <p>No temples found</p>;
  }

  return (
    <>
      <div className="place-card-holder">
        {temples.map((temple) => (
          <PlaceCard data={temple} key={temple._id} />
        ))}
      </div>
    </>
  );
}
