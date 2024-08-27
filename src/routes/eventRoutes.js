import { Route } from "react-router-dom";
import AddEvent from "../components/events/AddEvent";
import DetailEvents from "../components/events/DetailEvents";
import UpdateEvent from "../components/events/UpdateEvent";
import IndexEvent from "../components/events/IndexEvent";
import AddNoteEvent from "../components/events/AddNoteEvent";
import DetailNoteEvent from "../components/events/DetailNoteEvent";
import UpdateNoteEvent from "../components/events/UpdateNoteEvent";

const eventRoutes = [
  <Route key="index-event" path="/event" element={<IndexEvent />} />,

  <Route key="add-event" path="/event/add" element={<AddEvent />} />,
  <Route key="detail-event" path="/event/:id" element={<DetailEvents />} />,
  <Route
    key="update-event"
    path="/event/update/:id"
    element={<UpdateEvent />}
  />,

  // note
  <Route
    key="add-event-note"
    path="/event/:id/add-note"
    element={<AddNoteEvent />}
  />,

  <Route
    key="detail-event-note"
    path="/event/note/:noteId"
    element={<DetailNoteEvent />}
  />,
  <Route
    key="update-event-note"
    path="/event/note/:noteId/update"
    element={<UpdateNoteEvent />}
  />,
];

export default eventRoutes;
