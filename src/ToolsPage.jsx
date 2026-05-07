import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, CreditCard, Receipt, Landmark, Home, Target, ArrowLeft } from "lucide-react";
import SIPCalculator   from "./tools/SIPCalculator";
import EMICalculator   from "./tools/EMICalculator";
import TaxCalculator   from "./tools/TaxCalculator";
import FDCalculator    from "./tools/FDCalculator";
import LoanEligibility from "./tools/LoanEligibility";
import GoalPlanner     from "./tools/GoalPlanner";

const TOOLS = [
  {
    id: "sip",
    icon: TrendingUp,
    label: "SIP Calculator",
    hindiLabel: "निवेश कैलकुलेटर",
    desc: "Monthly SIP se maturity calculate karo aur wealth growth visualize karo.",
    color: "emerald",
    tag: "Popular",
    component: SIPCalculator,
  },
  {
    id: "emi",
    icon: CreditCard,
    label: "EMI Calculator",
    hindiLabel: "लोन कैलकुलेटर",
    desc: "Home, Car, Personal & Education loan ki monthly EMI calculate karo.",
    color: "blue",
    tag: "Useful",
    component: EMICalculator,
  },
  {
    id: "tax",
    icon: Receipt,
    label: "Tax Calculator",
    hindiLabel: "टैक्स कैलकुलेटर",
    desc: "Old vs New Tax Regime compare karo — kaun sa zyada paisa bachata hai.",
    color: "purple",
    tag: "Trending",
    component: TaxCalculator,
  },
  {
    id: "fd",
    icon: Landmark,
    label: "FD Rate Comparison",
    hindiLabel: "एफडी तुलना",
    desc: "SBI, HDFC, ICICI समेत 14 banks ki FD rates ek jagah compare karo.",
    color: "amber",
    tag: "🔥 Hot",
    component: FDCalculator,
  },
  {
    id: "loan",
    icon: Home,
    label: "Loan Eligibility",
    hindiLabel: "लोन पात्रता",
    desc: "Salary ke basis par kitna Home/Car/Personal loan milega — instantly jaano.",
    color: "rose",
    tag: "New ✨",
    component: LoanEligibility,
  },
  {
    id: "goal",
    icon: Target,
    label: "Goal Planner",
    hindiLabel: "लक्ष्य योजनाकार",
    desc: "Car, House, Vacation — financial goal set karo aur monthly saving plan pao.",
    color: "teal",
    tag: "New ✨",
    component: GoalPlanner,
  },
];

const C = {
  emerald: { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)",  text: "#10b981", icon: "rgba(16,185,129,0.15)" },
  blue:    { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.25)",  text: "#60a5fa", icon: "rgba(59,130,246,0.15)" },
  purple:  { bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.25)",  text: "#a78bfa", icon: "rgba(139,92,246,0.15)" },
  amber:   { bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)",  text: "#fbbf24", icon: "rgba(245,158,11,0.15)" },
  rose:    { bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.25)",   text: "#fb7185", icon: "rgba(244,63,94,0.15)"  },
  teal:    { bg: "rgba(20,184,166,0.08)",  border: "rgba(20,184,166,0.25)",  text: "#2dd4bf", icon: "rgba(20,184,166,0.15)" },
};

