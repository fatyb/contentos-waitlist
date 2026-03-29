"use client";

import { useState, useEffect, useRef } from "react";
import { joinWaitlist } from "./actions";

// ── Brand tokens ──────────────────────────────────────────────────────────────
const NEON    = "#D7FE03";
const PURPLE  = "#7333FF";
const PURPLE2 = "#8478F0";
const BG      = "#07050F";

// ── Countdown ─────────────────────────────────────────────────────────────────
const LAUNCH_DATE = new Date("2026-06-06T00:00:00Z");

function getTimeLeft() {
  const diff = LAUNCH_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// ── Logo — interwoven neon gradient triangle ───────────────────────────────────
function BombonLogo({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={NEON} />
          <stop offset="100%" stopColor={PURPLE} />
        </linearGradient>
        <linearGradient id="lg2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={PURPLE} />
          <stop offset="100%" stopColor={PURPLE2} />
        </linearGradient>
        <linearGradient id="lg3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor={PURPLE2} />
          <stop offset="100%" stopColor={NEON} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Bottom-left arm */}
      <path d="M28 6 L8 44 L20 44 L28 28 L36 44 L48 44 Z"
        fill="none" stroke="url(#lg1)" strokeWidth="3.5"
        strokeLinejoin="round" filter="url(#glow)" opacity="0.95"/>
      {/* Inner weave — left cross */}
      <path d="M18 38 L28 20 L33 30" fill="none"
        stroke="url(#lg2)" strokeWidth="3.5" strokeLinecap="round" filter="url(#glow)"/>
      {/* Inner weave — right cross */}
      <path d="M38 38 L28 20 L23 30" fill="none"
        stroke="url(#lg3)" strokeWidth="3.5" strokeLinecap="round" filter="url(#glow)"/>
      {/* Apex dot */}
      <circle cx="28" cy="6" r="2.5" fill={NEON} opacity="0.9"/>
    </svg>
  );
}

