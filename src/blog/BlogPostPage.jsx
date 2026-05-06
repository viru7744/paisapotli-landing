import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { posts, categories } from "./blogData";

const catColor = (id) => categories.find((c) => c.id === id)?.color || "#10b981";
const catLabel = (id) => categories.find((c) => c.id === id)?.label || id;

// ── Content Block Renderer ──────────────────────────────────────────────
function ContentBlock({ block }) {
  switch (block.type) {
    case "intro":
      return (
        <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderLeft: "3px solid #10b981", borderRadius: "0 12px 12px 0", padding: "18px 22px", marginBottom: "28px" }}>
          <p style={{ color: "#a7f3d0", fontSize: "16px", lineHeight: 1.7, margin: 0 }}>{block.text}</p>
        </div>
      );
    case "heading":
      return (
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: "700", color: "#fff", marginTop: "36px", marginBottom: "14px", paddingBottom: "8px", borderBottom: "1px solid #1a2e1a" }}>
          {block.text}
        </h2>
      );
    case "para":
      return <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.8, marginBottom: "20px" }}>{block.text}</p>;
    case "highlight":
      return (
        <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px" }}>
          <p style={{ color: "#fcd34d", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>{block.text}</p>
        </div>
      );
    case "list":
      return (
        <ul style={{ listStyle: "none", padding: 0, marginBottom: "24px" }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid #0d1a0d" }}>
              <span style={{ color: "#10b981", fontWeight: "700", flexShrink: 0, marginTop: "2px" }}>✓</span>
              <span style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.6 }}>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <div style={{ marginBottom: "28px" }}>
          {block.items.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "14px", alignItems: "flex-start" }}>
              <div style={{ width: "28px", height: "28px", background: "#10b981", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "13px", color: "#fff", flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "12px", padding: "12px 16px", flex: 1 }}>
                <p style={{ color: "#fff", fontWeight: "600", fontSize: "14px", margin: "0 0 4px" }}>{step.title}</p>
                <p style={{ color: "#64748b", fontSize: "13px", margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div style={{ overflowX: "auto", marginBottom: "28px", borderRadius: "14px", border: "1px solid #1a2e1a" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#0d1a0d" }}>
                {block.headers.map((h) => (
                  <th key={h} style={{ padding: "11px 16px", textAlign: "left", color: "#64748b", fontWeight: "600", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #1a2e1a" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #0d1a0d" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "11px 16px", color: j === 0 ? "#cbd5e1" : "#94a3b8", fontWeight: j === 0 ? "500" : "400" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "conclusion":
      return (
        <div style={{ background: "linear-gradient(135deg, #0a1a0a, #0f2010)", border: "1px solid #1a3020", borderRadius: "16px", padding: "24px", marginTop: "32px", marginBottom: "8px" }}>
          <p style={{ fontSize: "12px", color: "#10b981", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>निष्कर्ष</p>
          <p style={{ color: "#a7f3d0", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>{block.text}</p>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.slug === slug);
  const related = posts.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 2);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", background: "#050a05", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
        <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>Article नहीं मिला</h1>
        <Link to="/blog" style={{ color: "#10b981", textDecoration: "none" }}>← Blog पर वापस जाएं</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050a05", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 24px", position: "sticky", top: 0, background: "rgba(5,10,5,0.95)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "32px", height: "32px", background: "#10b981", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", color: "#fff" }}>₹</div>
            <span style={{ fontWeight: "700", color: "#fff", fontSize: "16px" }}>PaisaPotli</span>
          </Link>
          <Link to="/blog" style={{ color: "#64748b", textDecoration: "none", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
            ← सभी Articles
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Article Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "40px" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "12px" }}>
            <Link to="/" style={{ color: "#334155", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "#1e3a2e" }}>›</span>
            <Link to="/blog" style={{ color: "#334155", textDecoration: "none" }}>Blog</Link>
            <span style={{ color: "#1e3a2e" }}>›</span>
            <span style={{ color: "#10b981" }}>{catLabel(post.category)}</span>
          </div>

          {/* Category + emoji */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontSize: "40px" }}>{post.emoji}</span>
            <span style={{ fontSize: "12px", fontWeight: "700", padding: "4px 12px", borderRadius: "20px", background: `${catColor(post.category)}20`, color: catColor(post.category), textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {catLabel(post.category)}
            </span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: "800", lineHeight: 1.2, marginBottom: "16px", color: "#fff" }}>
            {post.title}
          </h1>

          <p style={{ color: "#64748b", fontSize: "16px", lineHeight: 1.7, marginBottom: "20px" }}>{post.excerpt}</p>

          {/* Meta */}
          <div style={{ display: "flex", gap: "20px", fontSize: "12px", color: "#334155", paddingBottom: "24px", borderBottom: "1px solid #0d1a0d" }}>
            <span>📅 {post.date}</span>
            <span>⏱ {post.readTime} read</span>
            <span>✍️ PaisaPotli Team</span>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </motion.article>

        {/* Share / CTA */}
        <div style={{ background: "linear-gradient(135deg, #0a1a0a, #0d2010)", border: "1px solid #1a3020", borderRadius: "20px", padding: "28px", textAlign: "center", margin: "48px 0 40px" }}>
          <p style={{ fontSize: "18px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
            यह article helpful लगा? 🙌
          </p>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
            इसे अपने दोस्तों के साथ share करें और हमारे free tools try करें।
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/tools" style={{ background: "#10b981", color: "#fff", padding: "10px 22px", borderRadius: "10px", textDecoration: "none", fontSize: "13px", fontWeight: "600" }}>
              Free Tools Try करें →
            </Link>
            <Link to="/blog" style={{ background: "transparent", color: "#10b981", padding: "10px 22px", borderRadius: "10px", textDecoration: "none", fontSize: "13px", fontWeight: "600", border: "1px solid #166534" }}>
              और Articles पढ़ें
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div>
            <p style={{ fontSize: "11px", color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Related Articles</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
              {related.map((rp) => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "14px", padding: "18px", transition: "border-color 0.2s" }}
                    onMouseOver={e => e.currentTarget.style.borderColor = "#166534"}
                    onMouseOut={e => e.currentTarget.style.borderColor = "#1a2e1a"}
                  >
                    <span style={{ fontSize: "24px", display: "block", marginBottom: "10px" }}>{rp.emoji}</span>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: "700", color: "#fff", lineHeight: 1.35, marginBottom: "8px" }}>{rp.title}</h4>
                    <span style={{ color: "#10b981", fontSize: "12px", fontWeight: "600" }}>पढ़ें →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ color: "#1e3a2e", fontSize: "13px" }}>© 2025 PaisaPotli.com — Made with ❤️ for India</p>
      </footer>
    </div>
  );
}