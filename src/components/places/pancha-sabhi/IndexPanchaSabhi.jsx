import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaceCard from "../PlaceCard";
import PlaceHeader from "../PlaceHeader";
import GetRedirectLink from "../../utils/GetRedirectLink";

export default function IndexPanchaSabhi() {
  return (
    <>
      <PlaceHeader
        title="Pancha Sabhi Temples"
        desc="Explore the sacred and revered Pancha Sabhi temples, a group of five ancient Shiva temples in Tamil Nadu. These temples are revered for their spiritual significance and historical importance."
      />
      <AllPanchaSabhiTemples />
      <GetRedirectLink text="Pancha Sabhi Temples" path="add" />
    </>
  );
}

export function AllPanchaSabhiTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/places/allPanchaSabhai"
        );
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Pancha Sabhi Temples";
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
