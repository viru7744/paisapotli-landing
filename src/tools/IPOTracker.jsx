import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const IPO_DATA = {
  upcoming: [
    {
      name: "Ather Energy",
      sector: "EV / Auto",
      openDate: "30 Apr 2025",
      closeDate: "5 May 2025",
      price: "₹304–321",
      lotSize: 46,
      gmp: 42,
      size: "₹2,981 Cr",
      rating: "Apply",
      ratingColor: "#10b981",
      logo: "⚡",
    },
    {
      name: "Hexaware Technologies",
      sector: "IT Services",
      openDate: "12 May 2025",
      closeDate: "14 May 2025",
      price: "₹674–708",
      lotSize: 21,
      gmp: 95,
      size: "₹8,750 Cr",
      rating: "Apply",
      ratingColor: "#10b981",
      logo: "💻",
    },
    {
      name: "IndiQube Spaces",
      sector: "Real Estate",
      openDate: "20 May 2025",
      closeDate: "22 May 2025",
      price: "₹225–237",
      lotSize: 63,
      gmp: 18,
      size: "₹1,850 Cr",
      rating: "Neutral",
      ratingColor: "#f59e0b",
      logo: "🏢",
    },
    {
      name: "Schloss Bangalore",
      sector: "Hospitality",
      openDate: "28 May 2025",
      closeDate: "30 May 2025",
      price: "₹390–410",
      lotSize: 36,
      gmp: 0,
      size: "₹2,100 Cr",
      rating: "Neutral",
      ratingColor: "#f59e0b",
      logo: "🏨",
    },
  ],
  recent: [
    {
      name: "Ola Electric",
      sector: "EV / Auto",
      listingDate: "9 Aug 2024",
      issuePrice: 76,
      listingPrice: 75.99,
      currentPrice: 52,
      subscribed: "4.3x",
      logo: "🛵",
      status: "Below Issue",
    },
    {
      name: "Bajaj Housing Finance",
      sector: "NBFC",
      listingDate: "16 Sep 2024",
      issuePrice: 70,
      listingPrice: 150,
      currentPrice: 105,
      subscribed: "64x",
      logo: "🏠",
      status: "Above Issue",
    },
    {
      name: "Hyundai India",
      sector: "Auto",
      listingDate: "22 Oct 2024",
      issuePrice: 1960,
      listingPrice: 1934,
      currentPrice: 1650,
      subscribed: "2.4x",
      logo: "🚗",
      status: "Below Issue",
    },
    {
      name: "NTPC Green Energy",
      sector: "Renewable",
      listingDate: "27 Nov 2024",
      issuePrice: 108,
      listingPrice: 111.5,
      currentPrice: 98,
      subscribed: "2.6x",
      logo: "☀️",
      status: "Below Issue",
    },
    {
      name: "Vishal Mega Mart",
      sector: "Retail",
      listingDate: "18 Dec 2024",
      issuePrice: 78,
      listingPrice: 98,
      currentPrice: 88,
      subscribed: "27x",
      logo: "🛒",
      status: "Above Issue",
    },
    {
      name: "Swiggy",
      sector: "Food Tech",
      listingDate: "13 Nov 2024",
      issuePrice: 390,
      listingPrice: 412,
      currentPrice: 340,
      subscribed: "3.6x",
      logo: "🍕",
      status: "Below Issue",
    },
  ],
};

const fmtPct = (issue, current) => {
  const pct = ((current - issue) / issue) * 100;
  return { pct: pct.toFixed(1), up: pct >= 0 };
};

