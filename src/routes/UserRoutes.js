import { Route } from "react-router-dom";
import UserIndex, {
  ForgetPassword,
  UserLogin,
  UserSignUp,
} from "../components/users/UserIndex";
import MyProfile from "../components/users/MyProfile";
import UserProfile from "../components/users/UserProfile";

const UserRoutes = [
  <Route key="user-index" path="/user" element={<UserIndex />} />,
  <Route key="user-login" path="/user/login" element={<UserLogin />} />,
  <Route key="user-signup" path="/user/signup" element={<UserSignUp />} />,
  <Route key="my-profile" path="/myprofile" element={<MyProfile />} />,
  <Route key="user-profile" path="/user/:id" element={<UserProfile />} />,
  <Route
    key="user-forget-password"
    path="/user/forget-password"
    element={<ForgetPassword />}
  />,
];

export default UserRoutes;
