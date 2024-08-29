import { jwtDecode } from "jwt-decode";

export default function GetUserId() {
  const token = localStorage.getItem("Token");
  if (!token) {
    return 0;
  }

  // Validate token format
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    console.error("Invalid token format");
    return 0;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.userId;
  } catch (error) {
    console.error("Error decoding token:", error);
    return 0;
  }
}
