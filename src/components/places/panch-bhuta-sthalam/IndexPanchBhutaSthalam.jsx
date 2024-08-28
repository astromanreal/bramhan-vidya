import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import PlaceHeader from "../PlaceHeader";
import PlaceCard from "../PlaceCard";
import axios from "axios";

export default function IndexPanchBhutaSthalam() {
  return (
    <>
      <PlaceHeader
        title="Panch Bhuta Sthalam Temples"
        desc="Explore the sacred and revered Panch Bhuta Sthalam temples, a group of five ancient Shiva temples in South India. These temples are revered for their spiritual significance and historical importance."
      />
      <AllPanchBhutaSthalamTemples />
      <GetRedirectLink text="Panch Bhuta Sthalam Temples" path="add" />
    </>
  );
}

export function AllPanchBhutaSthalamTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/places/allPanchaBhutaSthalam`
        );
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Panch Bhuta Sthalam Temples";
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
