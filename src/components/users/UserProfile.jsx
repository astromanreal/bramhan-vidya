import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://bramhan-vidya-api.vercel.app/users/user/${id}`
        );
        setUser(response.data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <>
      <div id="user-profile-holder">
        <div id="user-basic-info">
          <h1>{user.username}</h1>
          <img src={user.avatar} alt="User Avatar" className="user-avatar" />
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </>
  );
}
