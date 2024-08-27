import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaceCard from "../PlaceCard";
import PlaceHeader from "../PlaceHeader";
import GetRedirectLink from "../../utils/GetRedirectLink";

export default function IndexChotaCharDham() {
  return (
    <>
      <PlaceHeader
        title="Chota Char Dham Temples"
        desc="Explore the sacred and revered Chota Char Dham temples, a group of four ancient temples in Uttarakhand. These temples are revered for their spiritual significance and historical importance."
      />
      <AllChotaCharDhamTemples />
      <GetRedirectLink text="Chota Char Dham Temples" path="add" />
    </>
  );
}

export function AllChotaCharDhamTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/places/allChotaCharDham"
        );
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Chota Char Dham Temples";
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
