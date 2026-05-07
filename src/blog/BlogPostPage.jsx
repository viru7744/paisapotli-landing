import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { posts, categories } from "./blogData";

const catColor = (id) => categories.find(c => c.id === id)?.color || "#10b981";
const catLabel = (id) => categories.find(c => c.id === id)?.label || id;

function ContentBlock({ block }) {
  switch (block.type) {
    case "intro":
      return (
        <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderLeft: "3px solid #10b981", borderRadius: "0 12px 12px 0", padding: "16px 18px", marginBottom: "24px" }}>
          <p style={{ color: "#a7f3d0", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>{block.text}</p>
        </div>
      );
    case "heading":
      return (
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px,4vw,22px)", fontWeight: "700", color: "#fff", marginTop: "32px", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #1a2e1a" }}>
          {block.text}
        </h2>
      );
    case "para":
      return <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.8, marginBottom: "18px" }}>{block.text}</p>;
    case "highlight":
      return (
        <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "12px", padding: "14px 18px", marginBottom: "20px" }}>
          <p style={{ color: "#fcd34d", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{block.text}</p>
        </div>
      );
    case "list":
      return (
        <ul style={{ listStyle: "none", padding: 0, marginBottom: "20px" }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid #0d1a0d" }}>
              <span style={{ color: "#10b981", fontWeight: "700", flexShrink: 0, marginTop: "2px" }}>✓</span>
              <span style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.6 }}>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <div style={{ marginBottom: "24px" }}>
          {block.items.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "26px", height: "26px", background: "#10b981", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "12px", color: "#fff", flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "12px", padding: "12px 14px", flex: 1 }}>
                <p style={{ color: "#fff", fontWeight: "600", fontSize: "14px", margin: "0 0 3px" }}>{step.title}</p>
                <p style={{ color: "#64748b", fontSize: "13px", margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div style={{ overflowX: "auto", marginBottom: "24px", borderRadius: "12px", border: "1px solid #1a2e1a", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", minWidth: "400px" }}>
            <thead>
              <tr style={{ background: "#0d1a0d" }}>
                {block.headers.map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#64748b", fontWeight: "600", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #1a2e1a" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #0d1a0d" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "10px 14px", color: j === 0 ? "#cbd5e1" : "#94a3b8", fontWeight: j === 0 ? "500" : "400", whiteSpace: "nowrap" }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "conclusion":
      return (
        <div style={{ background: "linear-gradient(135deg,#0a1a0a,#0f2010)", border: "1px solid #1a3020", borderRadius: "16px", padding: "20px", marginTop: "28px", marginBottom: "8px" }}>
          <p style={{ fontSize: "11px", color: "#10b981", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>निष्कर्ष</p>
          <p style={{ color: "#a7f3d0", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{block.text}</p>
        </div>
      );
    default: return null;
  }
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  const related = posts.filter(p => p.slug !== slug && p.category === post?.category).slice(0, 2);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) return (
    <div style={{ minHeight: "100vh", background: "#050a05", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'DM Sans', sans-serif", padding: "20px" }}>
      <div style={{ fontSize: "56px", marginBottom: "16px" }}>🔍</div>
      <h1 style={{ fontSize: "22px", marginBottom: "8px" }}>Article नहीं मिला</h1>
      <Link to="/blog" style={{ color: "#10b981", textDecoration: "none" }}>← Blog पर वापस जाएं</Link>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#050a05", color: "#fff", fontFamily: "'DM Sans', sans-serif", paddingBottom: "80px" }}>
      <style>{`
        @media (max-width:640px) { .hide-mobile { display:none !important; } }
      `}</style>

      {/* Sticky Navbar */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 16px", position: "sticky", top: 0, background: "rgba(5,10,5,0.97)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "30px", height: "30px", background: "#10b981", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", color: "#fff", fontSize: "14px" }}>₹</div>
            <span style={{ fontWeight: "700", color: "#fff", fontSize: "15px" }}>PaisaPotli</span>
          </Link>
          <Link to="/blog" style={{ color: "#64748b", textDecoration: "none", fontSize: "13px", display: "flex", alignItems: "center", gap: "5px" }}>
            ← सभी Articles
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "28px 16px 40px" }}>

        {/* Article Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "28px" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px", fontSize: "11px", flexWrap: "wrap" }}>
            <Link to="/"    style={{ color: "#334155", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "#1e3a2e" }}>›</span>
            <Link to="/blog"style={{ color: "#334155", textDecoration: "none" }}>Blog</Link>
            <span style={{ color: "#1e3a2e" }}>›</span>
            <span style={{ color: "#10b981" }}>{catLabel(post.category)}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <span style={{ fontSize: "36px" }}>{post.emoji}</span>
            <span style={{ fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px",
              background: `${catColor(post.category)}20`, color: catColor(post.category), textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {catLabel(post.category)}
            </span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,5vw,38px)", fontWeight: "800", lineHeight: 1.2, marginBottom: "12px", color: "#fff" }}>
            {post.title}
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}>{post.excerpt}</p>

          <div style={{ display: "flex", gap: "16px", fontSize: "11px", color: "#334155", paddingBottom: "20px", borderBottom: "1px solid #0d1a0d", flexWrap: "wrap" }}>
            <span>📅 {post.date}</span>
            <span>⏱ {post.readTime} read</span>
            <span>✍️ PaisaPotli Team</span>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          {post.content.map((block, i) => <ContentBlock key={i} block={block} />)}
        </motion.article>

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg,#0a1a0a,#0d2010)", border: "1px solid #1a3020", borderRadius: "18px", padding: "22px", textAlign: "center", margin: "36px 0 28px" }}>
          <p style={{ fontSize: "16px", fontWeight: "700", color: "#fff", marginBottom: "6px" }}>यह article helpful लगा? 🙌</p>
          <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "18px" }}>
            इसे दोस्तों के साथ share करें और free tools try करें।
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/tools" style={{ background: "#10b981", color: "#fff", padding: "11px 20px", borderRadius: "10px", textDecoration: "none", fontSize: "13px", fontWeight: "600" }}>
              Free Tools →
            </Link>
            <Link to="/blog" style={{ background: "transparent", color: "#10b981", padding: "11px 20px", borderRadius: "10px", textDecoration: "none", fontSize: "13px", fontWeight: "600", border: "1px solid #166534" }}>
              और Articles
            </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <p style={{ fontSize: "11px", color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Related Articles</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "12px" }}>
              {related.map(rp => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "14px", padding: "16px", transition: "border-color 0.2s" }}
                    onMouseOver={e => e.currentTarget.style.borderColor = "#166634"}
                    onMouseOut={e => e.currentTarget.style.borderColor = "#1a2e1a"}>
                    <span style={{ fontSize: "22px", display: "block", marginBottom: "8px" }}>{rp.emoji}</span>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: "700", color: "#fff", lineHeight: 1.3, marginBottom: "8px" }}>{rp.title}</h4>
                    <span style={{ color: "#10b981", fontSize: "12px", fontWeight: "600" }}>पढ़ें →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(5,10,5,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "grid", gridTemplateColumns: "repeat(4,1fr)", padding: "8px 0" }}>
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