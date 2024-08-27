import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import GetRedirectLink from "../../utils/GetRedirectLink";

export default function RishiIndex() {
  return (
    <>
      <ProfileHeader
        title="Rishis of Hinduism"
        desc="Explore the profound wisdom of the Rishis, the ancient sages and seers of Hinduism. Known for their deep meditation and spiritual insights, these enlightened beings have contributed significantly to the Vedic scriptures and the spread of spiritual knowledge. Their teachings and stories continue to illuminate paths to enlightenment and inner peace."
      />
      <Allrishi />
      <GetRedirectLink text="Rishis" path="add-rishi" />
    </>
  );
}

export function Allrishi() {
  const [rishis, setRishis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://bramhan-vidya-api.vercel.app/profiles/allrishi"
        );
        if (data?.success) {
          setRishis(data.data);
          document.title = "All Rishis";
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
        {rishis.length > 0 ? (
          rishis.map((rishi) => <ProfileCard key={rishi._id} data={rishi} />)
        ) : (
          <p>No Rishis found</p>
        )}
      </div>
    </>
  );
}
