import { Route } from "react-router-dom";
import IndexOrganisation from "../components/organisations/IndexOrganisation";
import AddOrganisation from "../components/organisations/AddOrganisation";
import DetailsOrganisation from "../components/organisations/DetailsOrganisation";
import UpdateOrganisation from "../components/organisations/UpdateOrganisation";

const organisationRoutes = [
  <Route
    key="Index-organisation"
    path="/organisation"
    element={<IndexOrganisation />}
  />,

  <Route
    key="Add-organisation"
    path="/organisation/add"
    element={<AddOrganisation />}
  />,
  <Route
    key="detail-organisation"
    path="/organisation/:id"
    element={<DetailsOrganisation />}
  />,
  <Route
    key="update-organisation"
    path="/organisation/update/:id"
    element={<UpdateOrganisation />}
  />,
];

export default organisationRoutes;
