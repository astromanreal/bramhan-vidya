import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import PlaceHeader from "../PlaceHeader";
import PlaceCard from "../PlaceCard";
import axios from "axios";

export default function IndexShaktiPeeth() {
  return (
    <>
      <PlaceHeader
        title="Shakti Peeth Temples"
        desc="Explore the sacred and powerful Shakti Peeth temples, revered for their spiritual significance and historical importance. These temples embody the divine feminine energy of Goddess Shakti, who is worshipped in her various forms and avatars, each with a unique story and significance that continues to inspire and guide devotees around the world."
      />
      <AllShaktiPeethTemples />
      <GetRedirectLink text="Shakti Peeth Temples" path="add" />
    </>
  );
}

export function AllShaktiPeethTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/places/allShaktiPeeth`);
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Shakti Peeth Temples";
        } else {
          throw new Error("Failed to fetch temples data");
        }
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemples();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
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