// ── Countdown tile ────────────────────────────────────────────────────────────
function Tile({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[48px]">
      <span style={{ color: NEON, fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
        {String(value).padStart(2, "0")}
      </span>
      <span style={{ color: "#555", fontSize: "0.6rem", letterSpacing: "0.15em", marginTop: "4px" }} className="uppercase">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return <span style={{ color: "#333", fontSize: "1.4rem", fontWeight: 300, alignSelf: "flex-start", marginTop: "2px" }}>:</span>;
}

// ── Live countdown ────────────────────────────────────────────────────────────
function Countdown() {
  const [t, setT] = useState(getTimeLeft());
  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 mt-6">
      <div className="flex items-center gap-3">
        <Tile value={t.days}    label="Days"    />
        <Colon />
        <Tile value={t.hours}   label="Hours"   />
        <Colon />
        <Tile value={t.minutes} label="Minutes" />
        <Colon />
        <Tile value={t.seconds} label="Seconds" />
      </div>
      <div className="flex items-center gap-1.5 mt-1">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="#444" strokeWidth="1.2"/>
          <path d="M4 1v2M8 1v2" stroke="#444" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M1 5h10" stroke="#444" strokeWidth="1.2"/>
        </svg>
        <span style={{ color: "#555", fontSize: "0.6rem", letterSpacing: "0.15em" }} className="uppercase">
          Left Until Full Release
        </span>
      </div>
    </div>
  );
}

// ── Social proof avatars ───────────────────────────────────────────────────────
function SocialProof() {
  const avatars = [
    { bg: "linear-gradient(135deg,#D7FE03,#7333FF)", init: "JK" },
    { bg: "linear-gradient(135deg,#7333FF,#8478F0)", init: "AM" },
    { bg: "linear-gradient(135deg,#8478F0,#D7FE03)", init: "SR" },
    { bg: "linear-gradient(135deg,#D7FE03,#06b6d4)", init: "TL" },
    { bg: "linear-gradient(135deg,#7333FF,#ec4899)", init: "MC" },
  ];
  return (
    <div className="flex items-center gap-3 justify-center mt-5">
      <div className="flex" style={{ gap: "-8px" }}>
        {avatars.map((a, i) => (
          <div key={i} style={{
            width: 28, height: 28, borderRadius: "50%",
            background: a.bg,
            border: `2px solid ${BG}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "8px", fontWeight: 700, color: "#fff",
            marginLeft: i === 0 ? 0 : -8,
            position: "relative", zIndex: avatars.length - i,
          }}>
            {a.init}
          </div>
        ))}
      </div>
      <span style={{ color: "#666", fontSize: "0.8rem" }}>
        Be the Sweetest Spot: Join{" "}
        <span style={{ color: "#fff", fontWeight: 700 }}>11,821+</span>
        {" "}creators already waiting.
      </span>
    </div>
  );
}

// ── Waitlist form ─────────────────────────────────────────────────────────────
function WaitlistForm() {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg]       = useState("");
  const ref = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    const fd = new FormData(ref.current);
    const res = await joinWaitlist(fd);
    if (res.success) {
      setStatus("success"); setMsg(res.message); setEmail("");
    } else {
      setStatus("error");   setMsg(res.message);
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-lg mx-auto mt-6">
        <div style={{
          border: `1px solid ${NEON}`,
          boxShadow: `0 0 24px rgba(215,254,3,0.2), 0 0 48px rgba(115,51,255,0.15)`,
          borderRadius: "12px", padding: "20px", textAlign: "center",
          background: "rgba(215,254,3,0.03)",
        }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "6px" }}>🎉</div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{msg}</p>
          <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "4px" }}>
            We'll reach out before the sweet spot drops.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form ref={ref} onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-6">
      {/* Neon border wrapper */}
      <div style={{
        border: `1px solid ${NEON}`,
        boxShadow: `0 0 16px rgba(215,254,3,0.18), 0 0 40px rgba(115,51,255,0.12)`,
        borderRadius: "10px",
        padding: "1px",
      }}>
        <div style={{ display: "flex", borderRadius: "9px", overflow: "hidden", background: BG }}>
          <input
            name="email" type="email" required
            placeholder="Drop your email here..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              padding: "14px 18px", color: "#fff", fontSize: "0.875rem",
              fontFamily: "inherit",
            }}
          />
          <button type="submit" disabled={status === "loading"} style={{
            background: `linear-gradient(135deg, ${PURPLE}, #5b21b6)`,
            border: "none", cursor: "pointer",
            padding: "14px 22px",
            color: "#fff", fontWeight: 700, fontSize: "0.8rem",
            letterSpacing: "0.02em", whiteSpace: "nowrap",
            opacity: status === "loading" ? 0.6 : 1,
            transition: "all 0.2s",
          }}>
            {status === "loading" ? "Joining…" : "Claim Your Early Access Now"}
          </button>
        </div>
      </div>
      {status === "error" && (
        <p style={{ color: "#f87171", fontSize: "0.75rem", textAlign: "center", marginTop: "8px" }}>{msg}</p>
      )}
      <p style={{ color: "#444", fontSize: "0.7rem", textAlign: "center", marginTop: "8px" }}>
        No spam. No fluff. Just early access to the sweetest spot in content.
      </p>
    </form>
  );
}

// ── FAQ accordion ─────────────────────────────────────────────────────────────
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "10px", overflow: "hidden",
      background: open ? "rgba(115,51,255,0.04)" : "transparent",
      transition: "background 0.2s",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px", background: "none", border: "none",
        cursor: "pointer", textAlign: "left", color: open ? "#fff" : "rgba(255,255,255,0.7)",
        transition: "color 0.15s",
      }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 600, paddingRight: "16px" }}>{q}</span>
        <span style={{
          flexShrink: 0, width: 20, height: 20,
          border: `1px solid ${open ? NEON : "rgba(255,255,255,0.2)"}`,
          borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "all 0.3s",
          boxShadow: open ? `0 0 8px rgba(215,254,3,0.3)` : "none",
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke={open ? NEON : "currentColor"} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div style={{
        maxHeight: open ? "300px" : "0px", overflow: "hidden",
        transition: "max-height 0.3s ease-in-out",
      }}>
        <p style={{ padding: "0 20px 16px", fontSize: "0.825rem", color: "#777", lineHeight: 1.7 }}>{a}</p>
      </div>
    </div>
  );
}

const FAQS = [
  {
    q: "Will my content sound robotic?",
    a: "Never. BOMBON is trained on YOUR voice first. Before generating a single word, it builds a deep tonal fingerprint from your existing content — your slang, your rhythm, your hot takes. The output sounds like the best version of you, not a chatbot.",
  },
  {
    q: "Is this just another scheduler?",
    a: "Absolutely not. Schedulers move content. BOMBON orchestrates it. We analyze performance data, identify what resonates with your audience, repurpose your top content into new formats, and then schedule it — all autonomously. It's the difference between a delivery driver and a strategic director.",
  },
  {
    q: "How does BOMBON handle repurposing?",
    a: "Drop in a YouTube video, a podcast, a long-form article — BOMBON will extract the core ideas, reformat them into threads, carousels, newsletters, and short-form scripts, and adapt the tone for each platform. One piece of content becomes ten. Automatically.",
  },
  {
    q: "Which platforms are supported at launch?",
    a: "Twitter/X, LinkedIn, Instagram, TikTok (scripts), YouTube (descriptions + community posts), and newsletters via Beehiiv or ConvertKit. We're adding more based on what the waitlist votes for.",
  },
  {
    q: "How much will the sweet spot cost?",
    a: "Pricing is being finalized, but waitlist members lock in a founding rate — up to 45% off, forever. You'll be notified before we go public. Early birds eat well here.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  // Pulsing glow animation via JS
  const [glowOpacity, setGlowOpacity] = useState(0.18);
  useEffect(() => {
    let tick = 0;
    const id = setInterval(() => {
      tick += 0.03;
      setGlowOpacity(0.15 + Math.sin(tick) * 0.07);
    }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 16px", position: "relative", overflow: "hidden" }}>

      {/* ── Ambient pulsing purple glow ── */}
      <div aria-hidden="true" style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -60%)",
        width: "700px", height: "700px", borderRadius: "50%",
        background: `radial-gradient(circle, rgba(115,51,255,${glowOpacity}) 0%, transparent 70%)`,
        pointerEvents: "none", transition: "background 0.1s",
        filter: "blur(40px)",
      }} />

      {/* ── Hero content ── */}
      <section style={{ width: "100%", maxWidth: "560px", textAlign: "center", position: "relative", zIndex: 10 }}>

        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <BombonLogo size={60} />
        </div>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "99px", padding: "5px 14px",
          marginBottom: "28px",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: NEON, boxShadow: `0 0 8px ${NEON}`, display: "inline-block" }} />
          <span style={{ color: "#999", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>
            Unveiling in Early 2026
          </span>
        </div>

        {/* ── Floating neon-border card ── */}
        <div style={{
          border: `1px solid rgba(215,254,3,0.35)`,
          boxShadow: `0 0 0 1px rgba(215,254,3,0.08), 0 0 40px rgba(215,254,3,0.07), 0 0 80px rgba(115,51,255,0.12), inset 0 0 40px rgba(115,51,255,0.04)`,
          borderRadius: "20px",
          padding: "40px 32px 36px",
          backdropFilter: "blur(12px)",
          background: "rgba(7,5,15,0.6)",
        }}>

          {/* Wordmark */}
          <div style={{ marginBottom: "12px" }}>
            <span style={{
              fontWeight: 900, fontSize: "clamp(1rem, 5vw, 1.15rem)",
              letterSpacing: "0.25em", textTransform: "uppercase",
              background: `linear-gradient(90deg, ${NEON}, ${PURPLE2})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              BOMBON
            </span>
            <span style={{ color: "#444", fontSize: "0.7rem", letterSpacing: "0.1em", marginLeft: "8px" }}>
              The Sweet Spot for Content
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontWeight: 900,
            fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#fff",
            marginBottom: "16px",
          }}>
            Your Content.{" "}
            <span style={{
              background: `linear-gradient(90deg, ${NEON}, ${PURPLE2})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Perfected, Mapped,
            </span>
            {" "}and Deployed.{" "}
            <span style={{ color: NEON }}>That's BOMBON.</span>
          </h1>

          {/* Subhead */}
          <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "460px", margin: "0 auto 4px" }}>
            The content orchestration OS that creator-founders have been begging for.
            Stop managing chaos.{" "}
            <span style={{ color: "#999" }}>Start dominating your niche.</span>{" "}
            Analyze your voice, repurpose everything, and schedule with precision.
          </p>

          {/* Form */}
          <WaitlistForm />

          {/* Social proof */}
          <SocialProof />

          {/* Countdown */}
          <Countdown />

        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ width: "100%", maxWidth: "560px", borderTop: "1px solid rgba(255,255,255,0.05)", margin: "56px 0" }} />

      {/* ── FAQ ── */}
      <section style={{ width: "100%", maxWidth: "560px", position: "relative", zIndex: 10 }}>
        <h2 style={{ fontWeight: 900, fontSize: "1.6rem", textAlign: "center", marginBottom: "8px", letterSpacing: "-0.02em", color: "#fff" }}>
          Frequently asked questions
        </h2>
        <p style={{ color: "#555", fontSize: "0.82rem", textAlign: "center", marginBottom: "28px" }}>
          Everything you need to know about the sweet spot.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ marginTop: "56px", color: "#333", fontSize: "0.7rem", textAlign: "center", zIndex: 10 }}>
        © {new Date().getFullYear()} BOMBON. All rights reserved.{" "}
        <span style={{ color: NEON }}>The sweet spot for content.</span>
      </footer>

    </main>
  );
}
