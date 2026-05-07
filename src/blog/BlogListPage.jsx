import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { posts, categories } from "./blogData";

const catColor = (id) => categories.find(c => c.id === id)?.color || "#10b981";
const catLabel = (id) => categories.find(c => c.id === id)?.label || id;

export default function BlogListPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => posts.filter(p => {
    const matchCat = activeCat === "all" || p.category === activeCat;
    const matchSearch = search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }), [activeCat, search]);

  const featured = posts.filter(p => p.featured);

  return (
    <div style={{ minHeight: "100vh", background: "#050a05", color: "#fff", fontFamily: "'DM Sans', sans-serif", paddingBottom: "80px" }}>
      <style>{`
        .blog-card { transition: transform 0.2s, border-color 0.2s; }
        .blog-card:hover { border-color: #166534 !important; }
        @media (hover:hover) { .blog-card:hover { transform: translateY(-3px); } }
        .blog-card:active { transform: scale(0.98); }
        .search-box { background:#0a0f0a; border:1px solid #1a2e1a; border-radius:12px; padding:12px 16px 12px 42px; color:#fff; font-size:16px; width:100%; outline:none; box-sizing:border-box; -webkit-appearance:none; }
        .search-box:focus { border-color:#10b981; }
        .cat-btn { cursor:pointer; border:1px solid #1a2e1a; border-radius:20px; padding:8px 16px; font-size:13px; font-weight:500; transition:all 0.2s; background:transparent; color:#64748b; white-space:nowrap; -webkit-tap-highlight-color:transparent; }
        .cat-btn:active { transform:scale(0.95); }
      `}</style>

      {/* Navbar */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 16px", background: "rgba(5,10,5,0.97)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "32px", height: "32px", background: "#10b981", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", color: "#fff" }}>₹</div>
            <span style={{ fontWeight: "700", color: "#fff", fontSize: "16px" }}>PaisaPotli</span>
          </Link>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Link to="/"     style={{ color: "#64748b", textDecoration: "none", fontSize: "13px" }}>Home</Link>
            <Link to="/tools"style={{ color: "#64748b", textDecoration: "none", fontSize: "13px" }}>Tools</Link>
            <Link to="/blog" style={{ color: "#10b981", textDecoration: "none", fontSize: "13px", fontWeight: "600" }}>Blog</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 16px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "32px" }}>
          <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>PaisaPotli Blog</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,7vw,52px)", fontWeight: "800", margin: "8px 0 10px", lineHeight: 1.1 }}>
            सीखो, समझो, <span style={{ color: "#10b981", fontStyle: "italic" }}>बढ़ाओ।</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", maxWidth: "460px" }}>
            Finance की दुनिया — सरल हिंदी में। Stocks, SIP, Tax, Savings — सब कुछ यहाँ।
          </p>
        </motion.div>

        {/* Featured */}
        {activeCat === "all" && search === "" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: "32px" }}>
            <p style={{ fontSize: "11px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>⭐ Featured</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "12px" }}>
              {featured.map((post, i) => (
                <Link key={post.id} to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div className="blog-card"
                    style={{ background: "linear-gradient(135deg,#0a1a0a,#0d1f0d)", border: "1px solid #1a3020", borderRadius: "18px", padding: "22px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: "-15px", right: "-5px", fontSize: "70px", opacity: 0.07 }}>{post.emoji}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <span style={{ fontSize: "24px" }}>{post.emoji}</span>
                      <span style={{ fontSize: "10px", background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "3px 10px", borderRadius: "20px", fontWeight: "600" }}>
                        {catLabel(post.category)}
                      </span>
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: "700", color: "#fff", marginBottom: "8px", lineHeight: 1.3 }}>{post.title}</h2>
                    <p style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.6, marginBottom: "14px" }}>{post.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", color: "#334155" }}>📅 {post.date} · ⏱ {post.readTime}</span>
                      <span style={{ color: "#10b981", fontSize: "13px", fontWeight: "600" }}>पढ़ें →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>🔍</span>
            <input className="search-box" placeholder="Article search करें..." value={search}
              onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Category Filter — horizontal scroll on mobile */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px", marginBottom: "20px", scrollbarWidth: "none" }}>
          {categories.map(cat => (
            <button key={cat.id} className="cat-btn"
              style={activeCat === cat.id ? { background: cat.color, borderColor: cat.color, color: "#fff" } : {}}
              onClick={() => setActiveCat(cat.id)}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles count */}
        <p style={{ fontSize: "11px", color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>
          {filtered.length} Articles
        </p>

        {/* Articles Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#334155" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
            <p style={{ fontSize: "14px" }}>कोई article नहीं मिला। दूसरा keyword try करें।</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "12px" }}>
            {filtered.map((post, i) => (
              <Link key={post.id} to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <motion.div className="blog-card"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "18px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "22px" }}>{post.emoji}</span>
                    <span style={{ fontSize: "10px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px",
                      background: `${catColor(post.category)}20`, color: catColor(post.category) }}>
                      {catLabel(post.category)}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: "700", color: "#fff", marginBottom: "6px", lineHeight: 1.35, flex: 1 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5, marginBottom: "12px" }}>{post.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid #0d1a0d" }}>
                    <span style={{ fontSize: "11px", color: "#1e3a2e" }}>⏱ {post.readTime}</span>
                    <span style={{ color: "#10b981", fontSize: "12px", fontWeight: "600" }}>पढ़ें →</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(5,10,5,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "grid", gridTemplateColumns: "repeat(4,1fr)", padding: "8px 0" }}>
        {[
          { label: "Home",  icon: "🏠", href: "/" },
          { label: "Tools", icon: "🔢", href: "/tools" },
          { label: "Blog",  icon: "📖", href: "/blog", active: true },
          { label: "P&L",   icon: "📈", href: "/#tool" },
        ].map(item => (
          <a key={item.label} href={item.href}
            style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", padding: "4px", gap: "2px" }}>
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            <span style={{ fontSize: "10px", color: item.active ? "#10b981" : "#64748b", fontWeight: item.active ? "600" : "400" }}>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}