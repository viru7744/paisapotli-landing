import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle2, TrendingUp, PiggyBank, Lightbulb,
  Play, Plus, Trash2, ChevronUp, ChevronDown, BarChart2,
  Shield, BookOpen, Zap, Menu, X
} from "lucide-react";

// ── Fade-in-when-visible ───────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
      opacity: 1, y: 0, x: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
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

// ── P&L Tool ───────────────────────────────────────────────────────────────
function PnLTool() {
  const [holdings, setHoldings] = useState([]);
  const [form, setForm] = useState({ ticker: "", exchange: "NSE", buyPrice: "", curPrice: "", qty: "", type: "Long" });
  const [error, setError] = useState("");

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
  };

  const totalInvested = holdings.reduce((s, h) => s + h.invested, 0);
  const totalVal      = holdings.reduce((s, h) => s + h.currentVal, 0);
  const netPnl        = holdings.reduce((s, h) => s + h.pnl, 0);

  return (
    <div className="bg-[#0a0f0a] border border-[#1a2e1a] rounded-3xl p-8 text-white">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "कुल निवेश",    val: fmt(totalInvested), color: "text-slate-300" },
          { label: "Current Value", val: fmt(totalVal),      color: "text-emerald-400" },
          { label: "Net P&L",       val: (netPnl >= 0 ? "+" : "-") + fmt(Math.abs(netPnl)), color: netPnl >= 0 ? "text-emerald-400" : "text-red-400" },
        ].map(s => (
          <div key={s.label} className="bg-[#111a11] rounded-2xl p-4 border border-[#1e2e1e]">
            <p className="text-xs text-slate-500 mb-1 uppercase tracking-widest">{s.label}</p>
            <p className={`text-lg font-semibold ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Input form */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
        {[
          { key: "ticker",   placeholder: "RELIANCE / TCS", label: "Stock Symbol" },
          { key: "buyPrice", placeholder: "2450.00",        label: "Buy Price (₹)",     type: "number" },
          { key: "curPrice", placeholder: "2780.00",        label: "Current Price (₹)", type: "number" },
          { key: "qty",      placeholder: "10",             label: "Quantity",          type: "number" },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-xs text-slate-500 mb-1">{f.label}</label>
            <input
              type={f.type || "text"} placeholder={f.placeholder} value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              className="w-full bg-[#111a11] border border-[#1e2e1e] rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-700"
            />
          </div>
        ))}
        <div>
          <label className="block text-xs text-slate-500 mb-1">Exchange</label>
          <select value={form.exchange} onChange={e => setForm(p => ({ ...p, exchange: e.target.value }))}
            className="w-full bg-[#111a11] border border-[#1e2e1e] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-700">
            {["NSE","BSE","NASDAQ","NYSE"].map(x => <option key={x}>{x}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">Trade Type</label>
          <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
            className="w-full bg-[#111a11] border border-[#1e2e1e] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-700">
            <option>Long</option><option>Short</option>
          </select>
        </div>
      </div>

      {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
      <button onClick={add}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mb-6">
        <Plus size={16} /> Add to Portfolio
      </button>

      {/* Holdings table */}
      {holdings.length === 0 ? (
        <div className="text-center py-10 text-slate-600">
          <BarChart2 size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">अभी कोई stock नहीं है। ऊपर form भरें।</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#1e2e1e]">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-[#1e2e1e]">
                {["Stock","Buy","Current","Qty","Invested","Value","P&L","%",""].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {holdings.map((h, i) => {
                const up = h.pnl >= 0;
                return (
                  <tr key={i} className="border-b border-[#111a11] hover:bg-[#111a11] transition-colors">
                    <td className="px-4 py-3">
                      <span className="bg-emerald-900/40 text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-md">{h.ticker}</span>
                      <span className="text-slate-600 text-xs ml-1">{h.exchange}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{fmt(h.buyPrice)}</td>
                    <td className="px-4 py-3 text-slate-300">{fmt(h.curPrice)}</td>
                    <td className="px-4 py-3 text-slate-400">{h.qty}</td>
                    <td className="px-4 py-3 text-slate-400">{fmt(h.invested)}</td>
                    <td className="px-4 py-3 text-slate-300">{fmt(h.currentVal)}</td>
                    <td className={`px-4 py-3 font-semibold ${up ? "text-emerald-400" : "text-red-400"}`}>
                      {up ? "+" : "-"}{fmt(Math.abs(h.pnl))}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-0.5 text-xs font-semibold ${up ? "text-emerald-400" : "text-red-400"}`}>
                        {up ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        {Math.abs(h.pnlPct).toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setHoldings(prev => prev.filter((_, j) => j !== i))}
                        className="text-slate-700 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
    { emoji: "📈", cat: "Investment", title: "SIP क्या होता है? Beginners Guide",          slug: "sip-kya-hota-hai",                 time: "5 min" },
    { emoji: "⚖️", cat: "Investment", title: "Mutual Fund vs FD — कौन बेहतर?",             slug: "mutual-fund-vs-fd",                time: "6 min" },
    { emoji: "📋", cat: "Tax",        title: "Old vs New Tax Regime 2024-25",              slug: "income-tax-old-vs-new-regime",      time: "7 min" },
    { emoji: "💻", cat: "Earning",    title: "घर बैठे पैसे कमाने के 7 Real तरीके",         slug: "ghar-baithe-paise-kaise-kamayein",  time: "8 min" },
  ];

  return (
    <div className="bg-[#050a05] text-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#050a05]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-white text-lg group-hover:scale-110 transition-transform">₹</div>
            <span className="text-xl font-bold text-white">PaisaPotli</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scroll(l.id)}
                className="text-slate-400 hover:text-white text-sm transition-colors">
                {l.name}
              </button>
            ))}
            <a href="/tools" className="text-slate-400 hover:text-white text-sm transition-colors" style={{ textDecoration: "none" }}>
              Tools
            </a>
            <a href="/blog" className="text-slate-400 hover:text-white text-sm transition-colors" style={{ textDecoration: "none" }}>
              Blog
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button onClick={() => scroll("tool")}
              className="hidden md:block bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
              Try P&L Tool
            </button>
            <button className="md:hidden text-white" onClick={() => setMenuOpen(p => !p)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0a0f0a] border-t border-white/5 px-6 py-4 space-y-1">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scroll(l.id)}
                className="block w-full text-left text-slate-300 hover:text-white py-2.5 text-sm border-b border-white/5">
                {l.name}
              </button>
            ))}
            <a href="/tools" className="block text-slate-300 hover:text-white py-2.5 text-sm border-b border-white/5" style={{ textDecoration: "none" }}>Tools</a>
            <a href="/blog"  className="block text-slate-300 hover:text-white py-2.5 text-sm" style={{ textDecoration: "none" }}>Blog</a>
          </motion.div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-800/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#4ade80 1px,transparent 1px),linear-gradient(90deg,#4ade80 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-800/50 text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
                <Zap size={11} /> India's #1 Hindi Finance Platform
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              अपना पैसा{" "}
              <span className="text-emerald-400 italic">समझदारी से</span>{" "}
              बढ़ाओ
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-400 text-lg mb-8 leading-relaxed">
              Savings • Investment • Online Earning • Financial Freedom<br />
              <span className="text-slate-500 text-base">सरल हिंदी में financial knowledge — बिल्कुल free।</span>
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-12">
              <button onClick={() => scroll("tool")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105">
                Try P&L Calculator <ArrowRight size={16} />
              </button>
              <a href="/blog" style={{ textDecoration: "none" }}
                className="border border-white/10 hover:border-white/20 bg-white/5 text-white px-6 py-3.5 rounded-xl font-medium flex items-center gap-2 transition-all hover:bg-white/10">
                <BookOpen size={15} /> Read Articles
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex gap-8">
              {[
                { n: 50000, s: "+", l: "Readers" },
                { n: 100,   s: "+", l: "Articles" },
                { n: 4.9,   s: "★", l: "Rating", float: true },
              ].map(st => (
                <div key={st.l}>
                  <p className="text-2xl font-bold text-white">
                    {st.float ? st.n : <Counter end={st.n} suffix={st.s} />}
                    {st.float && st.s}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{st.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Portfolio Card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
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
      <section id="about" className="scroll-mt-24 py-24 px-6 bg-[#07090a]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="text-emerald-500 text-sm font-semibold uppercase tracking-widest">हमारे बारे में</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Finance को सरल बनाना <br />
              <span className="text-emerald-400">हमारा मिशन है।</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
              PaisaPotli.com एक ऐसा platform है जहाँ आपको सरल हिंदी में वित्तीय ज्ञान मिलता है।
              Stocks, mutual funds, savings — सब कुछ एक जगह, बिल्कुल आपकी भाषा में।
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────── */}
      <section id="features" className="scroll-mt-24 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-emerald-500 text-sm font-semibold uppercase tracking-widest">Features</span>
            <h2 className="text-4xl font-bold mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              आपके लिए क्या है यहाँ?
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: PiggyBank,  title: "Smart Savings",    desc: "रोज़ थोड़ा बचाओ, future के लिए। Practical savings strategies जो actually काम करती हैं।",    badge: "Beginner" },
              { icon: TrendingUp, title: "Investment Guide", desc: "Stocks, Mutual Funds, SIP — सब कुछ step-by-step, बिना jargon के।",                         badge: "Popular"  },
              { icon: Lightbulb,  title: "Online Earning",   desc: "घर बैठे पैसे कमाने के real तरीके — freelancing से लेकर passive income तक।",                 badge: "Trending" },
              { icon: BookOpen,   title: "Hindi Content",    desc: "100% हिंदी में — जैसे कोई दोस्त समझा रहा हो। No complex English terms।",                     badge: "Unique"   },
              { icon: Shield,     title: "Trusted Advice",   desc: "कोई fake promises नहीं, कोई misleading tips नहीं। बस honest financial guidance।",             badge: "Trusted"  },
              { icon: BarChart2,  title: "P&L Tracker",      desc: "अपने stocks का profit & loss real-time में track करो। बिल्कुल free।",                         badge: "New ✨"   },
            ].map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div className="group bg-[#0a0f0a] border border-[#1a2a1a] hover:border-emerald-900 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-default">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:bg-emerald-800/40 transition-colors">
                      <f.icon size={20} className="text-emerald-400" />
                    </div>
                    <span className="text-xs bg-white/5 text-slate-400 px-2 py-1 rounded-lg">{f.badge}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── P&L TOOL ───────────────────────────────────────────────────── */}
      <section id="tool" className="scroll-mt-24 py-24 px-6 bg-[#07090a]">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-emerald-500 text-sm font-semibold uppercase tracking-widest">Free Tool</span>
            <h2 className="text-4xl font-bold mt-3 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Stock P&L Calculator
            </h2>
            <p className="text-slate-500">अपने stocks का profit & loss instantly calculate करो — NSE, BSE, NASDAQ सब के लिए।</p>
          </FadeIn>
          <FadeIn><PnLTool /></FadeIn>
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────────────────────── */}
      <section id="why" className="scroll-mt-24 py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <span className="text-emerald-500 text-sm font-semibold uppercase tracking-widest">Why PaisaPotli?</span>
            <h2 className="text-4xl font-bold mt-3 mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              हम अलग क्यों हैं?
            </h2>
            <div className="space-y-4">
              {[
                { title: "100% Hindi Content",  desc: "पूरा content सरल हिंदी में — कोई complex terms नहीं।" },
                { title: "Beginner Friendly",   desc: "अगर आप बिल्कुल नए हैं तो भी समझ आएगा — guaranteed।" },
                { title: "Practical Knowledge", desc: "Theory नहीं, real life में काम आने वाली बातें।" },
                { title: "No Fake Promises",    desc: "कोई '1 दिन में अमीर बनो' वाली बात नहीं — बस सच।" },
              ].map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
                  className="flex gap-4 items-start p-4 rounded-xl hover:bg-[#0a0f0a] transition-colors group">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-900/40 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-800/60 transition-colors">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-slate-500 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "50K+", l: "Monthly Readers", icon: "👥" },
                { n: "100+", l: "Hindi Articles",  icon: "📚" },
                { n: "FREE", l: "Always Free",      icon: "🎁" },
                { n: "4.9★", l: "User Rating",      icon: "⭐" },
              ].map(s => (
                <div key={s.l} className="bg-[#0a0f0a] border border-[#1a2a1a] rounded-2xl p-6 text-center hover:border-emerald-900 transition-colors">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className="text-2xl font-bold text-emerald-400">{s.n}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BLOG PREVIEW ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#07090a]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-emerald-500 text-sm font-semibold uppercase tracking-widest">Latest Articles</span>
                <h2 className="text-4xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  सीखो, समझो, <span className="text-emerald-400 italic">बढ़ाओ।</span>
                </h2>
              </div>
              <a href="/blog" style={{ textDecoration: "none" }}
                className="hidden md:flex items-center gap-2 border border-emerald-900 text-emerald-400 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-900/20 transition-colors">
                सभी Articles →
              </a>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {blogPosts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.08}>
                <a href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div className="group bg-[#0a0f0a] border border-[#1a2a1a] hover:border-emerald-900 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                    <span className="text-3xl block mb-4">{post.emoji}</span>
                    <span className="text-xs text-emerald-500 font-semibold uppercase tracking-wider">{post.cat}</span>
                    <h3 className="text-white font-semibold text-sm mt-2 mb-3 leading-snug flex-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between pt-3 border-t border-[#1a2a1a]">
                      <span className="text-xs text-slate-600">⏱ {post.time}</span>
                      <span className="text-emerald-500 text-xs font-semibold group-hover:translate-x-1 transition-transform inline-block">
                        पढ़ें →
                      </span>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

          {/* Mobile "see all" link */}
          <div className="text-center mt-8 md:hidden">
            <a href="/blog" className="text-emerald-400 text-sm font-semibold" style={{ textDecoration: "none" }}>
              सभी Articles देखें →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 to-[#050a05]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl" />
        <FadeIn className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            आज ही शुरू करें अपनी{" "}
            <span className="text-emerald-400 italic">financial journey।</span>
          </h2>
          <p className="text-slate-400 mb-8">Free है, हमेशा रहेगा। बस शुरुआत करनी है।</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => scroll("tool")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105">
              Try P&L Tool Free <ArrowRight size={16} />
            </button>
            <a href="/blog" style={{ textDecoration: "none" }}
              className="border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl font-medium transition-all hover:bg-white/5 flex items-center gap-2">
              <BookOpen size={16} /> Read Blog
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white">₹</div>
            <span className="font-bold">PaisaPotli</span>
          </div>
          <p className="text-slate-600 text-sm">© 2025 PaisaPotli.com — Made with ❤️ for India</p>
          <div className="flex gap-6 text-sm text-slate-600">
            <a href="/blog"  className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>Blog</a>
            <a href="/tools" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>Tools</a>
            <a href="#"      className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>Privacy</a>
            <a href="#"      className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}