import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import PlaceHeader from "../PlaceHeader";
import PlaceCard from "../PlaceCard";
import axios from "axios";

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

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/places/allPanchaSabhai`);
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Pancha Sabhi Temples";
        } else {
          throw new Error("Failed to fetch temples data");
        }
      } catch (err) {
        alert(err.message);
      }
    };

    fetchTemples();
  }, []);

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
