export const categories = [
  { id: "all",        label: "सभी",          color: "#10b981" },
  { id: "investment", label: "Investment",   color: "#3b82f6" },
  { id: "savings",    label: "Savings",      color: "#f59e0b" },
  { id: "tax",        label: "Tax",          color: "#8b5cf6" },
  { id: "earning",    label: "Online Earning",color: "#ec4899" },
];

export const posts = [
  {
    id: 1,
    slug: "sip-kya-hota-hai",
    title: "SIP क्या होता है? — Beginners के लिए पूरी Guide",
    excerpt: "SIP यानी Systematic Investment Plan — हर महीने थोड़ा-थोड़ा invest करके बड़ा corpus बनाने का सबसे आसान तरीका। जानिए कैसे शुरू करें।",
    category: "investment",
    readTime: "5 min",
    date: "15 Jan 2025",
    featured: true,
    emoji: "📈",
    content: [
      {
        type: "intro",
        text: "अगर आप invest करना चाहते हैं लेकिन समझ नहीं आता कहाँ से शुरू करें — तो SIP आपके लिए सबसे बेहतरीन option है। यह article पढ़कर आप आज ही SIP शुरू कर सकते हैं।"
      },
      {
        type: "heading",
        text: "SIP क्या होता है?"
      },
      {
        type: "para",
        text: "SIP यानी Systematic Investment Plan। इसमें आप हर महीने एक fixed amount — जैसे ₹500, ₹1000, या ₹5000 — किसी Mutual Fund में invest करते हैं। यह बिल्कुल वैसा है जैसे हर महीने बैंक में FD करते हो, लेकिन returns बहुत ज़्यादा मिलते हैं।"
      },
      {
        type: "highlight",
        text: "💡 अगर आप ₹5,000/month, 12% return पर, 20 साल के लिए invest करें — तो ₹12 लाख लगाकर ₹49.9 लाख बना सकते हैं!"
      },
      {
        type: "heading",
        text: "SIP के फायदे क्या हैं?"
      },
      {
        type: "list",
        items: [
          "Rupee Cost Averaging — market ऊपर-नीचे होने पर भी average cost कम रहती है",
          "Compounding का जादू — returns पर भी returns मिलते हैं",
          "₹100 से भी शुरू कर सकते हैं",
          "कभी भी बंद या pause कर सकते हैं",
          "Tax benefit मिलती है ELSS funds में (80C के तहत)"
        ]
      },
      {
        type: "heading",
        text: "SIP कैसे शुरू करें? — Step by Step"
      },
      {
        type: "steps",
        items: [
          { title: "KYC करवाएं", desc: "Aadhaar + PAN card से online KYC 10 मिनट में हो जाती है।" },
          { title: "App download करें", desc: "Groww, Zerodha Coin, या Paytm Money — कोई भी free app।" },
          { title: "Fund चुनें", desc: "Beginners के लिए Index Fund या Large Cap Fund best हैं।" },
          { title: "Amount और date set करें", desc: "Monthly date set करें — salary आने के 2-3 दिन बाद।" },
          { title: "Auto-debit on करें", desc: "Bank से auto-debit लगाएं — फिर भूलने की tension नहीं।" }
        ]
      },
      {
        type: "heading",
        text: "Beginners के लिए Best SIP Funds"
      },
      {
        type: "table",
        headers: ["Fund Type", "Expected Return", "Risk", "किसके लिए"],
        rows: [
          ["Nifty 50 Index Fund", "10-12% p.a.", "Low-Medium", "बिल्कुल नए investors"],
          ["Large Cap Fund",      "11-13% p.a.", "Medium",     "Stable growth चाहिए"],
          ["ELSS Fund",           "12-15% p.a.", "Medium",     "Tax बचाना है"],
          ["Mid Cap Fund",        "14-18% p.a.", "High",       "5+ साल के लिए"],
        ]
      },
      {
        type: "heading",
        text: "Common Mistakes जो नए लोग करते हैं"
      },
      {
        type: "list",
        items: [
          "Market गिरने पर SIP बंद कर देना — यह सबसे बड़ी गलती है!",
          "Short term (1-2 साल) के लिए SIP करना",
          "सिर्फ पिछले returns देखकर fund चुनना",
          "बहुत ज़्यादा funds में invest करना",
          "Emergency fund बनाए बिना SIP शुरू करना"
        ]
      },
      {
        type: "conclusion",
        text: "SIP कोई rocket science नहीं है। आज ही ₹500 से शुरू करें। 10 साल बाद आप खुद को धन्यवाद देंगे। हमारा SIP Calculator use करें और देखें आपका पैसा कितना बढ़ेगा!"
      }
    ]
  },
  {
    id: 2,
    slug: "mutual-fund-vs-fd",
    title: "Mutual Fund vs Fixed Deposit — 2025 में क्या बेहतर है?",
    excerpt: "FD safe लगती है लेकिन Mutual Fund ज़्यादा return देता है। दोनों को compare करें और जानें आपके लिए क्या सही है।",
    category: "investment",
    readTime: "6 min",
    date: "20 Jan 2025",
    featured: true,
    emoji: "⚖️",
    content: [
      {
        type: "intro",
        text: "India में अभी भी करोड़ों लोग FD को ही सबसे safe investment मानते हैं। लेकिन क्या FD सच में best option है? आइए honestly compare करते हैं।"
      },
      {
        type: "heading",
        text: "एक नज़र में Comparison"
      },
      {
        type: "table",
        headers: ["Feature", "Fixed Deposit", "Mutual Fund (SIP)"],
        rows: [
          ["Returns",        "6-7.5% p.a.",      "10-15% p.a. (avg)"],
          ["Risk",           "लगभग Zero",         "Market से जुड़ा"],
          ["Tax",            "Taxable as income", "LTCG: 10% after 1L"],
          ["Liquidity",      "Lock-in period",    "कभी भी निकालो"],
          ["Minimum Amount", "₹1,000",            "₹100"],
          ["Inflation Beat", "❌ नहीं",            "✅ हाँ"],
        ]
      },
      {
        type: "highlight",
        text: "⚠️ अगर Inflation 6% है और FD 7% return दे रही है — तो real return सिर्फ 1% है! Mutual Fund 12% return पर real return 6% मिलता है।"
      },
      {
        type: "heading",
        text: "FD कब सही है?"
      },
      {
        type: "list",
        items: [
          "Emergency fund रखना हो (3-6 महीने का खर्च)",
          "1-2 साल में पैसा चाहिए हो",
          "बिल्कुल risk नहीं लेना",
          "Senior citizens के लिए fixed income",
          "Retirement के बाद stable income"
        ]
      },
      {
        type: "heading",
        text: "Mutual Fund कब सही है?"
      },
      {
        type: "list",
        items: [
          "3+ साल के लिए invest करना हो",
          "Inflation से ज़्यादा return चाहिए",
          "Tax efficiently invest करना हो",
          "Wealth build करना हो long term में",
          "Regular income की ज़रूरत न हो"
        ]
      },
      {
        type: "heading",
        text: "₹1 लाख — 10 साल बाद कितना बनेगा?"
      },
      {
        type: "table",
        headers: ["Investment", "Rate", "10 साल बाद"],
        rows: [
          ["Savings Account", "3.5%",  "₹1,41,060"],
          ["Fixed Deposit",   "7%",    "₹1,96,715"],
          ["Mutual Fund",     "12%",   "₹3,10,585"],
          ["Mutual Fund",     "15%",   "₹4,04,556"],
        ]
      },
      {
        type: "conclusion",
        text: "सच यह है कि FD और Mutual Fund दोनों की जगह है। Emergency fund → FD, Long-term wealth → Mutual Fund SIP। Smart investor दोनों use करता है। हमारे SIP Calculator से अभी calculate करें!"
      }
    ]
  },
  {
    id: 3,
    slug: "income-tax-old-vs-new-regime",
    title: "Income Tax 2024-25: Old Regime या New Regime — कौन सा चुनें?",
    excerpt: "Budget 2024 के बाद New Regime default हो गया है। लेकिन क्या यह आपके लिए सही है? पूरी calculation यहाँ समझें।",
    category: "tax",
    readTime: "7 min",
    date: "25 Jan 2025",
    featured: false,
    emoji: "📋",
    content: [
      {
        type: "intro",
        text: "FY 2024-25 से New Tax Regime default हो गई है। अगर आपने कुछ नहीं किया तो employer automatically New Regime में TDS काट रहा है। जानें कि आपके लिए कौन सा option फायदेमंद है।"
      },
      {
        type: "heading",
        text: "New Regime के Tax Slabs (FY 2024-25)"
      },
      {
        type: "table",
        headers: ["Income Range", "Tax Rate"],
        rows: [
          ["₹0 – ₹3,00,000",       "0%"],
          ["₹3,00,001 – ₹6,00,000", "5%"],
          ["₹6,00,001 – ₹9,00,000", "10%"],
          ["₹9,00,001 – ₹12,00,000","15%"],
          ["₹12,00,001 – ₹15,00,000","20%"],
          ["₹15,00,000 से ऊपर",     "30%"],
        ]
      },
      {
        type: "highlight",
        text: "🎉 New Regime में ₹7 लाख तक income पर Rebate 87A की वजह से ZERO TAX है! और ₹75,000 Standard Deduction भी मिलती है।"
      },
      {
        type: "heading",
        text: "Old Regime के Tax Slabs (FY 2024-25)"
      },
      {
        type: "table",
        headers: ["Income Range", "Tax Rate"],
        rows: [
          ["₹0 – ₹2,50,000",        "0%"],
          ["₹2,50,001 – ₹5,00,000",  "5%"],
          ["₹5,00,001 – ₹10,00,000", "20%"],
          ["₹10,00,000 से ऊपर",      "30%"],
        ]
      },
      {
        type: "heading",
        text: "Old Regime किसके लिए फायदेमंद है?"
      },
      {
        type: "list",
        items: [
          "80C में ₹1.5 लाख invest करते हैं (PPF, ELSS, LIC)",
          "HRA claim करते हैं (किराए पर रहते हैं)",
          "Home loan है — ₹2 लाख interest deduction",
          "NPS में invest करते हैं (80CCD 1B — ₹50,000 extra)",
          "Health Insurance है (80D — ₹25,000-50,000)"
        ]
      },
      {
        type: "heading",
        text: "Practical Example — ₹10 लाख salary"
      },
      {
        type: "table",
        headers: ["Deduction", "Old Regime", "New Regime"],
        rows: [
          ["Standard Deduction", "₹50,000", "₹75,000"],
          ["80C",                "₹1,50,000","❌"],
          ["80D",                "₹25,000",  "❌"],
          ["HRA",                "₹60,000",  "❌"],
          ["Taxable Income",     "₹7,15,000","₹9,25,000"],
          ["Total Tax + Cess",   "₹54,600",  "₹58,500"],
        ]
      },
      {
        type: "conclusion",
        text: "Is case में Old Regime ₹3,900 better है। लेकिन हर person की situation अलग होती है। हमारे Tax Calculator से अपनी exact calculation करें और देखें आपके लिए कौन सा regime बेहतर है!"
      }
    ]
  },
  {
    id: 4,
    slug: "ghar-baithe-paise-kaise-kamayein",
    title: "घर बैठे पैसे कैसे कमाएं — 2025 में 7 Real तरीके",
    excerpt: "Freelancing से लेकर YouTube तक — ये 7 तरीके real हैं और लाखों लोग इनसे पैसे कमा रहे हैं। कोई fake promise नहीं।",
    category: "earning",
    readTime: "8 min",
    date: "1 Feb 2025",
    featured: false,
    emoji: "💻",
    content: [
      {
        type: "intro",
        text: "Internet पर '1 दिन में ₹10,000 कमाओ' जैसे बहुत से ads आते हैं — ये सब scam हैं। लेकिन घर से genuinely पैसे कमाने के real तरीके भी हैं। यहाँ सिर्फ वही बताएंगे जो actually काम करते हैं।"
      },
      {
        type: "heading",
        text: "1. Freelancing — सबसे Fast तरीका"
      },
      {
        type: "para",
        text: "अगर आपको कोई skill आती है — writing, designing, coding, video editing, data entry — तो आप Fiverr, Upwork, या Freelancer पर काम ढूंढ सकते हैं। शुरुआत में ₹500-1000 per project मिलेगा, experience के साथ ₹5000-50,000 तक जा सकता है।"
      },
      {
        type: "highlight",
        text: "💰 एक अच्छा freelancer India में ₹30,000-₹1,50,000/month घर बैठे कमाता है।"
      },
      {
        type: "heading",
        text: "2. YouTube Channel"
      },
      {
        type: "para",
        text: "YouTube पर monetization के लिए 1000 subscribers और 4000 watch hours चाहिए। Finance, cooking, education, tech — किसी भी topic पर channel बना सकते हैं। Hindi content creators को बहुत अच्छे views मिलते हैं।"
      },
      {
        type: "heading",
        text: "3. Blogging / Content Writing"
      },
      {
        type: "para",
        text: "एक अच्छा blog Google AdSense से ₹10,000-₹1,00,000/month कमा सकता है। शुरुआत में 6-12 महीने लगते हैं। Hindi blogs की demand बहुत बढ़ रही है क्योंकि competition अभी कम है।"
      },
      {
        type: "heading",
        text: "4. Online Tuition / Teaching"
      },
      {
        type: "para",
        text: "Vedantu, Unacademy, या खुद YouTube/Zoom पर पढ़ा सकते हैं। Subject teacher, language tutor, या competitive exam coach — सभी की demand है। ₹200-500 per hour आसानी से मिलते हैं।"
      },
      {
        type: "heading",
        text: "5. Stock Market / Trading (Careful!)"
      },
      {
        type: "para",
        text: "Stock market से पैसे कमाए जा सकते हैं — लेकिन पहले सीखना बहुत ज़रूरी है। बिना knowledge के trading में 90% लोग पैसे खोते हैं। पहले Investing सीखें, फिर Trading।"
      },
      {
        type: "heading",
        text: "6. Affiliate Marketing"
      },
      {
        type: "para",
        text: "Amazon, Flipkart, या किसी भी company का affiliate बनें। उनके products का link share करें। हर sale पर 2-15% commission मिलता है। अगर आपके पास blog, YouTube, या बड़ा social media following है तो यह बहुत अच्छा काम करता है।"
      },
      {
        type: "heading",
        text: "7. Sell on Meesho / Amazon"
      },
      {
        type: "para",
        text: "Meesho पर reselling से शुरुआत करें — zero investment में। या Amazon/Flipkart पर अपना product sell करें। बहुत से लोग घर से handicrafts, pickles, homemade products बेचकर ₹20,000-50,000/month कमा रहे हैं।"
      },
      {
        type: "table",
        headers: ["तरीका", "शुरुआती Investment", "Time to First Income", "Potential"],
        rows: [
          ["Freelancing",    "Zero",      "1-4 weeks",  "₹20K-1.5L/month"],
          ["YouTube",        "Camera/Phone","6-12 months","Unlimited"],
          ["Blogging",       "₹3-5K/year","6-12 months","₹10K-1L/month"],
          ["Online Teaching","Zero",      "1-2 weeks",  "₹10K-50K/month"],
          ["Affiliate",      "Zero",      "1-3 months", "₹5K-50K/month"],
          ["Meesho Resell",  "Zero",      "1 week",     "₹5K-20K/month"],
        ]
      },
      {
        type: "conclusion",
        text: "कोई भी एक तरीका चुनो और उसमें seriously 3-6 महीने लगाओ। Short-cut नहीं है। लेकिन consistent रहे तो results ज़रूर आते हैं। याद रखो — Online earning + Smart investing = Financial Freedom।"
      }
    ]
  },
];