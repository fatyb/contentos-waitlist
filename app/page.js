"use client";

import { useState, useEffect, useRef } from "react";
import { joinWaitlist } from "./actions";

// ─── Countdown helpers ────────────────────────────────────────────────────────
const LAUNCH_DATE = new Date("2026-06-06T00:00:00Z");

function getTimeLeft() {
  const now = new Date();
  const diff = LAUNCH_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** ContentOS logo — abstract "C + nodes" SVG */
function Logo() {
  return (
    <div className="flex items-center gap-2.5 justify-center mb-6 animate-fade-in-up">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ContentOS logo"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path
          d="M28 18a10 10 0 1 1-4.5-8.4"
          stroke="url(#logoGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="18" cy="18" r="3" fill="url(#logoGrad)" />
        <circle cx="30" cy="10" r="2" fill="url(#logoGrad)" opacity="0.8" />
        <circle cx="30" cy="26" r="2" fill="url(#logoGrad)" opacity="0.6" />
        <circle cx="8"  cy="18" r="1.5" fill="url(#logoGrad)" opacity="0.5" />
        <line x1="20.5" y1="16" x2="28.2" y2="11.4" stroke="url(#logoGrad)" strokeWidth="1" opacity="0.5" />
        <line x1="20.5" y1="20" x2="28.2" y2="24.6" stroke="url(#logoGrad)" strokeWidth="1" opacity="0.5" />
      </svg>
      <span className="text-white font-semibold text-lg tracking-wide">ContentOS</span>
    </div>
  );
}

/** Countdown tile */
function Tile({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-white text-2xl font-bold tabular-nums w-10 text-center">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-gray-500 text-[10px] uppercase tracking-widest mt-0.5">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return <span className="text-gray-600 text-xl font-light self-start mt-0.5">:</span>;
}

/** Live countdown */
function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 mt-6 animate-fade-in-up delay-400">
      <div className="flex items-center gap-3">
        <Tile value={time.days}    label="Days"    />
        <Colon />
        <Tile value={time.hours}   label="Hours"   />
        <Colon />
        <Tile value={time.minutes} label="Minutes" />
        <Colon />
        <Tile value={time.seconds} label="Seconds" />
      </div>
      <div className="flex items-center gap-1.5 mt-1">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="#4B5563" strokeWidth="1.2" />
          <path d="M4 1v2M8 1v2" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M1 5h10" stroke="#4B5563" strokeWidth="1.2" />
        </svg>
        <span className="text-gray-500 text-[10px] uppercase tracking-widest">
          Left Until Full Release
        </span>
      </div>
    </div>
  );
}

/** Avatar stack social-proof row */
function SocialProof({ count = 11821 }) {
  const avatarColors = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-cyan-500",
    "from-pink-500 to-rose-500",
    "from-amber-400 to-orange-500",
    "from-emerald-400 to-teal-500",
  ];
  const initials = ["JK", "AM", "SR", "TL", "MC"];

  return (
    <div className="flex items-center gap-3 justify-center mt-5 animate-fade-in-up delay-300">
      <div className="flex -space-x-2">
        {avatarColors.map((grad, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-full bg-gradient-to-br ${grad} border-2 border-[#020617] flex items-center justify-center text-[9px] font-bold text-white`}
          >
            {initials[i]}
          </div>
        ))}
      </div>
      <span className="text-gray-400 text-sm">
        Join{" "}
        <span className="text-white font-semibold">
          {count.toLocaleString()}
        </span>{" "}
        + others on the waitlist
      </span>
    </div>
  );
}

/** Waitlist form */
function WaitlistForm() {
  const [email, setEmail]       = useState("");
  const [status, setStatus]     = useState("idle");
  const [message, setMessage]   = useState("");
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");

    const fd = new FormData(formRef.current);
    const result = await joinWaitlist(fd);

    if (result.success) {
      setStatus("success");
      setMessage(result.message);
      setEmail("");
    } else {
      setStatus("error");
      setMessage(result.message);
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-md mx-auto mt-6 animate-fade-in-up">
        <div className="gradient-border glow-purple rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" stroke="#7C3AED" strokeWidth="1.5" />
              <path d="M7.5 12l3 3 6-6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-white font-semibold">{message}</p>
          <p className="text-gray-400 text-sm mt-1">We'll reach out before launch.</p>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto mt-6 animate-fade-in-up delay-200"
    >
      <div className="gradient-border glow-purple rounded-lg p-[1px]">
        <div className="flex rounded-[7px] overflow-hidden bg-[#020617]">
          <input
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-500 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="relative px-5 py-3 text-sm font-semibold text-white whitespace-nowrap overflow-hidden
                       bg-gradient-to-r from-violet-600 to-blue-500
                       hover:from-violet-500 hover:to-blue-400
                       active:scale-95 transition-all duration-200
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
                </svg>
                Joining…
              </span>
            ) : (
              "Join Waitlist"
            )}
          </button>
        </div>
      </div>
      {status === "error" && (
        <p className="text-red-400 text-xs text-center mt-2">{message}</p>
      )}
      <p className="text-gray-600 text-xs text-center mt-2">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}

