import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setInterval(() => {
      setCount(p => {
        if (p <= 1) { clearInterval(timer); window.location.href = "/"; return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#050a05", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

      {/* NAVBAR */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 20px", background: "rgba(5,10,5,0.97)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "34px", height: "34px", background: "#10b981", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", color: "#fff", fontSize: "16px" }}>₹</div>
            <span style={{ fontWeight: "700", color: "#fff", fontSize: "17px" }}>PaisaPotli</span>
          </Link>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/"      style={{ color: "#64748b", textDecoration: "none", fontSize: "13px" }}>Home</Link>
            <Link to="/tools" style={{ color: "#64748b", textDecoration: "none", fontSize: "13px" }}>Tools</Link>
            <Link to="/blog"  style={{ color: "#64748b", textDecoration: "none", fontSize: "13px" }}>Blog</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "60px 20px 80px", textAlign: "center" }}>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} style={{ marginBottom: "32px" }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: "20px" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(100px,20vw,160px)", fontWeight: "800", color: "rgba(16,185,129,0.08)", lineHeight: 1, display: "block", userSelect: "none" }}>404</span>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "clamp(48px,10vw,72px)" }}>
              🔍
            </motion.div>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,5vw,34px)", fontWeight: "800", margin: "0 0 12px", color: "#fff" }}>
            Yeh Page Nahi Mila!
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", lineHeight: 1.7, maxWidth: "440px", margin: "0 auto 8px" }}>
            Aapne jo page dhundha woh exist nahi karta ya URL galat hai।
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "20px", padding: "6px 16px", marginTop: "8px" }}>
            <span style={{ fontSize: "13px", color: "#64748b" }}>Home pe redirect ho raha hai</span>
            <span style={{ fontSize: "18px", fontWeight: "800", color: "#10b981", minWidth: "24px" }}>{count}</span>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "48px" }}>
          <Link to="/"      style={{ background: "#10b981", color: "#fff", padding: "13px 28px", borderRadius: "12px", textDecoration: "none", fontSize: "14px", fontWeight: "700" }}>🏠 Home Pe Jao</Link>
          <Link to="/tools" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981", padding: "13px 28px", borderRadius: "12px", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>🔢 Tools Dekhein</Link>
          <Link to="/blog"  style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", color: "#94a3b8", padding: "13px 28px", borderRadius: "12px", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>📖 Blog Padhein</Link>
        </motion.div>

        {/* Suggestions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <p style={{ fontSize: "12px", color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Popular Pages</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: "10px" }}>
            {[
              { emoji: "🔢", label: "SIP Calculator",   href: "/tools", desc: "Investment calculate karo" },
              { emoji: "📈", label: "IPO Tracker",       href: "/tools", desc: "Latest IPOs dekhein" },
              { emoji: "📖", label: "Finance Articles",  href: "/blog",  desc: "Hindi mein sikho" },
              { emoji: "🏆", label: "Crorepati Calc",    href: "/tools", desc: "Kab banunga crorepati?" },
            ].map(s => (
              <Link key={s.label} to={s.href} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "14px", padding: "16px 14px", textAlign: "center", transition: "all 0.2s" }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = "#166534"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = "#1a2e1a"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <span style={{ fontSize: "26px", display: "block", marginBottom: "8px" }}>{s.emoji}</span>
                  <p style={{ fontSize: "12px", fontWeight: "600", color: "#fff", margin: "0 0 3px" }}>{s.label}</p>
                  <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 20px", textAlign: "center" }}>
        <p style={{ color: "#1e3a2e", fontSize: "12px" }}>© 2025 PaisaPotli.com</p>
      </footer>
    </div>
  );
}