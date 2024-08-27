import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaceCard from "../PlaceCard";
import PlaceHeader from "../PlaceHeader";
import GetRedirectLink from "../../utils/GetRedirectLink";

export default function IndexPanchPrayag() {
  return (
    <>
      <PlaceHeader
        title="Panch Prayag Temples"
        desc="Explore the sacred and revered Panch Prayag temples, a group of five sacred confluences of rivers in Uttarakhand. These temples are revered for their spiritual significance and historical importance."
      />
      <AllPanchPrayagTemples />
      <GetRedirectLink text="Panch Prayag Temples" path="add" />
    </>
  );
}

export function AllPanchPrayagTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/places/allPanchPrayag"
        );
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Panch Prayag Temples";
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
