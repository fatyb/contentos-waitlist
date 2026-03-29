"use client";

import { useState, useEffect, useRef } from "react";
import { joinWaitlist } from "./actions";

// ── Brand tokens ──────────────────────────────────────────────────────────────
const NEON   = "#D7FE03";
const PURPLE = "#7333FF";
const PURPLE2 = "#8478F0";

// ── FAQ data ──────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    id: 1,
    q: "Will my content sound robotic?",
    a: "Never. BOMBON is trained on YOUR voice first. Before generating a single word, it builds a deep tonal fingerprint from your existing content — your slang, your rhythm, your hot takes. The output sounds like the best version of you, not a chatbot.",
  },
  {
    id: 2,
    q: "Is this just another scheduler?",
    a: "Absolutely not. Schedulers move content. BOMBON orchestrates it. We analyze performance data, identify what resonates with your audience, repurpose your top content into new formats, and then schedule it — all autonomously.",
  },
  {
    id: 3,
    q: "How does BOMBON handle repurposing?",
    a: "Drop in a YouTube video, a podcast, a long-form article — BOMBON extracts core ideas, reformats them into threads, carousels, newsletters, and short-form scripts, and adapts the tone for each platform. One piece of content becomes ten. Automatically.",
  },
  {
    id: 4,
    q: "Which platforms are supported at launch?",
    a: "Twitter/X, LinkedIn, Instagram, TikTok (scripts), YouTube (descriptions + community posts), and newsletters via Beehiiv or ConvertKit. We're adding more based on what the waitlist votes for.",
  },
  {
    id: 5,
    q: "How much will the sweet spot cost?",
    a: "Pricing is being finalized, but waitlist members lock in a founding rate — up to 45% off, forever. You'll be notified before we go public. Early birds eat well here.",
  },
];

// ── Countdown ─────────────────────────────────────────────────────────────────
const LAUNCH_DATE = new Date("2026-06-06T00:00:00Z");

function getTimeLeft() {
  const diff = LAUNCH_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000)  % 24),
    minutes: Math.floor((diff / 60000)    % 60),
    seconds: Math.floor((diff / 1000)     % 60),
  };
}

// ── Logo — interwoven gradient triangle ───────────────────────────────────────
function BombonLogo() {
  return (
    <svg width="67" height="67" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={NEON}   />
          <stop offset="100%" stopColor={PURPLE}  />
        </linearGradient>
        <linearGradient id="lg2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={PURPLE}  />
          <stop offset="100%" stopColor={PURPLE2} />
        </linearGradient>
        <linearGradient id="lg3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor={PURPLE2} />
          <stop offset="100%" stopColor={NEON}    />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M28 6 L8 44 L20 44 L28 28 L36 44 L48 44 Z"
        fill="none" stroke="url(#lg1)" strokeWidth="3.5"
        strokeLinejoin="round" filter="url(#glow)" opacity="0.95"/>
      <path d="M18 38 L28 20 L33 30" fill="none"
        stroke="url(#lg2)" strokeWidth="3.5" strokeLinecap="round" filter="url(#glow)"/>
      <path d="M38 38 L28 20 L23 30" fill="none"
        stroke="url(#lg3)" strokeWidth="3.5" strokeLinecap="round" filter="url(#glow)"/>
      <circle cx="28" cy="6" r="2.5" fill={NEON} opacity="0.9"/>
    </svg>
  );
}

