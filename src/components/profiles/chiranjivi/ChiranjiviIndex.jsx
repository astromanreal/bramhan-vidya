import GetRedirectLink from "../../utils/GetRedirectLink";
import { useState, useEffect } from "react";
import ProfileCard from "../ProfileCard";
import ProfileHeader from "../ProfileHeader";
import { toast } from "react-hot-toast";
import apiUrl from "../../utils/GetApiUrl";
import axios from "axios";

export default function ChiranjiviIndex() {
  return (
    <>
      <ProfileHeader
        title="Chiranjivis of Hinduism"
        desc="Discover the fascinating stories of Chiranjivis, the immortals of Hindu mythology. From the wise Ashwatthama to the devoted Vibhishana, each Chiranjivi has a unique tale of devotion, wisdom, and spiritual growth."
      />
      <AllChiranjivis />
      <GetRedirectLink text="Chiranjivi" path="add-chiranjivi" />
    </>
  );
}

export function AllChiranjivis() {
  const [chiranjivis, setChiranjivis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChiranjivis = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allchiranjivi`);
        if (data?.success) {
          setChiranjivis(data.data);
          document.title = "List of Chiranjivis";
        } else {
          throw new Error("Failed to fetch Chiranjivis data");
        }
      } catch (err) {
        toast.error(err.message || "Error while getting the Chiranjivis");
      } finally {
        setLoading(false);
      }
    };

    fetchChiranjivis();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (chiranjivis.length === 0) {
    return <p>No Chiranjivis found</p>;
  }

  return (
    <>
      <div className="profile-card-holder">
        {chiranjivis.map((chiranjivi) => (
          <ProfileCard key={chiranjivi._id} data={chiranjivi} />
        ))}
      </div>
    </>
  );
}
