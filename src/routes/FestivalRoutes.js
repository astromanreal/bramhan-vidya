import { Route } from "react-router-dom";
import IndexFestival from "../components/festivals/IndexFestival";
import AddFestival from "../components/festivals/AddFestival";
import DetailsFestival from "../components/festivals/DetailsFestival";
import UpdateFestival from "../components/festivals/UpdateFestival";

const festivalRoutes = [
  <Route key="Index-festival" path="/festival" element={<IndexFestival />} />,

  <Route key="Add-festival" path="/festival/add" element={<AddFestival />} />,
  <Route
    key="detail-festival"
    path="/festival/:id"
    element={<DetailsFestival />}
  />,
  <Route
    key="update-festival"
    path="/festival/update/:id"
    element={<UpdateFestival />}
  />,
];

export default festivalRoutes;
