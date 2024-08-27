import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import GetRedirectLink from "../../utils/GetRedirectLink";

export default function DurgaIndex() {
  return (
    <>
      <ProfileHeader
        title="Goddesses of Hinduism"
        desc="Explore the divine manifestations of Durga, a powerful and revered goddess in Hinduism. Known for her strength, courage, and protection, Durga is worshipped in various forms across different regions. Her tales of victory over evil and her roles in festivals embody the essence of divine feminine power."
      />
      <AllDurga />
      <GetRedirectLink text="Durga forms" path="add-durga" />
    </>
  );
}

export function AllDurga() {
  const [durgas, setDurgas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/profiles/allnavdurga"
        );
        if (data?.success) {
          setDurgas(data.data);
          document.title = "All Durga Forms";
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        alert(err.message || "Error while fetching the Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {durgas.length > 0 ? (
          durgas.map((durga) => <ProfileCard key={durga._id} data={durga} />)
        ) : (
          <p>No Durga forms found</p>
        )}
      </div>
    </>
  );
}
