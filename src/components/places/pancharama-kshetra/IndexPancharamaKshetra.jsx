import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import PlaceHeader from "../PlaceHeader";
import apiUrl from "../../utils/GetApiUrl";
import PlaceCard from "../PlaceCard";
import axios from "axios";

export default function IndexPancharamaKshetra() {
  return (
    <>
      <PlaceHeader
        title="Pancharama Kshetra Temples"
        desc="Explore the sacred and revered Pancharama Kshetra temples, a group of five ancient Shiva temples in Andhra Pradesh. These temples are revered for their spiritual significance and historical importance."
      />
      <AllPancharamaKshetraTemples />
      <GetRedirectLink text="Pancharama Kshetra Temples" path="add" />
    </>
  );
}

export function AllPancharamaKshetraTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/places/allPancharamaKshetra`
        );
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Pancharama Kshetra Temples";
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
