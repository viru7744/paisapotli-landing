import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fmtL = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000)   return "₹" + (n / 100000).toFixed(2) + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
};

// Historical price data (approximate, for illustration)
const STOCKS = [
  {
    id: "reliance", name: "Reliance Industries", emoji: "🏭", exchange: "NSE",
    prices: { 2010: 52, 2012: 40, 2015: 54, 2017: 87, 2019: 115, 2020: 148, 2021: 238, 2022: 267, 2023: 235, 2024: 295, 2025: 1310 },
    color: "#3b82f6",
  },
  {
    id: "tcs", name: "TCS", emoji: "💻", exchange: "NSE",
    prices: { 2010: 38, 2012: 57, 2015: 128, 2017: 138, 2019: 195, 2020: 213, 2021: 362, 2022: 385, 2023: 330, 2024: 395, 2025: 3980 },
    color: "#10b981",
  },
  {
    id: "hdfc", name: "HDFC Bank", emoji: "🏦", exchange: "NSE",
    prices: { 2010: 22, 2012: 28, 2015: 55, 2017: 80, 2019: 130, 2020: 100, 2021: 152, 2022: 155, 2023: 155, 2024: 162, 2025: 1720 },
    color: "#6366f1",
  },
  {
    id: "infosys", name: "Infosys", emoji: "🖥️", exchange: "NSE",
    prices: { 2010: 27, 2012: 35, 2015: 55, 2017: 62, 2019: 72, 2020: 100, 2021: 183, 2022: 172, 2023: 143, 2024: 178, 2025: 1820 },
    color: "#f59e0b",
  },
  {
    id: "wipro", name: "Wipro", emoji: "🔧", exchange: "NSE",
    prices: { 2010: 7, 2012: 8, 2015: 12, 2017: 10, 2019: 13, 2020: 20, 2021: 65, 2022: 59, 2023: 38, 2024: 52, 2025: 550 },
    color: "#ec4899",
  },
  {
    id: "bajajfinance", name: "Bajaj Finance", emoji: "💳", exchange: "NSE",
    prices: { 2010: 3, 2012: 8, 2015: 50, 2017: 150, 2019: 340, 2020: 200, 2021: 700, 2022: 600, 2023: 640, 2024: 700, 2025: 7200 },
    color: "#14b8a6",
  },
  {
    id: "asian_paints", name: "Asian Paints", emoji: "🎨", exchange: "NSE",
    prices: { 2010: 13, 2012: 22, 2015: 48, 2017: 65, 2019: 95, 2020: 117, 2021: 320, 2022: 310, 2023: 275, 2024: 250, 2025: 2720 },
    color: "#f97316",
  },
  {
    id: "zomato", name: "Zomato", emoji: "🍕", exchange: "NSE",
    prices: { 2021: 76, 2022: 40, 2023: 75, 2024: 220, 2025: 240 },
    color: "#ef4444",
  },
  {
    id: "adani", name: "Adani Enterprises", emoji: "⚡", exchange: "NSE",
    prices: { 2010: 4, 2012: 3, 2015: 4, 2017: 5, 2019: 12, 2020: 16, 2021: 60, 2022: 275, 2023: 170, 2024: 330, 2025: 2350 },
    color: "#8b5cf6",
  },
  {
    id: "apple", name: "Apple (AAPL)", emoji: "🍎", exchange: "NASDAQ",
    prices: { 2010: 9, 2012: 19, 2015: 30, 2017: 43, 2019: 73, 2020: 132, 2021: 178, 2022: 130, 2023: 193, 2024: 229, 2025: 210 },
    note: "USD prices (approx)",
    color: "#94a3b8",
  },
  {
    id: "tesla", name: "Tesla (TSLA)", emoji: "🚗", exchange: "NASDAQ",
    prices: { 2013: 7, 2015: 14, 2017: 20, 2019: 25, 2020: 235, 2021: 340, 2022: 120, 2023: 250, 2024: 400, 2025: 340 },
    note: "USD prices (approx)",
    color: "#ef4444",
  },
  {
    id: "google", name: "Google (GOOGL)", emoji: "🔍", exchange: "NASDAQ",
    prices: { 2010: 15, 2012: 18, 2015: 33, 2017: 53, 2019: 67, 2020: 88, 2021: 150, 2022: 85, 2023: 140, 2024: 195, 2025: 170 },
    note: "USD prices (approx)",
    color: "#3b82f6",
  },
];

const YEARS = [2010, 2012, 2013, 2015, 2017, 2019, 2020, 2021, 2022, 2023, 2024];

