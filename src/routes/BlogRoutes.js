import { Route } from "react-router-dom";
import IndexBlog from "../components/blogs/IndexBlog";
import AddBlogs from "../components/blogs/AddBlogs";
import UpdateBlog from "../components/blogs/UpdateBlog";
import DetailBlog from "../components/blogs/DetailBlog";

const blogRoutes = [
  <Route key="index-blog" path="/blog" element={<IndexBlog />} />,
  <Route key="add-blog" path="/blog/add" element={<AddBlogs />} />,
  <Route key="update-blog" path="/blog/update/:id" element={<UpdateBlog />} />,
  <Route key="detail-blog" path="/blog/:id" element={<DetailBlog />} />,
];

export default blogRoutes;