export default function IPOTracker() {
  const [tab, setTab] = useState("upcoming");
  const [filter, setFilter] = useState("all");

  const sectors = useMemo(() => {
    const all = (tab === "upcoming" ? IPO_DATA.upcoming : IPO_DATA.recent).map(i => i.sector);
    return ["all", ...new Set(all)];
  }, [tab]);

  const filtered = useMemo(() => {
    const data = tab === "upcoming" ? IPO_DATA.upcoming : IPO_DATA.recent;
    return filter === "all" ? data : data.filter(i => i.sector === filter);
  }, [tab, filter]);

  return (
    <div>
      <style>{`
        .ipo-tab { padding:9px 20px; border-radius:20px; font-size:13px; font-weight:600; cursor:pointer; border:1px solid #1a2e1a; transition:all 0.2s; background:transparent; color:#64748b; }
        .ipo-tab.active { background:#10b981; border-color:#10b981; color:#fff; }
        .ipo-tab:hover:not(.active) { border-color:#334155; color:#fff; }
        .sector-chip { padding:5px 12px; border-radius:20px; font-size:11px; font-weight:600; cursor:pointer; border:1px solid #1a2e1a; transition:all 0.2s; background:transparent; color:#64748b; white-space:nowrap; }
        .sector-chip.active { background:#0d1a0d; border-color:#166534; color:#10b981; }
        .ipo-card { background:#0a0f0a; border:1px solid #1a2e1a; border-radius:18px; padding:18px; transition:all 0.2s; }
        .ipo-card:hover { border-color:#166534; transform:translateY(-2px); }
        .ipo-card:active { transform:scale(0.99); }
      `}</style>

      {/* Disclaimer */}
      <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "12px", padding: "10px 14px", marginBottom: "20px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
        <span style={{ fontSize: "14px", flexShrink: 0 }}>⚠️</span>
        <p style={{ fontSize: "11px", color: "#92400e", margin: 0, lineHeight: 1.5 }}>
          GMP (Grey Market Premium) unofficial figure है। Invest करने से पहले DRHP पढ़ें। यह financial advice नहीं है।
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
        <button className={`ipo-tab ${tab === "upcoming" ? "active" : ""}`} onClick={() => { setTab("upcoming"); setFilter("all"); }}>
          🔜 Upcoming ({IPO_DATA.upcoming.length})
        </button>
        <button className={`ipo-tab ${tab === "recent" ? "active" : ""}`} onClick={() => { setTab("recent"); setFilter("all"); }}>
          📋 Recent ({IPO_DATA.recent.length})
        </button>
      </div>

      {/* Sector Filter */}
      <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "6px", marginBottom: "18px", scrollbarWidth: "none" }}>
        {sectors.map(s => (
          <button key={s} className={`sector-chip ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>
            {s === "all" ? "सभी" : s}
          </button>
        ))}
      </div>

      {/* UPCOMING IPOs */}
      {tab === "upcoming" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((ipo, i) => (
            <motion.div key={ipo.name} className="ipo-card"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: "44px", height: "44px", background: "rgba(16,185,129,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                    {ipo.logo}
                  </div>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: "700", color: "#fff", margin: "0 0 2px" }}>{ipo.name}</p>
                    <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{ipo.sector} • {ipo.size}</p>
                  </div>
                </div>
                <span style={{ fontSize: "12px", fontWeight: "700", padding: "4px 12px", borderRadius: "20px",
                  background: `${ipo.ratingColor}20`, color: ipo.ratingColor, flexShrink: 0 }}>
                  {ipo.rating}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "8px", marginBottom: "14px" }}>
                {[
                  { label: "Price Band",    val: ipo.price      },
                  { label: "Lot Size",      val: `${ipo.lotSize} shares` },
                  { label: "Open Date",     val: ipo.openDate   },
                  { label: "Close Date",    val: ipo.closeDate  },
                ].map(d => (
                  <div key={d.label} style={{ background: "#0d1a0d", borderRadius: "10px", padding: "10px 12px" }}>
                    <p style={{ fontSize: "10px", color: "#475569", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{d.label}</p>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#cbd5e1", margin: 0 }}>{d.val}</p>
                  </div>
                ))}
              </div>

              {/* GMP Bar */}
              <div style={{ background: "#0d1a0d", borderRadius: "10px", padding: "10px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>GMP (Grey Market Premium)</span>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: ipo.gmp > 0 ? "#10b981" : "#64748b" }}>
                    {ipo.gmp > 0 ? `+₹${ipo.gmp}` : "—"}
                  </span>
                </div>
                {ipo.gmp > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ flex: 1, height: "4px", background: "#1a2e1a", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${Math.min((ipo.gmp / 200) * 100, 100)}%`, background: "#10b981", borderRadius: "2px", transition: "width 0.8s ease" }} />
                    </div>
                    <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "600", whiteSpace: "nowrap" }}>
                      Est. Listing: ₹{parseInt(ipo.price.split("–")[1]) + ipo.gmp}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* RECENT IPOs */}
      {tab === "recent" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((ipo, i) => {
            const issueReturn  = fmtPct(ipo.issuePrice, ipo.currentPrice);
            const listingReturn = fmtPct(ipo.issuePrice, ipo.listingPrice);
            return (
              <motion.div key={ipo.name} className="ipo-card"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <div style={{ width: "42px", height: "42px", background: "rgba(16,185,129,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                      {ipo.logo}
                    </div>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: "700", color: "#fff", margin: "0 0 2px" }}>{ipo.name}</p>
                      <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{ipo.sector} • Listed: {ipo.listingDate}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px",
                    background: ipo.status === "Above Issue" ? "rgba(16,185,129,0.15)" : "rgba(248,113,113,0.15)",
                    color: ipo.status === "Above Issue" ? "#10b981" : "#f87171" }}>
                    {ipo.status}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "12px" }}>
                  {[
                    { label: "Issue Price",   val: `₹${ipo.issuePrice}`,   color: "#94a3b8" },
                    { label: "Listing Price", val: `₹${ipo.listingPrice}`, color: listingReturn.up ? "#10b981" : "#f87171" },
                    { label: "Current",       val: `₹${ipo.currentPrice}`, color: issueReturn.up ? "#10b981" : "#f87171" },
                  ].map(d => (
                    <div key={d.label} style={{ background: "#0d1a0d", borderRadius: "10px", padding: "10px 8px", textAlign: "center" }}>
                      <p style={{ fontSize: "10px", color: "#475569", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{d.label}</p>
                      <p style={{ fontSize: "13px", fontWeight: "700", color: d.color, margin: 0 }}>{d.val}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "#0d1a0d", borderRadius: "10px" }}>
                  <div>
                    <p style={{ fontSize: "10px", color: "#475569", margin: "0 0 2px" }}>Listing Return</p>
                    <p style={{ fontSize: "14px", fontWeight: "700", color: listingReturn.up ? "#10b981" : "#f87171", margin: 0 }}>
                      {listingReturn.up ? "+" : ""}{listingReturn.pct}%
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "10px", color: "#475569", margin: "0 0 2px" }}>Subscribed</p>
                    <p style={{ fontSize: "14px", fontWeight: "700", color: "#f59e0b", margin: 0 }}>{ipo.subscribed}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "10px", color: "#475569", margin: "0 0 2px" }}>Total Return</p>
                    <p style={{ fontSize: "14px", fontWeight: "700", color: issueReturn.up ? "#10b981" : "#f87171", margin: 0 }}>
                      {issueReturn.up ? "+" : ""}{issueReturn.pct}%
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <p style={{ fontSize: "11px", color: "#334155", textAlign: "center", marginTop: "16px" }}>
        * Data indicative है। Invest करने से पहले अपनी research करें। SEBI registered advisor से consult करें।
      </p>
    </div>
  );
}