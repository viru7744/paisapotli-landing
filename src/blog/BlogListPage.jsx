import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { posts, categories } from "./blogData";

const catColor = (id) => categories.find((c) => c.id === id)?.color || "#10b981";
const catLabel = (id) => categories.find((c) => c.id === id)?.label || id;

export default function BlogListPage() {
  const [activecat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = activecat === "all" || p.category === activecat;
      const matchSearch =
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activecat, search]);

  const featured = posts.filter((p) => p.featured);

  return (
    <div
      style={{ minHeight: "100vh", background: "#050a05", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap" rel="stylesheet" />

      <style>{`
        .blog-card { transition: transform 0.2s, border-color 0.2s; }
        .blog-card:hover { transform: translateY(-4px); border-color: #166534 !important; }
        .cat-btn { cursor: pointer; border: 1px solid #1a2e1a; border-radius: 20px; padding: 6px 16px; font-size: 13px; font-weight: 500; transition: all 0.2s; background: transparent; color: #64748b; }
        .cat-btn:hover { color: #fff; border-color: #334155; }
        .cat-btn.active { color: #fff; border-color: transparent; }
        .search-input { background: #0a0f0a; border: 1px solid #1a2e1a; border-radius: 12px; padding: 10px 16px 10px 40px; color: #fff; font-size: 14px; width: 100%; outline: none; transition: border-color 0.2s; }
        .search-input:focus { border-color: #10b981; }
        .search-input::placeholder { color: #334155; }
        .read-more { color: #10b981; font-size: 13px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; transition: gap 0.2s; }
        .read-more:hover { gap: 8px; }
      `}</style>

      {/* Navbar */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: "36px", height: "36px", background: "#10b981", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", color: "#fff", fontSize: "18px" }}>₹</div>
            <span style={{ fontWeight: "700", color: "#fff", fontSize: "18px" }}>PaisaPotli</span>
          </Link>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Link to="/" style={{ color: "#64748b", textDecoration: "none", fontSize: "14px" }}>Home</Link>
            <Link to="/tools" style={{ color: "#64748b", textDecoration: "none", fontSize: "14px" }}>Tools</Link>
            <Link to="/blog" style={{ color: "#10b981", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>Blog</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "48px" }}>
          <span style={{ fontSize: "12px", color: "#10b981", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>PaisaPotli Blog</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: "800", marginTop: "8px", marginBottom: "12px", lineHeight: 1.1 }}>
            सीखो, समझो, <span style={{ color: "#10b981", fontStyle: "italic" }}>बढ़ाओ।</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "500px" }}>
            Finance की दुनिया — सरल हिंदी में। Stocks, SIP, Tax, Savings — सब कुछ यहाँ।
          </p>
        </motion.div>

        {/* Featured Posts */}
        {activecat === "all" && search === "" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>⭐ Featured</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
              {featured.map((post, i) => (
                <Link key={post.id} to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <motion.div
                    className="blog-card"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                    style={{ background: "linear-gradient(135deg, #0a1a0a, #0d1f0d)", border: "1px solid #1a3020", borderRadius: "20px", padding: "28px", cursor: "pointer", position: "relative", overflow: "hidden" }}
                  >
                    <div style={{ position: "absolute", top: "-20px", right: "-10px", fontSize: "80px", opacity: 0.08 }}>{post.emoji}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                      <span style={{ fontSize: "28px" }}>{post.emoji}</span>
                      <span style={{ fontSize: "11px", background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "3px 10px", borderRadius: "20px", fontWeight: "600" }}>
                        {catLabel(post.category)}
                      </span>
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: "700", color: "#fff", marginBottom: "10px", lineHeight: 1.3 }}>{post.title}</h2>
                    <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.6, marginBottom: "16px" }}>{post.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", color: "#334155" }}>📅 {post.date} · ⏱ {post.readTime}</span>
                      <span className="read-more">पढ़ें →</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search + Filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "32px" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#334155", fontSize: "16px" }}>🔍</span>
            <input
              className="search-input"
              placeholder="Article search करें..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Category Buttons */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`cat-btn ${activecat === cat.id ? "active" : ""}`}
                style={activecat === cat.id ? { background: cat.color, borderColor: cat.color, color: "#fff" } : {}}
                onClick={() => setActiveCat(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* All Posts Grid */}
        <p style={{ fontSize: "11px", color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
          {filtered.length} Articles
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#334155" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <p>कोई article नहीं मिला। दूसरा keyword try करें।</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {filtered.map((post, i) => (
              <Link key={post.id} to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <motion.div
                  className="blog-card"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "18px", padding: "22px", cursor: "pointer", height: "100%" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <span style={{ fontSize: "24px" }}>{post.emoji}</span>
                    <span style={{ fontSize: "11px", fontWeight: "600", padding: "2px 10px", borderRadius: "20px", background: `${catColor(post.category)}20`, color: catColor(post.category) }}>
                      {catLabel(post.category)}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: "700", color: "#fff", marginBottom: "8px", lineHeight: 1.35 }}>{post.title}</h3>
                  <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.6, marginBottom: "16px" }}>{post.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", color: "#1e3a2e" }}>⏱ {post.readTime}</span>
                    <span className="read-more" style={{ fontSize: "12px" }}>पढ़ें →</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 24px", textAlign: "center", marginTop: "64px" }}>
        <p style={{ color: "#1e3a2e", fontSize: "13px" }}>© 2025 PaisaPotli.com — Made with ❤️ for India</p>
      </footer>
    </div>
  );
}