// ── Countdown display ─────────────────────────────────────────────────────────
function Countdown() {
  const [t, setT] = useState(getTimeLeft());
  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2 mt-6">
      {/* Tiles */}
      <div className="flex items-start gap-4">
        {[
          { val: t.days,    label: "DAYS"    },
          { val: t.hours,   label: "HOURS"   },
          { val: t.minutes, label: "MINUTES" },
          { val: t.seconds, label: "SECONDS" },
        ].map((item, i) => (
          <div key={item.label} className="flex items-start gap-4">
            {i > 0 && (
              <span style={{ color: "#7e7e7e", fontSize: "11px", lineHeight: "21px", marginTop: "0px" }}>:</span>
            )}
            <div className="flex flex-col items-center">
              <span style={{
                color: "#fff", fontSize: "18px", lineHeight: "21px",
                fontFamily: "'Inter', sans-serif", fontWeight: 400,
                minWidth: "22px", textAlign: "center",
              }}>
                {pad(item.val)}
              </span>
              <span style={{
                color: "#7e7e7e", fontSize: "11px", lineHeight: "11px",
                marginTop: "8px", fontFamily: "'Inter', sans-serif",
                letterSpacing: "0px",
              }}>
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* "Left until full release" label */}
      <div className="flex items-center gap-1.5 mt-2">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="#7e7e7e" strokeWidth="1.2"/>
          <path d="M4 1v2M8 1v2" stroke="#7e7e7e" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M1 5h10" stroke="#7e7e7e" strokeWidth="1.2"/>
        </svg>
        <span style={{
          color: "#fff", fontSize: "12px", letterSpacing: "0.48px",
          fontFamily: "'Inter', sans-serif", fontWeight: 500,
        }}>
          LEFT UNTIL FULL RELEASE
        </span>
      </div>
    </div>
  );
}

// ── Social proof ──────────────────────────────────────────────────────────────
function SocialProof() {
  const avatars = [
    { bg: `linear-gradient(135deg,${NEON},${PURPLE})`,   init: "JK" },
    { bg: `linear-gradient(135deg,${PURPLE},${PURPLE2})`, init: "AM" },
    { bg: `linear-gradient(135deg,${PURPLE2},${NEON})`,   init: "SR" },
    { bg: `linear-gradient(135deg,${NEON},#06b6d4)`,      init: "TL" },
    { bg: `linear-gradient(135deg,${PURPLE},#ec4899)`,    init: "MC" },
  ];

  return (
    <div className="flex items-center gap-2.5 justify-center mt-5">
      {/* Stacked avatars */}
      <div className="flex">
        {avatars.map((a, i) => (
          <div key={i} style={{
            width: 28, height: 28, borderRadius: "50%",
            background: a.bg,
            border: "2px solid #0d0d0d",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "8px", fontWeight: 700, color: "#fff",
            marginLeft: i === 0 ? 0 : -8,
            position: "relative", zIndex: 10 - i,
          }}>
            {a.init}
          </div>
        ))}
      </div>
      {/* Text */}
      <p style={{ color: "#7e7e7e", fontSize: "14px", letterSpacing: "0.14px", fontFamily: "'Inter', sans-serif" }}>
        Be the Sweetest Spot: Join{" "}
        <span style={{ color: "#7e7e7e" }}>11,821</span>
        <span style={{ color: "#7e7e7e" }}> + </span>
        <span style={{ color: "#7e7e7e" }}>creators already waiting.</span>
      </p>
    </div>
  );
}

// ── Waitlist form ─────────────────────────────────────────────────────────────
function WaitlistForm() {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState("idle");
  const [msg, setMsg]       = useState("");
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    const fd = new FormData(formRef.current);
    const res = await joinWaitlist(fd);
    if (res.success) {
      setStatus("success"); setMsg(res.message); setEmail("");
    } else {
      setStatus("error"); setMsg(res.message);
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  if (status === "success") {
    return (
      <div className="w-full mt-7">
        <div style={{
          background: "#141414",
          borderRadius: "12px",
          border: `1px solid ${NEON}44`,
          boxShadow: `inset 0 1px 0 #ffffff12, 0 0 20px ${NEON}22`,
          padding: "18px 20px", textAlign: "center",
        }}>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px", fontFamily: "'Geist', 'Inter', sans-serif" }}>
            🎉 {msg}
          </p>
          <p style={{ color: "#7e7e7e", fontSize: "13px", marginTop: "4px" }}>
            We'll reach out before the sweet spot drops.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="w-full mt-7">
      {/* Outer shadow layer — mimics Figma's blur bg */}
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "#141414",
          borderRadius: "11px",
          opacity: 0.3,
          transform: "translateY(4px) scaleX(0.98)",
          filter: "blur(6px)",
        }} />

        {/* Main input row */}
        <div style={{
          position: "relative",
          background: "#141414",
          borderRadius: "12px",
          border: "1px solid #1a1a1a",
          boxShadow: `inset 0 1px 0 #ffffff12, 0 0 0 1px #ffffff08`,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}>
          <label htmlFor="email-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>
            Email address
          </label>
          <input
            id="email-input"
            name="email"
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              padding: "12px 16px",
              color: "#7e7e7e", fontSize: "15px",
              fontFamily: "'Inter', sans-serif", letterSpacing: "0.15px",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              margin: "6px",
              padding: "8px 18px",
              borderRadius: "9px",
              background: "radial-gradient(50% 50% at 50% 75%, rgba(186,153,255,1) 16%, rgba(115,51,255,1) 80%)",
              border: "1px solid transparent",
              color: "#fff",
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontWeight: 500, fontSize: "14px",
              letterSpacing: "-0.13px", lineHeight: "24px",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              opacity: status === "loading" ? 0.6 : 1,
              whiteSpace: "nowrap",
              transition: "opacity 0.2s",
            }}
          >
            {status === "loading" ? "Joining…" : "Claim Your Early Access Now"}
          </button>
        </div>
      </div>

      {status === "error" && (
        <p style={{ color: "#f87171", fontSize: "12px", textAlign: "center", marginTop: "8px" }}>{msg}</p>
      )}
      <p style={{ color: "#555", fontSize: "11px", textAlign: "center", marginTop: "8px", fontFamily: "'Inter', sans-serif" }}>
        No spam. No fluff. Just early access to the sweetest spot in content.
      </p>
    </form>
  );
}

