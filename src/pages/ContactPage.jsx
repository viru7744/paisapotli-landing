import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050a05", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
      <style>{`
        .cf-input { width:100%; background:#0a0f0a; border:1px solid #1a2e1a; border-radius:12px; padding:13px 16px; color:#fff; font-size:15px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; box-sizing:border-box; }
        .cf-input:focus { border-color:#10b981; }
        .cf-input::placeholder { color:#334155; }
        .cf-textarea { width:100%; background:#0a0f0a; border:1px solid #1a2e1a; border-radius:12px; padding:13px 16px; color:#fff; font-size:15px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; box-sizing:border-box; resize:vertical; min-height:130px; }
        .cf-textarea:focus { border-color:#10b981; }
        .cf-textarea::placeholder { color:#334155; }
        .cf-select { width:100%; background:#0a0f0a; border:1px solid #1a2e1a; border-radius:12px; padding:13px 16px; color:#fff; font-size:15px; font-family:'DM Sans',sans-serif; outline:none; cursor:pointer; box-sizing:border-box; -webkit-appearance:none; }
        .submit-btn { width:100%; background:#10b981; border:none; border-radius:12px; padding:16px; font-size:16px; font-weight:700; color:#fff; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .submit-btn:hover { background:#059669; }
        .submit-btn:disabled { background:#1a2e1a; color:#334155; cursor:not-allowed; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 20px", background: "rgba(5,10,5,0.97)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "34px", height: "34px", background: "#10b981", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", color: "#fff", fontSize: "16px" }}>₹</div>
            <span style={{ fontWeight: "700", color: "#fff", fontSize: "17px" }}>PaisaPotli</span>
          </Link>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/"        style={{ color: "#64748b", textDecoration: "none", fontSize: "13px" }}>Home</Link>
            <Link to="/tools"   style={{ color: "#64748b", textDecoration: "none", fontSize: "13px" }}>Tools</Link>
            <Link to="/blog"    style={{ color: "#64748b", textDecoration: "none", fontSize: "13px" }}>Blog</Link>
            <Link to="/contact" style={{ color: "#10b981", textDecoration: "none", fontSize: "13px", fontWeight: "600" }}>Contact</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "56px 20px 80px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "48px" }}>
          <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em" }}>Contact Us</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,48px)", fontWeight: "800", margin: "10px 0 14px", lineHeight: 1.15 }}>
            बात करो <span style={{ color: "#10b981", fontStyle: "italic" }}>हमसे</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", lineHeight: 1.7, maxWidth: "480px" }}>
            कोई सवाल है? Article suggestion? Bug report? हम हमेशा सुनते हैं।
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>

          {/* FORM */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            {!submitted ? (
              <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "20px", padding: "28px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#fff", margin: "0 0 22px" }}>Message भेजें</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>नाम *</label>
                      <input className="cf-input" placeholder="Aapka naam" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>Email *</label>
                      <input className="cf-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>Subject</label>
                    <select className="cf-select" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}>
                      <option value="">Topic choose karein...</option>
                      <option>General Question</option>
                      <option>Article Suggestion</option>
                      <option>Bug Report</option>
                      <option>Guest Post</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>Message *</label>
                    <textarea className="cf-textarea" placeholder="Apna message yahan likhein..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
                  </div>
                  <button className="submit-btn" onClick={handleSubmit} disabled={loading || !form.name || !form.email || !form.message}>
                    {loading ? "भेज रहे हैं..." : "Message भेजें ✉️"}
                  </button>
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "20px", padding: "40px 28px", textAlign: "center" }}>
                <span style={{ fontSize: "52px", display: "block", marginBottom: "16px" }}>✅</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: "700", color: "#fff", margin: "0 0 10px" }}>Message मिल गया!</h3>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.7, margin: "0 0 20px" }}>
                  Shukriya {form.name}! Hum 2-3 business days mein reply karenge {form.email} pe।
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981", padding: "10px 22px", borderRadius: "10px", cursor: "pointer", fontSize: "13px", fontWeight: "600", fontFamily: "'DM Sans',sans-serif" }}>
                  Naya Message Bhejein
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* INFO */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { emoji: "📧", label: "Email",    val: "hello@paisapotli.com", sub: "2-3 days mein reply" },
              { emoji: "🌐", label: "Website",  val: "paisapotli.com",       sub: "24/7 available"       },
              { emoji: "📍", label: "Location", val: "India",                sub: "Serving all of India" },
            ].map(c => (
              <div key={c.label} style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "14px", padding: "16px 18px", display: "flex", gap: "14px", alignItems: "center" }}>
                <div style={{ width: "44px", height: "44px", background: "rgba(16,185,129,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>{c.emoji}</div>
                <div>
                  <p style={{ fontSize: "11px", color: "#475569", margin: "0 0 2px", textTransform: "uppercase" }}>{c.label}</p>
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "#fff", margin: "0 0 1px" }}>{c.val}</p>
                  <p style={{ fontSize: "11px", color: "#334155", margin: 0 }}>{c.sub}</p>
                </div>
              </div>
            ))}

            <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "20px" }}>
              <p style={{ fontSize: "12px", color: "#10b981", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px" }}>FAQ</p>
              {[
                { q: "Kya PaisaPotli free hai?",           a: "Haan! Saare tools aur articles 100% free।" },
                { q: "Kya yeh financial advice hai?",       a: "Nahi। Sirf educational content। Advisor se consult karein।" },
                { q: "Guest post submit kar sakta hoon?",   a: "Haan! Email karein hello@paisapotli.com pe।" },
              ].map((faq, i, arr) => (
                <div key={i} style={{ paddingBottom: "10px", marginBottom: "10px", borderBottom: i < arr.length - 1 ? "1px solid #0d1a0d" : "none" }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#cbd5e1", margin: "0 0 3px" }}>Q: {faq.q}</p>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>A: {faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 20px", textAlign: "center" }}>
        <p style={{ color: "#1e3a2e", fontSize: "12px", margin: "0 0 8px" }}>© 2025 PaisaPotli.com — Made with ❤️ for India</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          {[["Privacy Policy","/privacy-policy"],["About","/about"],["Blog","/blog"],["Tools","/tools"]].map(([name,href]) => (
            <Link key={name} to={href} style={{ color: "#334155", textDecoration: "none", fontSize: "12px" }}>{name}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}