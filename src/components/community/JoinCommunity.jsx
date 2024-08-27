import axios from "axios";
import { useParams } from "react-router-dom";
import GetUserId from "./../utils/GetUserId";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function JoinCommunity() {
  const { id } = useParams();
  const [isMember, setIsMember] = useState(null);

  useEffect(() => {
    const checkMembership = async () => {
      try {
        const response = await axios.get(
          `https://bramhan-vidya-api.vercel.app/community/community/${id}/check-membership`,
          {
            params: {
              userId: GetUserId(),
            },
          }
        );
        setIsMember(response.data.isMember);
      } catch (err) {
        toast.error(err.message);
      }
    };
    checkMembership();
  }, [id]);

  const handleJoin = async () => {
    try {
      const response = await axios.post(
        `https://bramhan-vidya-api.vercel.app/community/community/${id}/join`,
        {
          userId: GetUserId(),
        }
      );
      if (response.status === 200) {
        toast.success("Joined community successfully!");
        setIsMember(true);
      }
    } catch (err) {
      toast.error(err.message || "Failed to join community");
    }
  };
  return (
    <>{isMember ? "" : <button onClick={handleJoin}>Join Community</button>}</>
  );
}
