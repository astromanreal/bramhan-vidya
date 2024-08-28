import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import apiUrl from "../../utils/GetApiUrl";
import PlaceHeader from "../PlaceHeader";
import PlaceCard from "../PlaceCard";
import toast from "react-hot-toast";
import axios from "axios";

export default function IndexNatchathara() {
  return (
    <>
      <PlaceHeader
        title="Natchathara Temples"
        desc="Explore the sacred and revered Natchathara temples, a group of ancient temples in Tamil Nadu. These temples are revered for their spiritual significance and historical importance."
      />
      <AllNatchatharaTemples />
      <GetRedirectLink text="Natchathara Temples" path="add" />
    </>
  );
}

export function AllNatchatharaTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/places/allNatchatharaTemple`
        );
        if (data?.success) {
          setTemples(data.data);
          document.title = "List of Natchathara Temples";
        } else {
          throw new Error("Failed to fetch temples data");
        }
      } catch (err) {
        toast.error(err.message);
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
