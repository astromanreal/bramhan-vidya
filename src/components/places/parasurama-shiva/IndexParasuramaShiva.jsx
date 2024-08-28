import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import PlaceHeader from "../PlaceHeader";
import PlaceCard from "../PlaceCard";
import axios from "axios";

export default function IndexParasuramaShiva() {
  return (
    <>
      <PlaceHeader
        title="Parasurama Shiva Temples"
        desc="Explore the sacred and revered Parasurama Shiva temples, dedicated to Lord Shiva and associated with the legend of Parasurama. These temples are revered for their spiritual significance and historical importance."
      />
      <AllParasuramaShivaTemples />
      <GetRedirectLink text="Parasurama Shiva Temples" path="add" />
    </>
  );
}

export function AllParasuramaShivaTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/places/allParasuramaShiva`);
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Parasurama Shiva Temples";
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
