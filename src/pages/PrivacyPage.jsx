import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SECTIONS = [
  { id:"collect",    title:"1. Information We Collect",       hindi:"हम क्या जानकारी इकट्ठा करते हैं",
    content:"We collect usage data (pages visited, browser type, IP address), Google Analytics data, cookies, and contact form submissions (name, email, message). We do NOT collect Aadhaar, PAN, or financial account details." },
  { id:"cookies",   title:"2. Cookies & Google AdSense",      hindi:"Cookies और Advertising",
    content:"PaisaPotli uses Google AdSense to display ads. Google uses cookies to serve ads based on your visits. You may opt out at: google.com/settings/ads. We also use Google Analytics cookies to understand traffic patterns." },
  { id:"use",       title:"3. How We Use Your Information",   hindi:"जानकारी का उपयोग",
    content:"We use data to improve website content, analyze traffic, respond to queries, and display relevant ads via Google AdSense. We do NOT sell, trade, or rent your personal information to third parties." },
  { id:"third",     title:"4. Third-Party Services",          hindi:"Third-Party Services",
    content:"We use: Google Analytics (analytics), Google AdSense (ads), Vercel (hosting), Google Fonts (typography). Each has their own privacy policy. Links: policies.google.com/privacy, vercel.com/legal/privacy-policy" },
  { id:"disclaimer",title:"5. Financial Disclaimer",          hindi:"वित्तीय अस्वीकरण — बहुत ज़रूरी", highlight: true,
    content:"IMPORTANT: PaisaPotli.com provides information for EDUCATIONAL PURPOSES ONLY. This is NOT financial, investment, or legal advice. Investments are subject to market risk. Past returns do not guarantee future returns. PaisaPotli.com is not SEBI registered. Consult a SEBI registered advisor before investing." },
  { id:"security",  title:"6. Data Security",                hindi:"Data Security",
    content:"Our website uses HTTPS encryption. We do not store sensitive financial data. However, no internet transmission is 100% secure. We cannot guarantee absolute security." },
  { id:"children",  title:"7. Children's Privacy",           hindi:"बच्चों की Privacy",
    content:"PaisaPotli.com is not directed to children under 13. We do not knowingly collect data from children under 13. Contact us at hello@paisapotli.com to remove such information." },
  { id:"changes",   title:"8. Changes to This Policy",       hindi:"Policy में बदलाव",
    content:"We may update this Privacy Policy. Changes will be posted on this page with an updated date. Continued use of our site after changes constitutes acceptance of the new policy." },
  { id:"contact",   title:"9. Contact Us",                   hindi:"हमसे संपर्क करें",
    content:"Questions about this Privacy Policy? Contact us: Email: hello@paisapotli.com | Website: paisapotli.com/contact | We respond within 2-3 business days." },
];

export default function PrivacyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#050a05", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

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
            <Link to="/about" style={{ color: "#64748b", textDecoration: "none", fontSize: "13px" }}>About</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "52px 20px 80px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "36px" }}>
          <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em" }}>Legal</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,46px)", fontWeight: "800", margin: "10px 0 14px" }}>Privacy Policy</h1>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", color: "#475569", background: "#0a0f0a", border: "1px solid #1a2e1a", padding: "5px 14px", borderRadius: "20px" }}>📅 Last Updated: January 2025</span>
            <span style={{ fontSize: "12px", color: "#475569", background: "#0a0f0a", border: "1px solid #1a2e1a", padding: "5px 14px", borderRadius: "20px" }}>🌐 paisapotli.com</span>
          </div>
        </motion.div>

        {/* Intro */}
        <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderLeft: "3px solid #10b981", borderRadius: "0 12px 12px 0", padding: "18px 22px", marginBottom: "32px" }}>
          <p style={{ color: "#a7f3d0", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
            PaisaPotli.com आपकी privacy को seriously लेता है। यह Privacy Policy बताती है कि हम आपकी जानकारी कैसे collect, use, और protect करते हैं।
          </p>
        </div>

        {/* Sections */}
        {SECTIONS.map((section, i) => (
          <motion.div key={section.id} id={section.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "20px", scrollMarginTop: "80px" }}>
            <div style={{
              background: section.highlight ? "rgba(245,158,11,0.06)" : "#0a0f0a",
              border: `1px solid ${section.highlight ? "rgba(245,158,11,0.2)" : "#1a2e1a"}`,
              borderRadius: "16px", padding: "22px"
            }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: section.highlight ? "#f59e0b" : "#fff", margin: "0 0 3px" }}>{section.title}</h2>
              <p style={{ fontSize: "11px", color: "#475569", margin: "0 0 12px" }}>{section.hindi}</p>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.8, margin: 0 }}>{section.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 20px", textAlign: "center" }}>
        <p style={{ color: "#1e3a2e", fontSize: "12px", margin: "0 0 8px" }}>© 2025 PaisaPotli.com — Made with ❤️ for India</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          {[["About","/about"],["Contact","/contact"],["Blog","/blog"],["Tools","/tools"]].map(([name,href]) => (
            <Link key={name} to={href} style={{ color: "#334155", textDecoration: "none", fontSize: "12px" }}>{name}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}