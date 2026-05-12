import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App          from "./App.jsx";
import ToolsPage    from "./ToolsPage.jsx";
import BlogListPage from "./blog/BlogListPage.jsx";
import BlogPostPage from "./blog/BlogPostPage.jsx";

// ── Naye 4 pages ──────────────────────────────────────────
import AboutPage    from "./pages/AboutPage.jsx";
import ContactPage  from "./pages/ContactPage.jsx";
import PrivacyPage  from "./pages/PrivacyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Purane routes — same hain */}
        <Route path="/"               element={<App />}          />
        <Route path="/tools"          element={<ToolsPage />}    />
        <Route path="/blog"           element={<BlogListPage />} />
        <Route path="/blog/:slug"     element={<BlogPostPage />} />

        {/* Naye routes — yeh 4 add karo */}
        <Route path="/about"          element={<AboutPage />}    />
        <Route path="/contact"        element={<ContactPage />}  />
        <Route path="/privacy-policy" element={<PrivacyPage />}  />
        <Route path="*"               element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);