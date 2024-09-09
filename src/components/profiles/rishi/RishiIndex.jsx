import GetRedirectLink from "../../utils/GetRedirectLink";
import ProfileHeader from "../ProfileHeader";
import apiUrl from "../../utils/GetApiUrl";
import ProfileCard from "../ProfileCard";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/profiles/allrishi`);
        if (data?.success) {
          setRishis(data.data);
          const uniqueCategories = [
            ...new Set(data.data.map((rishi) => rishi.class)),
          ];
          setCategories(["All", ...uniqueCategories]);
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredRishis =
    selectedCategory === "All"
      ? rishis
      : rishis.filter((rishi) => rishi.class === selectedCategory);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="filter-data-container">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="profile-card-holder">
        {filteredRishis.length > 0 ? (
          filteredRishis.map((rishi) => (
            <ProfileCard key={rishi._id} data={rishi} />
          ))
        ) : (
          <p>No Rishis found in this category</p>
        )}
      </div>
    </>
  );
}

// export function Allrishi() {
//   const [rishis, setRishis] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get(`${apiUrl}/profiles/allrishi`);
//         if (data?.success) {
//           setRishis(data.data);
//           document.title = "All Rishis";
//         } else {
//           throw new Error("Failed to fetch data");
//         }
//       } catch (err) {
//         alert(err.message || "Error while fetching the Data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <div className="profile-card-holder">
//         {rishis.length > 0 ? (
//           rishis.map((rishi) => <ProfileCard key={rishi._id} data={rishi} />)
//         ) : (
//           <p>No Rishis found</p>
//         )}
//       </div>
//     </>
//   );
// }
