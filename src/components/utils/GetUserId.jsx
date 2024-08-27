import { jwtDecode } from "jwt-decode";

export default function GetUserId() {
  const token = localStorage.getItem("Token");
  if (!token) {
    return 0;
  }
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.userId;
  } catch (error) {
    alert(error.message || "Error while decoding the Token");
    return 0;
  }
}
