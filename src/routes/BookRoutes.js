import { Route } from "react-router-dom";
import IndexBook from "../components/books/IndexBook";
import DetailsBook from "../components/books/DetailsBook";
import AddBook from "../components/books/AddBook";
import UpdateBook from "../components/books/UpdateBook";
import AddBookNotes from "../components/books/AddBookNotes";
import DetailNoteBooks from "../components/books/DetailNoteBooks";
import UpdateNoteBooks from "../components/books/UpdateNoteBooks";

const bookRoutes = [
  <Route key="index-books" path="book" element={<IndexBook />} />,
  <Route key="Details-of-book" path="book/:id" element={<DetailsBook />} />,
  <Route key="add-book" path="book/add" element={<AddBook />} />,
  <Route key="update-book" path="book/update/:id" element={<UpdateBook />} />,
  <Route
    key="add-book-notes"
    path="book/:id/add-note"
    element={<AddBookNotes />}
  />,
  <Route
    key="detail-book-notes"
    path="book/note/:noteId"
    element={<DetailNoteBooks />}
  />,
  <Route
    key="update-book-notes"
    path="book/note/:noteId/update"
    element={<UpdateNoteBooks />}
  />,
];

export default bookRoutes;
