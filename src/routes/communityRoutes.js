import { Route } from "react-router-dom";
import IndexCommunity from "../components/community/IndexCommunity";
import AddCommunity from "./../components/community/AddCommunity";
import UpdateCommunity from "./../components/community/UpdateCommunity";
import DetailsCommunity from "./../components/community/DetailsCommunity";
import UpdatePost from "../components/community/UpdatePost";
import DetailPost from "../components/community/DetailPost";
import JoinCommunity from "../components/community/JoinCommunity";
import MyCommunity from "../components/community/MyCommunity";

const communityRoutes = [
  <Route key="community-index" path="community" element={<IndexCommunity />} />,
  <Route key="add-community" path="community/add" element={<AddCommunity />} />,
  <Route
    key="community-details"
    path="community/:id"
    element={<DetailsCommunity />}
  />,
  <Route
    key="update-community"
    path="community/update/:id"
    element={<UpdateCommunity />}
  />,

  // for post
  <Route
    key="detail-community-post"
    path="community/post/:id"
    element={<DetailPost />}
  />,
  <Route
    key="update-community-post"
    path="community/post/update/:id"
    element={<UpdatePost />}
  />,

  <Route
    key="join-community"
    path="community/join"
    element={<JoinCommunity />}
  />,

  <Route key="my-community" path="mycommunity" element={<MyCommunity />} />,
];
export default communityRoutes;