/** Single FAQ accordion item */
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/[0.07] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left
                   text-white/80 hover:text-white transition-colors duration-150
                   hover:bg-white/[0.03]"
        aria-expanded={open}
      >
        <span className="text-sm font-medium pr-4">{question}</span>
        <span
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center
                     border border-white/20 rounded-full transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "400px" : "0px" }}
      >
        <p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

const FAQ_ITEMS = [
  {
    question: "What is ContentOS?",
    answer:
      "ContentOS is an AI-powered content orchestration system built on Claude 3.5. It analyzes your unique writing voice, automatically repurposes your existing content (videos, posts, podcasts) across platforms, and handles scheduling — so you can focus on creating, not distributing.",
  },
  {
    question: "How does the AI learn my voice?",
    answer:
      "When you connect your existing content library, ContentOS uses Claude 3.5 to build a deep voice profile — capturing your tone, vocabulary, sentence rhythm, and recurring themes. Every generated piece is calibrated to sound authentically like you.",
  },
  {
    question: "Which platforms does ContentOS support?",
    answer:
      "At launch we'll support Twitter/X threads, LinkedIn articles, Instagram captions, YouTube descriptions, newsletters, and short-form video scripts (TikTok / Reels). More platforms are on the roadmap based on waitlist demand.",
  },
  {
    question: "Is my content and data kept private?",
    answer:
      "Yes. Your content is never used to train shared models. All processing happens within your isolated workspace. We follow SOC 2 principles and offer data deletion on request.",
  },
  {
    question: "How much will ContentOS cost?",
    answer:
      "Pricing hasn't been finalized, but waitlist members will receive a founding-member discount (up to 40% off) and early access before the public launch. We'll share pricing details via email well before we go live.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] flex flex-col items-center px-4 py-16">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full
                        bg-gradient-to-b from-violet-700/20 via-transparent to-transparent blur-3xl" />
      </div>

      {/* ── Hero ── */}
      <section className="relative w-full max-w-lg text-center z-10">
        <div className="inline-flex items-center gap-1.5 text-xs text-gray-400 tracking-wider uppercase
                        border border-white/10 rounded-full px-3 py-1 mb-8 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available in Early 2026
        </div>

        <Logo />

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4 animate-fade-in-up delay-100">
          Your Content,{" "}
          <span className="gradient-text">Supercharged by Claude 3.5.</span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-md mx-auto animate-fade-in-up delay-200">
          Analyze your unique voice. Repurpose your media. Automate your
          scheduling. Join our exclusive waitlist for the AI OS that content
          creators have been waiting for.
        </p>

        <WaitlistForm />
        <SocialProof />
        <Countdown />
      </section>

      {/* ── Divider ── */}
      <div className="w-full max-w-lg my-16 border-t border-white/[0.06]" />

      {/* ── FAQ ── */}
      <section className="w-full max-w-lg z-10">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Frequently asked questions
        </h2>
        <p className="text-gray-500 text-sm text-center mb-8">
          Everything you need to know about ContentOS.
        </p>
        <div className="flex flex-col gap-2">
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.question} {...item} />
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 text-gray-600 text-xs text-center z-10">
        © {new Date().getFullYear()} ContentOS. All rights reserved.
      </footer>
    </main>
  );
}
