import GetRedirectLink from "../../utils/GetRedirectLink";
import apiUrl from "../../utils/GetApiUrl";
import PlaceCard from "../PlaceCard";
import PlaceHeader from "../PlaceHeader";
import { useState, useEffect } from "react";
import axios from "axios";

export default function IndexCharDham() {
  return (
    <>
      <PlaceHeader
        title="Char Dham Temples"
        desc="Explore the sacred and revered Char Dham temples, a group of four ancient temples in India. These temples are revered for their spiritual significance and historical importance."
      />
      <AllCharDhamTemples />
      <GetRedirectLink text="Char Dham Temples" path="add" />
    </>
  );
}

export function AllCharDhamTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/places/allCharDham`);
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Char Dham Temples";
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
    <div className="place-card-holder">
      {temples.map((temple) => (
        <PlaceCard data={temple} key={temple._id} />
      ))}
    </div>
  );
}
