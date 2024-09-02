import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetUserId from "./GetUserId";
import apiUrl from "./GetApiUrl";
import axios from "axios";

export default function GetRedirectLink({ path, text }) {
  const [userRole, setUserRole] = useState(null);
  const token = localStorage.getItem("Token");

  useEffect(() => {
    if (token) {
      const userId = GetUserId();
      if (userId !== 0) {
        axios
          .get(`${apiUrl}/users/user/${userId}`)
          .then((response) => {
            setUserRole(response.data.role);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [token]);

  if (userRole === "admin") {
    return (
      <>
        <h3 className="missing-link">
          Did you notice any missing {text}? <Link to={path}> add here...</Link>
        </h3>
      </>
    );
  }
  if (userRole === "user") {
    return (
      <h3 className="missing-link">
        Want to add data? <Link to="/myprofile">Become an admin</Link> to unlock
        this feature!
      </h3>
    );
  }

  return (
    <h3 className="missing-link">
      <Link to="/user/signup">Create an account</Link> to get more freatures!
    </h3>
  );
}
