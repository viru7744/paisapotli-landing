import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, CreditCard, Receipt, Landmark, Home, Target, ArrowLeft, ListChecks, History, Trophy } from "lucide-react";
import SIPCalculator    from "./tools/SIPCalculator";
import EMICalculator    from "./tools/EMICalculator";
import TaxCalculator    from "./tools/TaxCalculator";
import FDCalculator     from "./tools/FDCalculator";
import LoanEligibility  from "./tools/LoanEligibility";
import GoalPlanner      from "./tools/GoalPlanner";
import IPOTracker       from "./tools/IPOTracker";
import IfIBought        from "./tools/IfIBought";
import CrorepatiCalculator from "./tools/CrorepatiCalculator";

const TOOLS = [
  { id:"sip",       icon:TrendingUp, label:"SIP Calculator",       hindiLabel:"निवेश कैलकुलेटर",   desc:"Monthly SIP se maturity calculate karo.",                color:"emerald", tag:"Popular",  component:SIPCalculator    },
  { id:"emi",       icon:CreditCard, label:"EMI Calculator",        hindiLabel:"लोन कैलकुलेटर",     desc:"Home, Car, Personal loan ki EMI calculate karo.",        color:"blue",    tag:"Useful",   component:EMICalculator    },
  { id:"tax",       icon:Receipt,    label:"Tax Calculator",        hindiLabel:"टैक्स कैलकुलेटर",   desc:"Old vs New Regime — kaun zyada bachata hai.",            color:"purple",  tag:"Trending", component:TaxCalculator    },
  { id:"fd",        icon:Landmark,   label:"FD Rate Comparison",    hindiLabel:"एफडी तुलना",         desc:"14 banks ki FD rates ek jagah compare karo.",           color:"amber",   tag:"🔥 Hot",   component:FDCalculator     },
  { id:"loan",      icon:Home,       label:"Loan Eligibility",      hindiLabel:"लोन पात्रता",        desc:"Salary se kitna loan milega instantly jaano.",           color:"rose",    tag:"New",      component:LoanEligibility  },
  { id:"goal",      icon:Target,     label:"Goal Planner",          hindiLabel:"लक्ष्य योजनाकार",   desc:"Car, House, Vacation — monthly saving plan pao.",       color:"teal",    tag:"New",      component:GoalPlanner      },
  { id:"ipo",       icon:ListChecks, label:"IPO Tracker",           hindiLabel:"आईपीओ ट्रैकर",      desc:"Upcoming & recent IPOs — GMP, listing date, returns.",   color:"orange",  tag:"🔴 Live",  component:IPOTracker       },
  { id:"ifibought", icon:History,    label:"If I Bought X Stock",   hindiLabel:"अगर मैंने खरीदा होता", desc:"2015 mein RELIANCE kharida hota — aaj kitna hota?",  color:"pink",    tag:"🚀 Viral", component:IfIBought        },
  { id:"crorepati", icon:Trophy,     label:"Crorepati Calculator",  hindiLabel:"करोड़पति कैलकुलेटर", desc:"Kab banunga Crorepati? SIP se apna target set karo.",   color:"gold",    tag:"⭐ Hot",   component:CrorepatiCalculator },
];

const C = {
  emerald: { bg:"rgba(16,185,129,0.08)",  border:"rgba(16,185,129,0.25)",  text:"#10b981", icon:"rgba(16,185,129,0.15)" },
  blue:    { bg:"rgba(59,130,246,0.08)",  border:"rgba(59,130,246,0.25)",  text:"#60a5fa", icon:"rgba(59,130,246,0.15)" },
  purple:  { bg:"rgba(139,92,246,0.08)",  border:"rgba(139,92,246,0.25)",  text:"#a78bfa", icon:"rgba(139,92,246,0.15)" },
  amber:   { bg:"rgba(245,158,11,0.08)",  border:"rgba(245,158,11,0.25)",  text:"#fbbf24", icon:"rgba(245,158,11,0.15)" },
  rose:    { bg:"rgba(244,63,94,0.08)",   border:"rgba(244,63,94,0.25)",   text:"#fb7185", icon:"rgba(244,63,94,0.15)"  },
  teal:    { bg:"rgba(20,184,166,0.08)",  border:"rgba(20,184,166,0.25)",  text:"#2dd4bf", icon:"rgba(20,184,166,0.15)" },
  orange:  { bg:"rgba(249,115,22,0.08)",  border:"rgba(249,115,22,0.25)",  text:"#fb923c", icon:"rgba(249,115,22,0.15)" },
  pink:    { bg:"rgba(236,72,153,0.08)",  border:"rgba(236,72,153,0.25)",  text:"#f472b6", icon:"rgba(236,72,153,0.15)" },
  gold:    { bg:"rgba(234,179,8,0.08)",   border:"rgba(234,179,8,0.25)",   text:"#eab308", icon:"rgba(234,179,8,0.15)"  },
};

