import { useState, useEffect } from "react";
import axios from "axios";
import PlaceCard from "../PlaceCard";
import PlaceHeader from "../PlaceHeader";
import GetRedirectLink from "../../utils/GetRedirectLink";

export default function IndexSwayambhuVishnu() {
  return (
    <>
      <PlaceHeader
        title="Swayambhu Vishnu Temples"
        desc="Explore the ancient and sacred Swayambhu Vishnu temples, revered for their historical and spiritual significance. These temples embody the divine presence of Lord Vishnu, who is worshipped in his various forms and avatars, each with a unique story and significance that continues to inspire and guide devotees around the world."
      />
      <AllSwayambhuVishnuTemples />
      <GetRedirectLink text="Swayambhu Vishnu Temples" path="add" />
    </>
  );
}

export function AllSwayambhuVishnuTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/places/allSwayambhuVishnu"
        );
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Swayambhu Vishnu Temples";
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
