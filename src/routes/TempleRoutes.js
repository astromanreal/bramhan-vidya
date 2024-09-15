import { Route } from "react-router-dom";
import IndexTemple from "../components/temples/IndexTemple";
import AddTemple from "../components/temples/AddTemple";
import DetailsTemple from "../components/temples/DetailsTemple";
import UpdateTemple from "../components/temples/UpdateTemple";

const templeRoutes = [
  <Route key="Index-temple" path="/temple" element={<IndexTemple />} />,

  <Route key="Add-temple" path="/temple/add" element={<AddTemple />} />,
  <Route key="detail-temple" path="/temple/:id" element={<DetailsTemple />} />,
  <Route
    key="update-temple"
    path="/temple/update/:id"
    element={<UpdateTemple />}
  />,
];

export default templeRoutes;
