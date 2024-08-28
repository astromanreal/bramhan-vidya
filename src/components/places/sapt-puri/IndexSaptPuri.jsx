import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import PlaceHeader from "../PlaceHeader";
import apiUrl from "../../utils/GetApiUrl";
import PlaceCard from "../PlaceCard";
import axios from "axios";

export default function IndexSaptPuri() {
  return (
    <>
      <PlaceHeader
        title="Sapt Puri Temples"
        desc="Explore the sacred and revered Sapt Puri temples, considered to be the seven most sacred cities in Hinduism. These cities are believed to be the dwelling places of the gods and are revered for their spiritual significance and historical importance."
      />
      <AllSaptPuriTemples />
      <GetRedirectLink text="Sapt Puri Temples" path="add" />
    </>
  );
}

export function AllSaptPuriTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/places/allSaptPuri`);
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Sapt Puri Temples";
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
