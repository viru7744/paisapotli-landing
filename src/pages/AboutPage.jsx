import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

const STATS = [
  { n: "50,000+", l: "Monthly Readers", icon: "👥" },
  { n: "9",       l: "Free Tools",      icon: "🔢" },
  { n: "4+",      l: "Articles",        icon: "📝" },
  { n: "100%",    l: "Hindi Content",   icon: "🇮🇳" },
];

const VALUES = [
  { emoji: "🎯", title: "Sach bolte hain",    desc: "Koi fake returns promise nahi। Sirf honest, research-backed information।" },
  { emoji: "🧠", title: "Simplicity pehle",  desc: "Finance complex nahi hona chahiye। Hum har concept simple banate hain।" },
  { emoji: "🆓", title: "Hamesha Free",       desc: "Saare tools, saare articles — bilkul free। Financial education sabka haq hai।" },
  { emoji: "🇮🇳", title: "India ke liye",     desc: "NSE, BSE, Indian tax laws, Indian mutual funds — sab India-focused।" },
];

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#050a05", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap" rel="stylesheet" />

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
            <Link to="/about" style={{ color: "#10b981", textDecoration: "none", fontSize: "13px", fontWeight: "600" }}>About</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "60px 20px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", background: "rgba(16,185,129,0.06)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em" }}>हमारे बारे में</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px,6vw,54px)", fontWeight: "800", margin: "10px 0 16px", lineHeight: 1.15 }}>
              Finance को <span style={{ color: "#10b981", fontStyle: "italic" }}>सरल</span> बनाने का सफर
            </h1>
            <p style={{ color: "#64748b", fontSize: "clamp(14px,3vw,17px)", lineHeight: 1.75, maxWidth: "540px", margin: "0 auto" }}>
              PaisaPotli एक ऐसे idea से शुरू हुआ — India में करोड़ों लोग finance समझना चाहते हैं, लेकिन सब English में है। तो क्यों न हिंदी में बनाएं?
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: "12px", maxWidth: "600px", margin: "40px auto 0" }}>
          {STATS.map(s => (
            <div key={s.l} style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "20px 12px", textAlign: "center" }}>
              <span style={{ fontSize: "26px", display: "block", marginBottom: "6px" }}>{s.icon}</span>
              <p style={{ fontSize: "20px", fontWeight: "800", color: "#10b981", margin: "0 0 3px" }}>{s.n}</p>
              <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>{s.l}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* STORY */}
      <section style={{ padding: "72px 20px", maxWidth: "760px", margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: "800", margin: "0 0 24px", lineHeight: 1.2 }}>
            क्यों बनाया PaisaPotli?
          </h2>
        </FadeIn>
        {[
          { emoji: "😕", heading: "Problem देखा",   text: "India में 80% लोग FD में पैसे रखते हैं — क्योंकि Mutual Funds, SIP, Stocks के बारे में हिंदी में quality content नहीं था।" },
          { emoji: "💡", heading: "Solution सोचा",  text: "Jargon-free, relatable examples के साथ — जैसे कोई दोस्त समझा रहा हो। साथ में free tools ताकि लोग खुद calculate कर सकें।" },
          { emoji: "🚀", heading: "PaisaPotli बनाया",text: "आज 9 free finance tools हैं — SIP Calculator से IPO Tracker तक। सब कुछ free — क्योंकि financial education सबका हक है।" },
        ].map((item, i) => (
          <FadeIn key={item.heading} delay={i * 0.1}>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", padding: "28px 0", borderBottom: "1px solid #0d1a0d" }}>
              <div style={{ width: "52px", height: "52px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>
                {item.emoji}
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: "700", color: "#fff", margin: "0 0 8px" }}>{item.heading}</h3>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.8, margin: 0 }}>{item.text}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* VALUES */}
      <section style={{ padding: "0 20px 72px", maxWidth: "900px", margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: "800", margin: "0 0 28px" }}>
            हम यकीन रखते हैं इन बातों में
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "14px" }}>
          {VALUES.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.08}>
              <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "18px", padding: "22px", transition: "border-color 0.2s" }}
                onMouseOver={e => e.currentTarget.style.borderColor = "#166534"}
                onMouseOut={e => e.currentTarget.style.borderColor = "#1a2e1a"}>
                <span style={{ fontSize: "30px", display: "block", marginBottom: "12px" }}>{v.emoji}</span>
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#fff", margin: "0 0 8px" }}>{v.title}</h3>
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section style={{ padding: "0 20px 72px", maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "16px", padding: "24px" }}>
          <p style={{ fontSize: "13px", fontWeight: "700", color: "#f59e0b", margin: "0 0 10px" }}>⚠️ Important Disclaimer</p>
          <p style={{ fontSize: "13px", color: "#78716c", lineHeight: 1.75, margin: 0 }}>
            PaisaPotli.com पर दी गई सभी जानकारी <strong style={{ color: "#92400e" }}>केवल educational purpose के लिए है</strong>।
            यह किसी भी प्रकार की financial advice नहीं है। कोई भी investment decision लेने से पहले SEBI registered financial advisor से consult करें।
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 20px 80px", textAlign: "center" }}>
        <div style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(16,185,129,0.03))", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "24px", padding: "40px 24px", maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,4vw,32px)", fontWeight: "800", margin: "0 0 12px" }}>अभी शुरू करो! 🚀</h2>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>Free tools try karo ya articles padho।</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/tools" style={{ background: "#10b981", color: "#fff", padding: "13px 28px", borderRadius: "12px", textDecoration: "none", fontSize: "14px", fontWeight: "700" }}>🔢 Free Tools</Link>
            <Link to="/blog"  style={{ background: "transparent", border: "1px solid #1a2e1a", color: "#94a3b8", padding: "13px 28px", borderRadius: "12px", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>📖 Articles</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 20px", textAlign: "center" }}>
        <p style={{ color: "#1e3a2e", fontSize: "12px", margin: "0 0 8px" }}>© 2025 PaisaPotli.com — Made with ❤️ for India</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          {[["Privacy Policy","/privacy-policy"],["Contact","/contact"],["Blog","/blog"],["Tools","/tools"]].map(([name,href]) => (
            <Link key={name} to={href} style={{ color: "#334155", textDecoration: "none", fontSize: "12px" }}>{name}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}