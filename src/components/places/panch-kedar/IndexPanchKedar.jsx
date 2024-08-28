import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import PlaceHeader from "../PlaceHeader";
import PlaceCard from "../PlaceCard";
import axios from "axios";

export default function IndexPanchKedar() {
  return (
    <>
      <PlaceHeader
        title="Panch Kedar Temples"
        desc="Explore the sacred and revered Panch Kedar temples, a group of five ancient Shiva temples in Uttarakhand. These temples are revered for their spiritual significance and historical importance."
      />
      <AllPanchKedarTemples />
      <GetRedirectLink text="Panch Kedar Temples" path="add" />
    </>
  );
}

export function AllPanchKedarTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/places/allPanchKedar`);
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Panch Kedar Temples";
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