export default function ToolsPage() {
  const [active, setActive] = useState(null);
  const ActiveTool = active ? TOOLS.find(t => t.id === active) : null;
  const cm = active ? C[ActiveTool.color] : null;

  return (
    <div style={{ minHeight:"100vh", background:"#050a05", color:"#fff", fontFamily:"'DM Sans', sans-serif", paddingBottom:"80px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap" rel="stylesheet" />
      <style>{`
        .tool-card { transition:transform 0.2s, border-color 0.2s; cursor:pointer; }
        @media(hover:hover){ .tool-card:hover { transform:translateY(-3px); } }
        .tool-card:active { transform:scale(0.98); }
        .back-btn:hover { border-color:#166534 !important; color:#fff !important; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"0 16px", background:"rgba(5,10,5,0.97)", backdropFilter:"blur(12px)", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <a href="/" style={{ display:"flex", alignItems:"center", gap:"8px", textDecoration:"none" }}>
            <div style={{ width:"34px", height:"34px", background:"#10b981", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"800", color:"#fff", fontSize:"16px" }}>₹</div>
            <span style={{ fontWeight:"700", color:"#fff", fontSize:"17px" }}>PaisaPotli</span>
          </a>
          <div style={{ display:"flex", gap:"20px", alignItems:"center" }}>
            <a href="/"     style={{ color:"#64748b", textDecoration:"none", fontSize:"13px" }}>Home</a>
            <a href="/tools"style={{ color:"#10b981", textDecoration:"none", fontSize:"13px", fontWeight:"600" }}>Tools</a>
            <a href="/blog" style={{ color:"#64748b", textDecoration:"none", fontSize:"13px" }}>Blog</a>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth:"1000px", margin:"0 auto", padding:"36px 16px" }}>

        {/* PAGE HEADER */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          style={{ textAlign:"center", marginBottom:"36px" }}>
          <span style={{ fontSize:"11px", color:"#10b981", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.1em" }}>
            Free Finance Tools
          </span>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:"clamp(26px,5vw,44px)", fontWeight:"800", margin:"8px 0 10px", lineHeight:1.1 }}>
            सभी Calculators <span style={{ color:"#10b981", fontStyle:"italic" }}>एक जगह</span>
          </h1>
          <p style={{ color:"#64748b", fontSize:"14px", maxWidth:"440px", margin:"0 auto" }}>
            9 free tools — SIP, EMI, Tax, FD, IPO, Crorepati & more। कोई signup नहीं।
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* TOOL GRID */}
          {!active && (
            <motion.div key="grid"
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-16 }} transition={{ duration:0.25 }}>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"12px" }}>
                {TOOLS.map((t, i) => {
                  const c = C[t.color];
                  return (
                    <motion.div key={t.id} className="tool-card"
                      initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
                      transition={{ delay: i * 0.05, duration:0.35 }}
                      onClick={() => setActive(t.id)}
                      style={{ background:c.bg, border:`1px solid ${c.border}`, borderRadius:"18px", padding:"20px" }}
                      onMouseOver={e => e.currentTarget.style.borderColor = c.text}
                      onMouseOut={e => e.currentTarget.style.borderColor = c.border}>

                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"14px" }}>
                        <div style={{ width:"44px", height:"44px", borderRadius:"13px", background:c.icon, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <t.icon size={21} style={{ color:c.text }} />
                        </div>
                        <span style={{ fontSize:"10px", fontWeight:"700", background:`${c.text}20`, color:c.text, padding:"3px 9px", borderRadius:"20px" }}>
                          {t.tag}
                        </span>
                      </div>

                      <p style={{ fontSize:"16px", fontWeight:"700", color:"#fff", margin:"0 0 2px" }}>{t.label}</p>
                      <p style={{ fontSize:"11px", color:c.text, margin:"0 0 8px", opacity:0.85 }}>{t.hindiLabel}</p>
                      <p style={{ fontSize:"12px", color:"#64748b", lineHeight:1.5, margin:"0 0 14px" }}>{t.desc}</p>

                      <div style={{ display:"flex", justifyContent:"flex-end" }}>
                        <span style={{ fontSize:"12px", fontWeight:"600", color:c.text }}>Open →</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div style={{ textAlign:"center", marginTop:"24px", padding:"14px", background:"#0a0f0a", border:"1px solid #1a2e1a", borderRadius:"12px" }}>
                <p style={{ color:"#334155", fontSize:"12px", margin:0 }}>
                  🔒 कोई data save नहीं &nbsp;•&nbsp; 100% Free &nbsp;•&nbsp; No Signup
                </p>
              </div>
            </motion.div>
          )}

          {/* ACTIVE TOOL */}
          {active && ActiveTool && (
            <motion.div key={active}
              initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:-20 }} transition={{ duration:0.25 }}>

              {/* Header */}
              <div style={{ background:cm.bg, border:`1px solid ${cm.border}`, borderRadius:"18px", padding:"18px 20px", marginBottom:"22px" }}>
                <button onClick={() => setActive(null)}
                  style={{ display:"flex", alignItems:"center", gap:"6px", color:"#64748b", background:"none", border:"none", cursor:"pointer", fontSize:"13px", marginBottom:"14px", padding:0 }}
                  onMouseOver={e => e.currentTarget.style.color="#fff"}
                  onMouseOut={e => e.currentTarget.style.color="#64748b"}>
                  <ArrowLeft size={13} /> सभी Tools
                </button>
                <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                  <div style={{ width:"46px", height:"46px", borderRadius:"14px", background:cm.icon, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <ActiveTool.icon size={22} style={{ color:cm.text }} />
                  </div>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap" }}>
                      <h2 style={{ fontSize:"19px", fontWeight:"700", color:"#fff", margin:0 }}>{ActiveTool.label}</h2>
                      <span style={{ fontSize:"12px", color:cm.text }}>{ActiveTool.hindiLabel}</span>
                    </div>
                    <p style={{ fontSize:"12px", color:"#64748b", margin:"3px 0 0" }}>{ActiveTool.desc}</p>
                  </div>
                </div>
              </div>

              {/* Tool */}
              <ActiveTool.component />

              {/* Footer nav */}
              <div style={{ marginTop:"28px" }}>
                <button className="back-btn" onClick={() => setActive(null)}
                  style={{ width:"100%", padding:"13px", background:"#0a0f0a", border:"1px solid #1a2e1a", borderRadius:"13px", color:"#64748b", fontSize:"13px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", transition:"all 0.2s", marginBottom:"14px" }}>
                  <ArrowLeft size={13} /> सभी Tools पर वापस
                </button>

                <p style={{ fontSize:"10px", color:"#334155", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"8px" }}>Other Tools</p>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  {TOOLS.filter(t => t.id !== active).map(t => {
                    const c = C[t.color];
                    return (
                      <button key={t.id} onClick={() => setActive(t.id)}
                        style={{ display:"flex", alignItems:"center", gap:"5px", padding:"6px 12px", background:c.bg, border:`1px solid ${c.border}`, borderRadius:"20px", cursor:"pointer", color:c.text, fontSize:"11px", fontWeight:"600", transition:"opacity 0.2s" }}>
                        <t.icon size={12} />{t.label.split(" ")[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Nav */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"rgba(5,10,5,0.97)", backdropFilter:"blur(12px)", borderTop:"1px solid rgba(255,255,255,0.06)", display:"grid", gridTemplateColumns:"repeat(4,1fr)", padding:"8px 0" }}>
        {[
          { label:"Home",  icon:"🏠", href:"/"      },
          { label:"Tools", icon:"🔢", href:"/tools", active:true },
          { label:"Blog",  icon:"📖", href:"/blog"  },
          { label:"P&L",   icon:"📈", href:"/#tool" },
        ].map(item => (
          <a key={item.label} href={item.href} style={{ textDecoration:"none", display:"flex", flexDirection:"column", alignItems:"center", padding:"4px", gap:"2px" }}>
            <span style={{ fontSize:"20px" }}>{item.icon}</span>
            <span style={{ fontSize:"10px", color:item.active?"#10b981":"#64748b", fontWeight:item.active?"600":"400" }}>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}