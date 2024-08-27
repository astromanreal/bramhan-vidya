import { Route } from "react-router-dom";
import DetailTopics from "../components/topics/DetailTopics";
import AddTopics from "../components/topics/AddTopics";
import UpdateTopics from "../components/topics/UpdateTopics";

const TopicRoutes = [
  <Route key="topic-add" path="/topic/add" element={<AddTopics />} />,
  <Route
    key="topic-update"
    path="/topic/update/:id"
    element={<UpdateTopics />}
  />,
  <Route key="topic-id" path="/topic/:id" element={<DetailTopics />} />,
];

export default TopicRoutes;
