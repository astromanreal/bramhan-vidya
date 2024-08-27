import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Profiles from "./components/profiles/Profiles";
import PlacesIndex from "./components/places/PlacesIndex";
import UserRoutes from "./routes/UserRoutes";
import ProfileRoutes from "./routes/ProfileRoutes";
import PlaceRoutes from "./routes/PlaceRoutes";
import IndexTopics from "./components/topics/IndexTopics";
import TopicRoutes from "./routes/topicRoutes";
import communityRoutes from "./routes/communityRoutes";
import bookRoutes from "./routes/BookRoutes";
import TechRoutes from "./routes/techRoutes";
import eventRoutes from "./routes/eventRoutes";
import blogRoutes from "./routes/BlogRoutes";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        {UserRoutes}
        {communityRoutes}
        {bookRoutes}
        {TechRoutes}
        {eventRoutes}
        {blogRoutes}
        <Route path="profile" element={<Profiles />} />
        {ProfileRoutes}
        <Route path="place" element={<PlacesIndex />} />
        {PlaceRoutes}
        <Route path="topic" element={<IndexTopics />} />
        {TopicRoutes}
      </Routes>
    </>
  );
}

export default App;
