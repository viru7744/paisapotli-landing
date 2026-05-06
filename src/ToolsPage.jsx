import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, CreditCard, Receipt, ArrowLeft } from "lucide-react";
import SIPCalculator from "./tools/SIPCalculator";
import EMICalculator from "./tools/EMICalculator";
import TaxCalculator from "./tools/TaxCalculator";

const TOOLS = [
  {
    id: "sip",
    icon: TrendingUp,
    label: "SIP Calculator",
    hindiLabel: "निवेश कैलकुलेटर",
    desc: "Calculate your SIP maturity amount and visualize wealth growth over time.",
    color: "emerald",
    component: SIPCalculator,
  },
  {
    id: "emi",
    icon: CreditCard,
    label: "EMI Calculator",
    hindiLabel: "लोन कैलकुलेटर",
    desc: "Calculate monthly EMI for Home, Car, Personal & Education loans.",
    color: "blue",
    component: EMICalculator,
  },
  {
    id: "tax",
    icon: Receipt,
    label: "Tax Calculator",
    hindiLabel: "टैक्स कैलकुलेटर",
    desc: "Compare Old vs New Tax Regime and find which saves you more money.",
    color: "amber",
    component: TaxCalculator,
  },
];

const colorMap = {
  emerald: {
    bg: "bg-emerald-900/20", border: "border-emerald-800/50",
    text: "text-emerald-400", icon: "bg-emerald-900/40",
    active: "bg-emerald-600 text-white border-emerald-600",
    inactive: "bg-[#0a0f0a] text-slate-400 border-[#1a2e1a] hover:border-emerald-900/60 hover:text-white",
  },
  blue: {
    bg: "bg-blue-900/20", border: "border-blue-800/50",
    text: "text-blue-400", icon: "bg-blue-900/40",
    active: "bg-blue-600 text-white border-blue-600",
    inactive: "bg-[#0a0f0a] text-slate-400 border-[#1a2e1a] hover:border-blue-900/60 hover:text-white",
  },
  amber: {
    bg: "bg-amber-900/20", border: "border-amber-800/50",
    text: "text-amber-400", icon: "bg-amber-900/40",
    active: "bg-amber-600 text-white border-amber-600",
    inactive: "bg-[#0a0f0a] text-slate-400 border-[#1a2e1a] hover:border-amber-900/60 hover:text-white",
  },
};

export default function ToolsPage() {
  const [active, setActive] = useState(null);

  const ActiveTool = active ? TOOLS.find((t) => t.id === active) : null;
  const cm = active ? colorMap[ActiveTool.color] : null;

  return (
    <div
      className="min-h-screen bg-[#050a05] text-white px-4 py-12"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-white text-lg">₹</div>
            <span className="text-xl font-bold">PaisaPotli</span>
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Finance <span className="text-emerald-400 italic">Tools</span>
          </h1>
          <p className="text-slate-500 text-sm">Free calculators — सरल, सटीक, हिंदी में।</p>
        </div>

        <AnimatePresence mode="wait">

          {/* Tool Grid */}
          {!active && (
            <motion.div key="grid"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}
              className="grid gap-4">
              {TOOLS.map((t, i) => {
                const c = colorMap[t.color];
                return (
                  <motion.button key={t.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    onClick={() => setActive(t.id)}
                    className={`w-full text-left p-6 rounded-2xl border ${c.bg} ${c.border} hover:scale-[1.01] transition-all duration-200 group`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${c.icon} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <t.icon size={22} className={c.text} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-white text-base">{t.label}</p>
                          <span className={`text-xs ${c.text} opacity-70`}>{t.hindiLabel}</span>
                        </div>
                        <p className="text-sm text-slate-500">{t.desc}</p>
                      </div>
                      <div className={`text-xl ${c.text} opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all`}>→</div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {/* Active Tool */}
          {active && ActiveTool && (
            <motion.div key={active}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>

              {/* Tool Header */}
              <div className={`rounded-2xl border p-5 mb-6 ${cm.bg} ${cm.border}`}>
                <button onClick={() => setActive(null)}
                  className="flex items-center gap-2 text-slate-500 hover:text-white text-sm mb-4 transition-colors">
                  <ArrowLeft size={15} /> All Tools
                </button>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${cm.icon} flex items-center justify-center`}>
                    <ActiveTool.icon size={22} className={cm.text} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{ActiveTool.label}</h2>
                    <p className="text-sm text-slate-500">{ActiveTool.desc}</p>
                  </div>
                </div>
              </div>

              {/* Tool content */}
              <ActiveTool.component />

              {/* Back button */}
              <button onClick={() => setActive(null)}
                className="mt-8 w-full py-3 border border-[#1a2e1a] hover:border-emerald-900 text-slate-500 hover:text-white rounded-2xl text-sm transition-all flex items-center justify-center gap-2">
                <ArrowLeft size={14} /> Back to All Tools
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}