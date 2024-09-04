import "./App.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import Footer from "./components/home/Footer";
import ExplorePage from "./components/home/ExplorePage";
import Navbar from "./components/home/Navbar";
import Home from "./components/home/Home";
import Profiles from "./components/profiles/Profiles";
import PlacesIndex from "./components/places/PlacesIndex";
import UserRoutes from "./routes/UserRoutes";
import communityRoutes from "./routes/communityRoutes";
import ProfileRoutes from "./routes/ProfileRoutes";
import PlaceRoutes from "./routes/PlaceRoutes";
import TopicRoutes from "./routes/topicRoutes";
import bookRoutes from "./routes/BookRoutes";
import TechRoutes from "./routes/techRoutes";
import eventRoutes from "./routes/eventRoutes";
import blogRoutes from "./routes/BlogRoutes";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Toaster
        position="top-right"
        containerStyle={{
          top: "60px",
        }}
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
        <Route path="explore" element={<ExplorePage />} />
        <Route path="profile" element={<Profiles />} />
        <Route path="place" element={<PlacesIndex />} />
        {UserRoutes}
        {communityRoutes}
        {bookRoutes}
        {TechRoutes}
        {eventRoutes}
        {TopicRoutes}
        {blogRoutes}
        {ProfileRoutes}
        {PlaceRoutes}
      </Routes>
      <Footer />

      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