export default function IfIBought() {
  const [stockId, setStockId]   = useState("reliance");
  const [year, setYear]         = useState(2020);
  const [amount, setAmount]     = useState(100000);
  const [calculated, setCalculated] = useState(false);

  const stock = STOCKS.find(s => s.id === stockId);

  const availableYears = useMemo(() => {
    return YEARS.filter(y => stock?.prices[y] !== undefined);
  }, [stockId, stock]);

  const result = useMemo(() => {
    if (!calculated || !stock) return null;
    const buyPrice   = stock.prices[year];
    const sellPrice  = stock.prices[2025];
    if (!buyPrice || !sellPrice) return null;

    const shares     = Math.floor(amount / buyPrice);
    const invested   = shares * buyPrice;
    const currentVal = shares * sellPrice;
    const profit     = currentVal - invested;
    const pct        = ((currentVal - invested) / invested) * 100;
    const years      = 2025 - year;
    const cagr       = (Math.pow(currentVal / invested, 1 / years) - 1) * 100;

    // What if comparison
    const fdReturn   = invested * Math.pow(1.07, years);
    const goldReturn = invested * Math.pow(1.10, years);

    return { shares, invested, currentVal, profit, pct, cagr, years, fdReturn, goldReturn, buyPrice, sellPrice };
  }, [calculated, stock, year, amount]);

  const handleCalculate = () => {
    const yr = availableYears.includes(year) ? year : availableYears[availableYears.length - 1];
    setYear(yr);
    setCalculated(true);
  };

  return (
    <div>
      <style>{`
        .stock-chip { padding:8px 14px; border-radius:20px; font-size:12px; font-weight:600; cursor:pointer; border:1px solid #1a2e1a; transition:all 0.2s; background:transparent; color:#64748b; white-space:nowrap; display:flex; align-items:center; gap:5px; }
        .stock-chip.active { color:#fff; }
        .stock-chip:hover:not(.active) { border-color:#334155; color:#fff; }
        .iib-slider { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:3px; background:#1a3020; outline:none; cursor:pointer; }
        .iib-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; box-shadow:0 0 0 2px #10b981; }
        .iib-slider::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; }
        .calc-btn { width:100%; background:#10b981; border:none; border-radius:14px; padding:16px; font-size:16px; font-weight:700; color:#fff; cursor:pointer; transition:all 0.2s; }
        .calc-btn:hover { background:#059669; transform:scale(1.01); }
        .calc-btn:active { transform:scale(0.98); }
      `}</style>

      {/* Stock Selector */}
      <div style={{ marginBottom: "22px" }}>
        <p style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Stock / Company चुनें</p>
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "6px", scrollbarWidth: "none" }}>
          {STOCKS.map(s => (
            <button key={s.id}
              className={`stock-chip ${stockId === s.id ? "active" : ""}`}
              style={stockId === s.id ? { background: `${s.color}20`, borderColor: s.color, color: s.color } : {}}
              onClick={() => { setStockId(s.id); setCalculated(false); setYear(availableYears[0] || 2020); }}>
              {s.emoji} {s.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Stock Info */}
      <div style={{ background: `${stock?.color}10`, border: `1px solid ${stock?.color}30`, borderRadius: "14px", padding: "14px 18px", marginBottom: "22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "28px" }}>{stock?.emoji}</span>
          <div>
            <p style={{ fontSize: "15px", fontWeight: "700", color: "#fff", margin: "0 0 2px" }}>{stock?.name}</p>
            <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{stock?.exchange} {stock?.note ? `• ${stock.note}` : ""}</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "11px", color: "#64748b", margin: "0 0 2px" }}>Current Price (2025)</p>
          <p style={{ fontSize: "16px", fontWeight: "700", color: stock?.color, margin: 0 }}>₹{stock?.prices[2025]}</p>
        </div>
      </div>

      {/* Amount Slider */}
      <div style={{ marginBottom: "22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <label style={{ fontSize: "13px", color: "#94a3b8" }}>Investment Amount</label>
          <span style={{ fontSize: "15px", fontWeight: "700", color: "#10b981", background: "rgba(16,185,129,0.12)", padding: "3px 12px", borderRadius: "8px" }}>
            {fmtL(amount)}
          </span>
        </div>
        <input type="range" className="iib-slider" min={10000} max={1000000} step={10000} value={amount}
          onChange={e => { setAmount(Number(e.target.value)); setCalculated(false); }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#334155", marginTop: "4px" }}>
          <span>₹10,000</span><span>₹10 Lakh</span>
        </div>
      </div>

      {/* Year Selector */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "10px" }}>Kab Kharida Hota?</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(70px,1fr))", gap: "8px" }}>
          {availableYears.map(y => (
            <button key={y} onClick={() => { setYear(y); setCalculated(false); }}
              style={{ padding: "10px", borderRadius: "12px", cursor: "pointer", border: "1px solid", fontSize: "13px", fontWeight: "600", transition: "all 0.2s",
                borderColor: year === y ? stock?.color || "#10b981" : "#1a2e1a",
                background: year === y ? `${stock?.color || "#10b981"}15` : "#0d1a0d",
                color: year === y ? stock?.color || "#10b981" : "#64748b" }}>
              {y}
              {stock?.prices[y] && (
                <span style={{ display: "block", fontSize: "10px", color: "#475569", marginTop: "2px" }}>₹{stock.prices[y]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <button className="calc-btn" onClick={handleCalculate}>
        🧮 Calculate करो!
      </button>

      {/* RESULT */}
      <AnimatePresence>
        {calculated && result && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginTop: "24px" }}
          >
            {/* Main Result Card */}
            <div style={{ background: result.pct >= 0 ? "rgba(16,185,129,0.08)" : "rgba(248,113,113,0.08)", border: `1px solid ${result.pct >= 0 ? "rgba(16,185,129,0.3)" : "rgba(248,113,113,0.3)"}`, borderRadius: "20px", padding: "24px", textAlign: "center", marginBottom: "16px" }}>
              <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "6px" }}>
                अगर {year} में {fmtL(amount)} लगाते {stock?.name} में...
              </p>
              <p style={{ fontSize: "48px", fontWeight: "800", color: result.pct >= 0 ? "#10b981" : "#f87171", letterSpacing: "-2px", lineHeight: 1, marginBottom: "6px" }}>
                {fmtL(result.currentVal)}
              </p>
              <p style={{ fontSize: "14px", color: result.pct >= 0 ? "#10b981" : "#f87171", fontWeight: "600", marginBottom: "4px" }}>
                {result.pct >= 0 ? "+" : ""}{result.pct.toFixed(1)}% return in {result.years} years
              </p>
              <p style={{ fontSize: "13px", color: "#64748b" }}>
                {result.shares} shares × ₹{result.buyPrice} → ₹{result.sellPrice}
              </p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "16px" }}>
              {[
                { label: "Invested",  val: fmtL(result.invested),   color: "#94a3b8" },
                { label: "Profit/Loss",val: (result.profit >= 0 ? "+" : "") + fmtL(Math.abs(result.profit)), color: result.profit >= 0 ? "#10b981" : "#f87171" },
                { label: "CAGR",      val: result.cagr.toFixed(1) + "%", color: "#f59e0b" },
              ].map(c => (
                <div key={c.label} style={{ background: "#0d1a0d", border: "1px solid #1a2e1a", borderRadius: "14px", padding: "14px", textAlign: "center" }}>
                  <p style={{ fontSize: "10px", color: "#475569", margin: "0 0 5px", textTransform: "uppercase" }}>{c.label}</p>
                  <p style={{ fontSize: "15px", fontWeight: "700", color: c.color, margin: 0 }}>{c.val}</p>
                </div>
              ))}
            </div>

            {/* vs Comparison */}
            <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "18px" }}>
              <p style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>
                📊 अगर कहीं और लगाते...
              </p>
              {[
                { label: `${stock?.name}`,     val: result.currentVal, color: stock?.color || "#10b981", emoji: stock?.emoji || "📈" },
                { label: "Gold (10% CAGR)",    val: result.goldReturn,  color: "#f59e0b", emoji: "🥇" },
                { label: "FD (7% p.a.)",       val: result.fdReturn,    color: "#60a5fa", emoji: "🏦" },
              ].sort((a, b) => b.val - a.val).map((item, i) => {
                const maxVal = result.currentVal;
                return (
                  <div key={item.label} style={{ marginBottom: i < 2 ? "12px" : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>{item.emoji} {item.label}</span>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: item.color }}>{fmtL(item.val)}</span>
                    </div>
                    <div style={{ height: "6px", background: "#1e293b", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(item.val / Math.max(result.currentVal, result.goldReturn, result.fdReturn)) * 100}%`, background: item.color, borderRadius: "3px", transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Share prompt */}
            <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "14px", padding: "14px 18px", marginTop: "14px", textAlign: "center" }}>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 4px" }}>🤩 अपने दोस्तों को दिखाओ!</p>
              <p style={{ fontSize: "12px", color: "#475569", margin: 0 }}>
                "अगर मैंने {year} में {fmtL(amount)} {stock?.name} में लगाए होते — आज {fmtL(result.currentVal)} होते!"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p style={{ fontSize: "11px", color: "#334155", textAlign: "center", marginTop: "16px" }}>
        * Historical prices approximate हैं। Past returns future returns की guarantee नहीं हैं।
      </p>
    </div>
  );
}