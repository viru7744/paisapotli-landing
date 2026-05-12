import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle2, TrendingUp, PiggyBank, Lightbulb,
  Plus, Trash2, ChevronUp, ChevronDown, BarChart2,
  Shield, BookOpen, Zap, Menu, X, Calculator
} from "lucide-react";

// ── Fade-in-when-visible ───────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const variants = {
    hidden: { opacity: 0, y: direction === "up" ? 32 : direction === "down" ? -32 : 0, x: direction === "left" ? 32 : direction === "right" ? -32 : 0 },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
  };
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

// ── Animated counter ───────────────────────────────────────────────────────
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <span ref={ref}>{count.toLocaleString("en-IN")}{suffix}</span>;
}

// ── Mobile-friendly P&L Tool ───────────────────────────────────────────────
function PnLTool() {
  const [holdings, setHoldings] = useState([]);
  const [form, setForm] = useState({ ticker: "", exchange: "NSE", buyPrice: "", curPrice: "", qty: "", type: "Long" });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(true);

  const fmt = (n) => "₹" + Math.abs(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const add = () => {
    const { ticker, buyPrice, curPrice, qty } = form;
    if (!ticker || !buyPrice || !curPrice || !qty) return setError("सभी fields भरें।");
    const b = parseFloat(buyPrice), c = parseFloat(curPrice), q = parseInt(qty);
    if (isNaN(b) || isNaN(c) || isNaN(q) || q < 1) return setError("Valid numbers डालें।");
    setError("");
    const invested = b * q, currentVal = c * q;
    const pnl = form.type === "Long" ? currentVal - invested : invested - currentVal;
    const pnlPct = form.type === "Long" ? ((c - b) / b) * 100 : ((b - c) / b) * 100;
    setHoldings(prev => [...prev, { ...form, ticker: ticker.toUpperCase(), invested, currentVal, pnl, pnlPct }]);
    setForm({ ticker: "", exchange: "NSE", buyPrice: "", curPrice: "", qty: "", type: "Long" });
    setShowForm(false);
  };

  const totalInvested = holdings.reduce((s, h) => s + h.invested, 0);
  const totalVal      = holdings.reduce((s, h) => s + h.currentVal, 0);
  const netPnl        = holdings.reduce((s, h) => s + h.pnl, 0);

  return (
    <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "20px", padding: "20px", color: "#fff" }}>
      <style>{`
        .pnl-input { width:100%; background:#111a11; border:1px solid #1e2e1e; border-radius:12px; padding:12px 14px; font-size:16px; color:#fff; outline:none; box-sizing:border-box; -webkit-appearance:none; }
        .pnl-input:focus { border-color:#10b981; }
        .pnl-select { width:100%; background:#111a11; border:1px solid #1e2e1e; border-radius:12px; padding:12px 14px; font-size:16px; color:#fff; outline:none; box-sizing:border-box; -webkit-appearance:none; appearance:none; }
        .pnl-btn-add { width:100%; background:#10b981; border:none; border-radius:12px; padding:16px; font-size:16px; font-weight:700; color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; -webkit-tap-highlight-color:transparent; }
        .pnl-btn-add:active { background:#059669; transform:scale(0.98); }
      `}</style>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "20px" }}>
        {[
          { label: "निवेश",   val: fmt(totalInvested), color: "#cbd5e1" },
          { label: "Value",   val: fmt(totalVal),       color: "#10b981" },
          { label: "Net P&L", val: (netPnl >= 0 ? "+" : "-") + fmt(Math.abs(netPnl)), color: netPnl >= 0 ? "#10b981" : "#f87171" },
        ].map(s => (
          <div key={s.label} style={{ background: "#111a11", borderRadius: "12px", padding: "12px 8px", textAlign: "center", border: "1px solid #1e2e1e" }}>
            <p style={{ fontSize: "10px", color: "#64748b", margin: "0 0 4px", textTransform: "uppercase" }}>{s.label}</p>
            <p style={{ fontSize: "13px", fontWeight: "700", color: s.color, margin: 0, wordBreak: "break-all" }}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Toggle Form */}
      <button onClick={() => setShowForm(p => !p)}
        style={{ width: "100%", background: "transparent", border: "1px dashed #1a3020", borderRadius: "12px", padding: "12px", color: "#10b981", fontSize: "14px", fontWeight: "600", cursor: "pointer", marginBottom: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <Plus size={16} /> {showForm ? "Form बंद करें" : "नया Stock Add करें"}
      </button>

      {/* Input Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px" }}>Stock Symbol</label>
                <input className="pnl-input" placeholder="RELIANCE / TCS / INFY" value={form.ticker}
                  onChange={e => setForm(p => ({ ...p, ticker: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px" }}>Buy Price (₹)</label>
                <input className="pnl-input" type="number" inputMode="decimal" placeholder="2450" value={form.buyPrice}
                  onChange={e => setForm(p => ({ ...p, buyPrice: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px" }}>Current Price (₹)</label>
                <input className="pnl-input" type="number" inputMode="decimal" placeholder="2780" value={form.curPrice}
                  onChange={e => setForm(p => ({ ...p, curPrice: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px" }}>Quantity</label>
                <input className="pnl-input" type="number" inputMode="numeric" placeholder="10" value={form.qty}
                  onChange={e => setForm(p => ({ ...p, qty: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: "11px", color: "#64748b", display: "block", marginBottom: "5px" }}>Exchange</label>
                <select className="pnl-select" value={form.exchange} onChange={e => setForm(p => ({ ...p, exchange: e.target.value }))}>
                  {["NSE","BSE","NASDAQ","NYSE"].map(x => <option key={x}>{x}</option>)}
                </select>
              </div>
            </div>
            {error && <p style={{ color: "#f87171", fontSize: "12px", marginBottom: "8px" }}>{error}</p>}
            <button className="pnl-btn-add" onClick={add}>
              <Plus size={18} /> Add to Portfolio
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Holdings — Mobile Card Layout */}
      {holdings.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <p style={{ fontSize: "11px", color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Holdings ({holdings.length})</p>
          {holdings.map((h, i) => {
            const up = h.pnl >= 0;
            return (
              <div key={i} style={{ background: "#111a11", border: "1px solid #1e2e1e", borderRadius: "14px", padding: "14px", marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div>
                    <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", fontSize: "12px", fontWeight: "700", padding: "3px 8px", borderRadius: "6px" }}>{h.ticker}</span>
                    <span style={{ color: "#475569", fontSize: "11px", marginLeft: "6px" }}>{h.exchange} • {h.type}</span>
                  </div>
                  <button onClick={() => setHoldings(prev => prev.filter((_, j) => j !== i))}
                    style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", padding: "4px", fontSize: "18px" }}>×</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
                  {[
                    { l: "Buy", v: fmt(h.buyPrice), c: "#94a3b8" },
                    { l: "Now", v: fmt(h.curPrice), c: "#cbd5e1" },
                    { l: "Qty", v: h.qty,           c: "#94a3b8" },
                  ].map(d => (
                    <div key={d.l} style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "10px", color: "#475569", margin: "0 0 2px" }}>{d.l}</p>
                      <p style={{ fontSize: "12px", fontWeight: "600", color: d.c, margin: 0 }}>{d.v}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #1a2e1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>P&L</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: up ? "#10b981" : "#f87171" }}>
                      {up ? "+" : "-"}{fmt(Math.abs(h.pnl))}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: up ? "#10b981" : "#f87171", background: up ? "rgba(16,185,129,0.1)" : "rgba(248,113,113,0.1)", padding: "2px 8px", borderRadius: "20px" }}>
                      {up ? "▲" : "▼"} {Math.abs(h.pnlPct).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { name: "About",    id: "about"    },
    { name: "Features", id: "features" },
    { name: "P&L Tool", id: "tool"     },
    { name: "Why Us",   id: "why"      },
  ];

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const blogPosts = [
    { emoji: "📈", cat: "Investment", title: "SIP क्या होता है? Beginners Guide",         slug: "sip-kya-hota-hai",                time: "5 min" },
    { emoji: "⚖️", cat: "Investment", title: "Mutual Fund vs FD — कौन बेहतर?",           slug: "mutual-fund-vs-fd",               time: "6 min" },
    { emoji: "📋", cat: "Tax",        title: "Old vs New Tax Regime 2024-25",             slug: "income-tax-old-vs-new-regime",    time: "7 min" },
    { emoji: "💻", cat: "Earning",    title: "घर बैठे पैसे कमाने के 7 Real तरीके",        slug: "ghar-baithe-paise-kaise-kamayein",time: "8 min" },
  ];

  return (
    <div className="bg-[#050a05] text-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#050a05]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group" style={{ textDecoration: "none" }}>
            <div className="w-8 h-8 md:w-9 md:h-9 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-white text-base md:text-lg group-hover:scale-110 transition-transform">₹</div>
            <span className="text-lg md:text-xl font-bold text-white">PaisaPotli</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scroll(l.id)}
                className="text-slate-400 hover:text-white text-sm transition-colors">
                {l.name}
              </button>
            ))}
            <a href="/tools"  className="text-slate-400 hover:text-white text-sm transition-colors" style={{ textDecoration: "none" }}>Tools</a>
            <a href="/blog"   className="text-slate-400 hover:text-white text-sm transition-colors" style={{ textDecoration: "none" }}>Blog</a>
            <a href="/about"  className="text-slate-400 hover:text-white text-sm transition-colors" style={{ textDecoration: "none" }}>About</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => scroll("tool")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
              Try P&L Tool
            </button>
          </div>

          {/* Mobile right side */}
          <div className="flex md:hidden items-center gap-2">
            <a href="/tools" style={{ textDecoration: "none" }}
              className="bg-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1">
              <Calculator size={13} /> Tools
            </a>
            <button className="text-white p-2 rounded-lg"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              onClick={() => setMenuOpen(p => !p)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
              style={{ position: "fixed", top: "64px", left: 0, right: 0, bottom: 0, background: "#050a05", zIndex: 49, padding: "24px", overflowY: "auto" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {navLinks.map(l => (
                  <button key={l.id} onClick={() => scroll(l.id)}
                    style={{ textAlign: "left", padding: "16px 12px", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#cbd5e1", fontSize: "17px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                    {l.name}
                  </button>
                ))}
                {[
                  { name: "Tools",          href: "/tools"          },
                  { name: "Blog",           href: "/blog"           },
                  { name: "About Us",       href: "/about"          },
                  { name: "Contact",        href: "/contact"        },
                  { name: "Privacy Policy", href: "/privacy-policy" },
                ].map(l => (
                  <a key={l.name} href={l.href} onClick={() => setMenuOpen(false)}
                    style={{ display: "block", padding: "16px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#cbd5e1", fontSize: "17px", textDecoration: "none" }}>
                    {l.name}
                  </a>
                ))}
              </div>
              <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <button onClick={() => scroll("tool")}
                  style={{ background: "#10b981", border: "none", borderRadius: "14px", padding: "16px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>
                  Try P&L Calculator
                </button>
                <a href="/tools" onClick={() => setMenuOpen(false)}
                  style={{ display: "block", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "14px", padding: "16px", color: "#10b981", fontSize: "16px", fontWeight: "600", textAlign: "center", textDecoration: "none" }}>
                  All Finance Tools
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 md:pt-20 px-4 md:px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-72 h-48 md:h-72 bg-emerald-800/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#4ade80 1px,transparent 1px),linear-gradient(90deg,#4ade80 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center py-12 md:py-0">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-800/50 text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
                <Zap size={10} /> India's #1 Hindi Finance Platform
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-bold leading-[1.1] mb-5"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 8vw, 64px)" }}>
              अपना पैसा{" "}
              <span className="text-emerald-400 italic">समझदारी से</span>{" "}
              बढ़ाओ
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-400 mb-7 leading-relaxed"
              style={{ fontSize: "clamp(14px, 3vw, 18px)" }}>
              Savings • Investment • Online Earning • Financial Freedom<br />
              <span className="text-slate-500">सरल हिंदी में — बिल्कुल free।</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-10">
              <button onClick={() => scroll("tool")}
                className="bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                style={{ padding: "14px 24px", fontSize: "15px" }}>
                Try P&L Calculator <ArrowRight size={16} />
              </button>
              <a href="/blog" style={{ textDecoration: "none" }}
                className="border border-white/10 bg-white/5 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all active:bg-white/10"
                style={{ padding: "14px 24px", fontSize: "15px" }}>
                <BookOpen size={15} /> Articles पढ़ें
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex gap-6 md:gap-8">
              {[
                { n: 50000, s: "+", l: "Readers"  },
                { n: 100,   s: "+", l: "Articles" },
                { n: 4.9,   s: "★", l: "Rating", float: true },
              ].map(st => (
                <div key={st.l}>
                  <p className="font-bold text-white" style={{ fontSize: "clamp(18px,4vw,24px)" }}>
                    {st.float ? st.n : <Counter end={st.n} suffix={st.s} />}
                    {st.float && st.s}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{st.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block">
            <div className="relative">
              <div className="bg-[#0a0f0a] border border-[#1a2e1a] rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-400 font-medium">Portfolio Overview</span>
                  <span className="text-xs bg-emerald-900/40 text-emerald-400 px-2 py-1 rounded-full">● Live</span>
                </div>
                {[
                  { name: "RELIANCE",  qty: "25 shares", pnl: "+₹3,750", pct: "+5.58%", up: true  },
                  { name: "TCS",       qty: "10 shares", pnl: "+₹2,800", pct: "+7.29%", up: true  },
                  { name: "HDFC BANK", qty: "15 shares", pnl: "-₹750",   pct: "-3.36%", up: false },
                ].map(s => (
                  <div key={s.name} className="flex items-center justify-between py-3 border-b border-[#111a11] last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-white">{s.name}</p>
                      <p className="text-xs text-slate-500">{s.qty}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${s.up ? "text-emerald-400" : "text-red-400"}`}>{s.pnl}</p>
                      <p className={`text-xs ${s.up ? "text-emerald-600" : "text-red-600"}`}>{s.pct}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-[#1a2e1a] flex justify-between">
                  <span className="text-xs text-slate-500">Total P&L</span>
                  <span className="text-sm font-bold text-emerald-400">+₹5,800 (+4.6%)</span>
                </div>
              </div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg">
                Track Your Gains 📈
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      <section id="about" className="scroll-mt-20 py-16 md:py-24 px-4 md:px-6 bg-[#07090a]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="text-emerald-500 text-xs md:text-sm font-semibold uppercase tracking-widest">हमारे बारे में</span>
            <h2 className="font-bold mt-3 mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,6vw,48px)" }}>
              Finance को सरल बनाना <br />
              <span className="text-emerald-400">हमारा मिशन है।</span>
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto" style={{ fontSize: "clamp(14px,3vw,18px)" }}>
              PaisaPotli.com एक ऐसा platform है जहाँ आपको सरल हिंदी में वित्तीय ज्ञान मिलता है।
              Stocks, mutual funds, savings — सब कुछ एक जगह, बिल्कुल आपकी भाषा में।
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────── */}
      <section id="features" className="scroll-mt-20 py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-10 md:mb-16">
            <span className="text-emerald-500 text-xs md:text-sm font-semibold uppercase tracking-widest">Features</span>
            <h2 className="font-bold mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,5vw,40px)" }}>
              आपके लिए क्या है यहाँ?
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: PiggyBank,  title: "Smart Savings",    desc: "रोज़ थोड़ा बचाओ, future के लिए। Practical savings strategies।",      badge: "Beginner" },
              { icon: TrendingUp, title: "Investment Guide", desc: "Stocks, Mutual Funds, SIP — step-by-step, बिना jargon के।",          badge: "Popular"  },
              { icon: Lightbulb,  title: "Online Earning",   desc: "घर बैठे पैसे कमाने के real तरीके — freelancing से passive income।", badge: "Trending" },
              { icon: BookOpen,   title: "Hindi Content",    desc: "100% हिंदी में — जैसे कोई दोस्त समझा रहा हो।",                       badge: "Unique"   },
              { icon: Shield,     title: "Trusted Advice",   desc: "कोई fake promises नहीं। बस honest financial guidance।",               badge: "Trusted"  },
              { icon: BarChart2,  title: "P&L Tracker",      desc: "Stocks का profit & loss real-time में track करो। Free।",               badge: "New ✨"   },
            ].map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.07}>
                <div className="group bg-[#0a0f0a] border border-[#1a2a1a] hover:border-emerald-900 rounded-2xl p-5 md:p-6 transition-all duration-300 active:scale-[0.98]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 md:w-11 md:h-11 bg-emerald-900/30 rounded-xl flex items-center justify-center">
                      <f.icon size={18} className="text-emerald-400" />
                    </div>
                    <span className="text-xs bg-white/5 text-slate-400 px-2 py-1 rounded-lg">{f.badge}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-1.5 text-sm md:text-base">{f.title}</h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── P&L TOOL ───────────────────────────────────────────────────── */}
      <section id="tool" className="scroll-mt-20 py-16 md:py-24 px-4 md:px-6 bg-[#07090a]">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-8 md:mb-12">
            <span className="text-emerald-500 text-xs font-semibold uppercase tracking-widest">Free Tool</span>
            <h2 className="font-bold mt-2 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,5vw,40px)" }}>
              Stock P&L Calculator
            </h2>
            <p className="text-slate-500 text-sm md:text-base">NSE, BSE, NASDAQ — सब के लिए।</p>
          </FadeIn>
          <FadeIn><PnLTool /></FadeIn>
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────────────────────── */}
      <section id="why" className="scroll-mt-20 py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <FadeIn direction="right">
            <span className="text-emerald-500 text-xs font-semibold uppercase tracking-widest">Why PaisaPotli?</span>
            <h2 className="font-bold mt-2 mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,5vw,40px)" }}>
              हम अलग क्यों हैं?
            </h2>
            <div className="space-y-3">
              {[
                { title: "100% Hindi Content",  desc: "पूरा content सरल हिंदी में।" },
                { title: "Beginner Friendly",   desc: "बिल्कुल नए हों तो भी समझ आएगा।" },
                { title: "Practical Knowledge", desc: "Real life में काम आने वाली बातें।" },
                { title: "No Fake Promises",    desc: "कोई '1 दिन में अमीर बनो' नहीं — बस सच।" },
              ].map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
                  className="flex gap-3 items-start p-3 md:p-4 rounded-xl hover:bg-[#0a0f0a] transition-colors">
                  <div className="mt-0.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm md:text-base">{item.title}</p>
                    <p className="text-slate-500 text-xs md:text-sm mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { n: "50K+", l: "Monthly Readers", icon: "👥" },
                { n: "100+", l: "Hindi Articles",  icon: "📚" },
                { n: "FREE", l: "Always Free",      icon: "🎁" },
                { n: "4.9★", l: "User Rating",      icon: "⭐" },
              ].map(s => (
                <div key={s.l} className="bg-[#0a0f0a] border border-[#1a2a1a] rounded-2xl p-4 md:p-6 text-center hover:border-emerald-900 transition-colors">
                  <div className="text-2xl md:text-3xl mb-2">{s.icon}</div>
                  <p className="text-xl md:text-2xl font-bold text-emerald-400">{s.n}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BLOG PREVIEW ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#07090a]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <div>
                <span className="text-emerald-500 text-xs font-semibold uppercase tracking-widest">Latest Articles</span>
                <h2 className="font-bold mt-1.5" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,5vw,40px)" }}>
                  सीखो, समझो, <span className="text-emerald-400 italic">बढ़ाओ।</span>
                </h2>
              </div>
              <a href="/blog" style={{ textDecoration: "none" }}
                className="hidden sm:flex items-center gap-2 border border-emerald-900 text-emerald-400 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-900/20 transition-colors whitespace-nowrap">
                सभी →
              </a>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {blogPosts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.07}>
                <a href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <div className="group bg-[#0a0f0a] border border-[#1a2a1a] hover:border-emerald-900 rounded-2xl p-4 md:p-5 transition-all duration-300 active:scale-[0.98] h-full flex flex-col">
                    <span className="text-2xl md:text-3xl block mb-3">{post.emoji}</span>
                    <span className="text-xs text-emerald-500 font-semibold uppercase tracking-wider">{post.cat}</span>
                    <h3 className="text-white font-semibold text-sm mt-2 mb-3 leading-snug flex-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between pt-3 border-t border-[#1a2a1a]">
                      <span className="text-xs text-slate-600">⏱ {post.time}</span>
                      <span className="text-emerald-500 text-xs font-semibold">पढ़ें →</span>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <a href="/blog" className="text-emerald-400 text-sm font-semibold" style={{ textDecoration: "none" }}>
              सभी Articles देखें →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 to-[#050a05]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 md:w-96 h-64 md:h-96 bg-emerald-900/20 rounded-full blur-3xl" />
        <FadeIn className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,6vw,52px)" }}>
            आज ही शुरू करें अपनी{" "}
            <span className="text-emerald-400 italic">financial journey।</span>
          </h2>
          <p className="text-slate-400 mb-7 text-sm md:text-base">Free है, हमेशा रहेगा। बस शुरुआत करनी है।</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button onClick={() => scroll("tool")}
              className="bg-emerald-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:bg-emerald-700"
              style={{ padding: "14px 28px", fontSize: "15px" }}>
              Try P&L Tool Free <ArrowRight size={16} />
            </button>
            <a href="/blog" style={{ textDecoration: "none" }}
              className="border border-white/10 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all active:bg-white/5"
              style={{ padding: "14px 28px", fontSize: "15px" }}>
              <BookOpen size={16} /> Read Blog
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8 md:py-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">₹</div>
                <span className="font-bold">PaisaPotli</span>
              </div>
              <p className="text-slate-600 text-xs max-w-xs leading-relaxed">
                India का #1 Hindi Finance Platform। Free tools + articles — सरल हिंदी में।
              </p>
            </div>
            <div className="flex gap-10 flex-wrap">
              <div>
                <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-3">Tools</p>
                {[
                  { name: "SIP Calculator", href: "/tools" },
                  { name: "EMI Calculator", href: "/tools" },
                  { name: "Tax Calculator", href: "/tools" },
                  { name: "IPO Tracker",    href: "/tools" },
                  { name: "Crorepati Calc", href: "/tools" },
                ].map(l => (
                  <a key={l.name} href={l.href} className="block text-slate-600 hover:text-white text-xs mb-2 transition-colors" style={{ textDecoration: "none" }}>
                    {l.name}
                  </a>
                ))}
              </div>
              <div>
                <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-3">Company</p>
                {[
                  { name: "Home",           href: "/"               },
                  { name: "Blog",           href: "/blog"           },
                  { name: "About Us",       href: "/about"          },
                  { name: "Contact",        href: "/contact"        },
                  { name: "Privacy Policy", href: "/privacy-policy" },
                ].map(l => (
                  <a key={l.name} href={l.href} className="block text-slate-600 hover:text-white text-xs mb-2 transition-colors" style={{ textDecoration: "none" }}>
                    {l.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#0a0f0a] border border-[#1a2e1a] rounded-xl p-4 mb-6">
            <p className="text-xs text-slate-700 leading-relaxed">
              ⚠️ <span className="text-slate-600">Disclaimer:</span> PaisaPotli.com पर दी गई जानकारी केवल educational purpose के लिए है। यह financial advice नहीं है। Invest करने से पहले SEBI registered advisor से consult करें।
            </p>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-slate-700 text-xs text-center">© 2025 PaisaPotli.com — Made with ❤️ for India</p>
            <div className="flex gap-4 text-xs text-slate-700">
              <a href="/privacy-policy" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>Privacy</a>
              <a href="/contact"        className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>Contact</a>
              <a href="/about"          className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>About</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV ──────────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{ background: "rgba(5,10,5,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "8px 0 env(safe-area-inset-bottom,8px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {[
            { label: "Home",  icon: "🏠", href: "/"      },
            { label: "Tools", icon: "🔢", href: "/tools" },
            { label: "Blog",  icon: "📖", href: "/blog"  },
            { label: "P&L",   icon: "📈", action: () => scroll("tool") },
          ].map(item => (
            item.href
              ? <a key={item.label} href={item.href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", padding: "6px 4px", gap: "2px" }}>
                  <span style={{ fontSize: "20px" }}>{item.icon}</span>
                  <span style={{ fontSize: "10px", color: "#64748b" }}>{item.label}</span>
                </a>
              : <button key={item.label} onClick={item.action} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", padding: "6px 4px", gap: "2px", cursor: "pointer" }}>
                  <span style={{ fontSize: "20px" }}>{item.icon}</span>
                  <span style={{ fontSize: "10px", color: "#10b981", fontWeight: "600" }}>{item.label}</span>
                </button>
          ))}
        </div>
      </div>
      <div className="md:hidden h-16" />

    </div>
  );
}