// ── FAQ item ──────────────────────────────────────────────────────────────────
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      style={{
        width: "100%", textAlign: "left", cursor: "pointer",
        background: "#141414",
        borderRadius: "12px",
        border: "none",
        boxShadow: "inset 0 1px 0 #ffffff12",
        overflow: "hidden",
        transition: "background 0.2s",
      }}
    >
      {/* Header row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px",
      }}>
        <span style={{
          color: "#fff", fontSize: "15px",
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "0.15px", lineHeight: "24px",
          fontWeight: 400,
        }}>
          {q}
        </span>

        {/* Plus / X icon */}
        <span style={{
          flexShrink: 0, width: 20, height: 20,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid ${open ? NEON : "rgba(255,255,255,0.15)"}`,
          borderRadius: "50%",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "all 0.25s",
          boxShadow: open ? `0 0 8px ${NEON}44` : "none",
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke={open ? NEON : "#fff"} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </div>

      {/* Answer — collapsible */}
      <div style={{
        maxHeight: open ? "240px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.3s ease-in-out",
      }}>
        <p style={{
          padding: "0 16px 14px",
          color: "#7e7e7e", fontSize: "13px",
          lineHeight: "1.7", fontFamily: "'Inter', sans-serif",
        }}>
          {a}
        </p>
      </div>
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div
      style={{
        width: "100%", minHeight: "100vh",
        background: "#0d0d0d",
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(115,51,255,0.22) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 50% 100%, rgba(115,51,255,0.08) 0%, transparent 70%)
        `,
        display: "flex", flexDirection: "column",
        alignItems: "center",
        padding: "64px 16px 56px",
      }}
    >

      {/* ── Hero section ── */}
      <section
        className="animate-fade-up"
        style={{
          width: "100%", maxWidth: "448px",
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center",
        }}
      >

        {/* Logo */}
        <div className="animate-fade-in" style={{ marginBottom: "20px" }}>
          <BombonLogo />
        </div>

        {/* Badge */}
        <div
          className="animate-fade-in delay-100"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#141414",
            borderRadius: "9999px",
            border: "1px solid #ffffff12",
            boxShadow: "inset 0 1px 0 #ffffff08",
            padding: "4px 14px",
            marginBottom: "28px",
          }}
        >
          {/* Neon dot — three-layer like Figma */}
          <span style={{ position: "relative", width: 9, height: 9, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ position: "absolute", width: 9,  height: 9,  borderRadius: "50%", background: NEON, opacity: 0.5, filter: "blur(1px)" }} />
            <span style={{ position: "absolute", width: 7,  height: 7,  borderRadius: "50%", background: NEON, opacity: 0.01 }} />
            <span style={{ position: "absolute", width: 5,  height: 5,  borderRadius: "50%", background: NEON }} />
          </span>
          <span style={{
            color: "#fff", fontSize: "12px", letterSpacing: "0.48px",
            fontFamily: "'Inter', sans-serif", fontWeight: 500,
          }}>
            UNVEILING IN EARLY 2026
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up delay-100"
          style={{
            fontFamily: "'Geist', 'Inter', sans-serif",
            fontWeight: 500, fontSize: "40px",
            letterSpacing: "-1.6px", lineHeight: "48px",
            color: "#fff", marginBottom: "10px",
          }}
        >
          Your Content.{" "}
          <span style={{
            background: `linear-gradient(90deg, ${NEON}, ${PURPLE2})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Perfected, Mapped,
          </span>
          {" "}and Deployed.{" "}
          <br />
          <span style={{ color: NEON }}>That's BOMBON.</span>
        </h1>

        {/* Subhead */}
        <p
          className="animate-fade-up delay-200"
          style={{
            color: "#7e7e7e", fontSize: "15px",
            letterSpacing: "0.15px", lineHeight: "24px",
            fontFamily: "'Inter', sans-serif",
            marginBottom: "4px",
          }}
        >
          The content orchestration OS that creator-founders have been begging for.
          Stop managing chaos. Start dominating your niche.
          Analyze your voice, repurpose everything, and schedule with precision.
        </p>

        {/* Form */}
        <div className="w-full animate-fade-up delay-200">
          <WaitlistForm />
        </div>

        {/* Social proof */}
        <div className="animate-fade-up delay-300">
          <SocialProof />
        </div>

        {/* Countdown */}
        <div className="animate-fade-up delay-400">
          <Countdown />
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{
        width: "100%", maxWidth: "448px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        margin: "52px 0",
      }} />

      {/* ── FAQ ── */}
      <section
        className="animate-fade-up delay-300"
        style={{ width: "100%", maxWidth: "448px" }}
      >
        {/* FAQ heading */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2 style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 500,
            fontSize: "28px", letterSpacing: "-0.56px", lineHeight: "39.2px",
            color: "#fff", marginBottom: "6px",
          }}>
            Frequently asked questions
          </h2>
          <p style={{ color: "#7e7e7e", fontSize: "15px", letterSpacing: "0.15px", lineHeight: "24px" }}>
            Everything you need to know about the sweet spot. Find
          </p>
          <p style={{ color: "#7e7e7e", fontSize: "15px", letterSpacing: "0.15px", lineHeight: "24px" }}>
            answers to the most common questions below.
          </p>
        </div>

        {/* FAQ list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {FAQ_DATA.map(f => (
            <FAQItem key={f.id} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        marginTop: "52px", color: "#555",
        fontSize: "12px", textAlign: "center",
        fontFamily: "'Inter', sans-serif",
      }}>
        © {new Date().getFullYear()} BOMBON.{" "}
        <span style={{ color: NEON }}>The sweet spot for content.</span>
      </footer>

    </div>
  );
}