export default function ToolsPage() {
  const [active, setActive] = useState(null);
  const ActiveTool = active ? TOOLS.find(t => t.id === active) : null;
  const cm = active ? C[ActiveTool.color] : null;

  return (
    <div style={{ minHeight: "100vh", background: "#050a05", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap" rel="stylesheet" />

      <style>{`
        .tool-card { transition: transform 0.2s, border-color 0.2s; cursor: pointer; }
        .tool-card:hover { transform: translateY(-3px); }
        .back-btn:hover { border-color: #166534 !important; color: #fff !important; }
        .quick-btn:hover { opacity: 0.8; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 24px", background: "rgba(5,10,5,0.95)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: "36px", height: "36px", background: "#10b981", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", color: "#fff", fontSize: "18px" }}>₹</div>
            <span style={{ fontWeight: "700", color: "#fff", fontSize: "18px" }}>PaisaPotli</span>
          </a>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <a href="/"     style={{ color: "#64748b", textDecoration: "none", fontSize: "14px" }}>Home</a>
            <a href="/tools"style={{ color: "#10b981", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>Tools</a>
            <a href="/blog" style={{ color: "#64748b", textDecoration: "none", fontSize: "14px" }}>Blog</a>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "48px 24px" }}>

        {/* ── PAGE HEADER ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "44px" }}>
          <span style={{ fontSize: "12px", color: "#10b981", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Free Finance Tools
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,46px)", fontWeight: "800", margin: "10px 0 12px", lineHeight: 1.1 }}>
            सभी Calculators <span style={{ color: "#10b981", fontStyle: "italic" }}>एक जगह</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "480px", margin: "0 auto" }}>
            6 free tools — SIP, EMI, Tax, FD, Loan, Goal Planner। कोई signup नहीं, बिल्कुल free।
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── TOOL GRID ── */}
          {!active && (
            <motion.div key="grid"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }}>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
                {TOOLS.map((t, i) => {
                  const c = C[t.color];
                  return (
                    <motion.div
                      key={t.id}
                      className="tool-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                      onClick={() => setActive(t.id)}
                      style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "20px", padding: "24px" }}
                      onMouseOver={e => e.currentTarget.style.borderColor = c.text}
                      onMouseOut={e => e.currentTarget.style.borderColor = c.border}
                    >
                      {/* Icon + Tag */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                        <div style={{ width: "46px", height: "46px", borderRadius: "14px", background: c.icon, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <t.icon size={22} style={{ color: c.text }} />
                        </div>
                        <span style={{ fontSize: "10px", fontWeight: "700", background: `${c.text}20`, color: c.text, padding: "3px 10px", borderRadius: "20px" }}>
                          {t.tag}
                        </span>
                      </div>

                      {/* Labels */}
                      <p style={{ fontSize: "17px", fontWeight: "700", color: "#fff", margin: "0 0 3px" }}>{t.label}</p>
                      <p style={{ fontSize: "12px", color: c.text, margin: "0 0 10px", opacity: 0.85 }}>{t.hindiLabel}</p>
                      <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55, margin: "0 0 18px" }}>{t.desc}</p>

                      {/* CTA */}
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: c.text }}>
                          Open Tool →
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Trust note */}
              <div style={{ textAlign: "center", marginTop: "28px", padding: "16px", background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "14px" }}>
                <p style={{ color: "#334155", fontSize: "13px", margin: 0 }}>
                  🔒 कोई data save नहीं होता &nbsp;•&nbsp; 100% Free &nbsp;•&nbsp; No Signup Required
                </p>
              </div>
            </motion.div>
          )}

          {/* ── ACTIVE TOOL ── */}
          {active && ActiveTool && (
            <motion.div key={active}
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28 }}>

              {/* Tool header */}
              <div style={{ background: cm.bg, border: `1px solid ${cm.border}`, borderRadius: "20px", padding: "20px 24px", marginBottom: "24px" }}>
                <button
                  onClick={() => setActive(null)}
                  style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", background: "none", border: "none", cursor: "pointer", fontSize: "13px", marginBottom: "16px", padding: 0, transition: "color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.color = "#fff"}
                  onMouseOut={e => e.currentTarget.style.color = "#64748b"}>
                  <ArrowLeft size={14} /> सभी Tools
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: cm.icon, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ActiveTool.icon size={24} style={{ color: cm.text }} />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#fff", margin: 0 }}>{ActiveTool.label}</h2>
                      <span style={{ fontSize: "12px", color: cm.text }}>{ActiveTool.hindiLabel}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0" }}>{ActiveTool.desc}</p>
                  </div>
                </div>
              </div>

              {/* Tool component */}
              <ActiveTool.component />

              {/* Footer nav */}
              <div style={{ marginTop: "32px" }}>
                <button
                  className="back-btn"
                  onClick={() => setActive(null)}
                  style={{ width: "100%", padding: "13px", background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "14px", color: "#64748b", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s", marginBottom: "16px" }}>
                  <ArrowLeft size={14} /> सभी Tools पर वापस जाएं
                </button>

                {/* Quick switch to other tools */}
                <p style={{ fontSize: "11px", color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
                  Other Tools
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {TOOLS.filter(t => t.id !== active).map(t => {
                    const c = C[t.color];
                    return (
                      <button
                        key={t.id}
                        className="quick-btn"
                        onClick={() => setActive(t.id)}
                        style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", background: c.bg, border: `1px solid ${c.border}`, borderRadius: "20px", cursor: "pointer", color: c.text, fontSize: "12px", fontWeight: "600", transition: "opacity 0.2s" }}>
                        <t.icon size={13} />
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 24px", textAlign: "center", marginTop: "32px" }}>
        <p style={{ color: "#1e3a2e", fontSize: "13px", margin: 0 }}>
          © 2025 PaisaPotli.com — Made with ❤️ for India
        </p>
      </footer>
    </div>
  );
}