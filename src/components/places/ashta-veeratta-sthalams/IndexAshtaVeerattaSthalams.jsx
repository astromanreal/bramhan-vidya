import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import PlaceHeader from "../PlaceHeader";
import PlaceCard from "../PlaceCard";
import axios from "axios";

import apiUrl from "../../utils/GetApiUrl";

export default function IndexAshtaVeerattaSthalams() {
  return (
    <>
      <PlaceHeader
        title="Ashta Veeratta Sthalams Temples"
        desc="Explore the sacred and revered Ashta Veeratta Sthalams temples, a group of eight ancient temples in Tamil Nadu. These temples are revered for their spiritual significance and historical importance."
      />
      <AllAshtaVeerattaSthalamsTemples />
      <GetRedirectLink text="Ashta Veeratta Sthalams Temples" path="add" />
    </>
  );
}

export function AllAshtaVeerattaSthalamsTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/places/allAshtaVeerattaSthalam`
        );
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Ashta Veeratta Sthalams Temples";
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
