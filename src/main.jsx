import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ToolsPage from "./ToolsPage.jsx";
import BlogListPage from "./blog/BlogListPage.jsx";
import BlogPostPage from "./blog/BlogPostPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<App />} />
        <Route path="/tools"      element={<ToolsPage />} />
        <Route path="/blog"       element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);