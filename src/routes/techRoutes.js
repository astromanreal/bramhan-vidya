import { Route } from "react-router-dom";

import AddTech from "../components/tech/AddTech";
import IndexTech from "../components/tech/IndexTech";
import DetailsTech from "../components/tech/DetailsTech";
import UpdateTech from "../components/tech/UpdateTech";

const TechRoutes = [
  <Route key="index-tech" path="/tech" element={<IndexTech />} />,
  <Route key="add-tech" path="/tech/add" element={<AddTech />} />,
  <Route key="detail-tech" path="/tech/:id" element={<DetailsTech />} />,
  <Route key="update-tech" path="/tech/update/:id" element={<UpdateTech />} />,
];

export default TechRoutes;
