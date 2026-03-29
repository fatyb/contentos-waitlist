"use client";

import { useState, useEffect, useRef } from "react";
import { joinWaitlist } from "./actions";

// ── Brand tokens ──────────────────────────────────────────────────────────────
const NEON   = "#D7FE03";
const PURPLE = "#7333FF";

// ── Bilingual content ─────────────────────────────────────────────────────────
const CONTENT = {
  en: {
    dir: "ltr",
    font: "'Urbanist', 'Alexandria', sans-serif",
    toggleLabel: "عربي",
    badge: "Coming to the sweet spot. 2026",
    headlinePre: "Content that leads. Strategy by ",
    headlinePost: ".",
    subhead:
      "Turn past insights and current trends into high-impact growth. Bombon manages your content strategy intelligently, so you can focus on leading.",
    form: {
      placeholder: "Enter your email",
      button: "Reserve your spot on the waitlist",
      loading: "Joining…",
      successNote: "We'll reach out before launch.",
      noSpam: "No spam. Just early access to the best content strategy.",
      errorMsg: "Something went wrong. Please try again.",
    },
    social: {
      initials: ["M.K", "A.M", "S.R", "T.L", "M.A"],
      prefix: "Join",
      count: "11,821+",
      suffix: "creators in the sweet spot.",
    },
    countdown: {
      labels: ["days", "hours", "mins", "secs"],
      until: "Until full launch",
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about Bombon.",
      items: [
        {
          id: 1,
          q: "What exactly is Bombon?",
          a: "Bombon is an intelligent content strategy management system designed for creators and founders. It's more than a scheduling tool — it's a strategic partner that studies your past successes, monitors trends, and helps you craft impactful posts that reflect your authentic voice.",
        },
        {
          id: 2,
          q: "How does Bombon keep my content authentic?",
          a: "Unlike generic tools, Bombon is built to stay invisible. It doesn't write for you — it thinks with you. By analyzing your unique style, it acts as a strategic mirror reflecting your true voice, ensuring every post feels 100% human and personal.",
        },
        {
          id: 3,
          q: "Can I use my past posts to train the system?",
          a: "Absolutely. Bombon is designed to absorb your successful history and perfectly match your unique 'voice fingerprint'.",
        },
        {
          id: 4,
          q: "How does the trend-sync feature work?",
          a: "Our engine monitors real-time shifts in your niche and suggests content angles that connect your expertise to what's relevant right now.",
        },
        {
          id: 5,
          q: "Which platforms does Bombon support?",
          a: "We currently support LinkedIn, X (Twitter), and Instagram, with more platforms added based on user feedback.",
        },
      ],
    },
    footer: "The sweet spot for content.",
  },

  ar: {
    dir: "rtl",
    font: "'Alexandria', 'Urbanist', sans-serif",
    toggleLabel: "English",
    badge: "نحو المنطقة المثالية. 2026",
    headlinePre: "صناعة المحتوى، برؤية استراتيجية من ",
    headlinePost: ".",
    subhead:
      "حوّل تجاربك السابقة واتجاهات السوق إلى تأثير حقيقي. Bombon يدير استراتيجية محتواك بذكاء، لتتفرغ أنت للقيادة.",
    form: {
      placeholder: "البريد الإلكتروني",
      button: "احجز مكانك في قائمة الانتظار",
      loading: "جارٍ التسجيل…",
      successNote: "سنتواصل معك قبل الإطلاق.",
      noSpam: "لا رسائل مزعجة. فقط وصول مبكر إلى أفضل استراتيجية محتوى.",
      errorMsg: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    },
    social: {
      initials: ["م.ك", "أ.م", "س.ر", "ت.ل", "م.ع"],
      prefix: "كن جزءاً من",
      count: "11,821+",
      suffix: "مبدع في المنطقة المثالية.",
    },
    countdown: {
      labels: ["يوم", "ساعة", "دقيقة", "ثانية"],
      until: "متبقٍّ حتى الإطلاق الكامل",
    },
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "كل ما تحتاج معرفته عن Bombon.",
      items: [
        {
          id: 1,
          q: "ما هو Bombon بالضبط؟",
          a: 'Bombon هو نظام ذكي لإدارة استراتيجية المحتوى، مصمم خصيصاً لمنشئي المحتوى والمؤسسين. إنه أكثر من مجرد أداة جدولة؛ هو شريك استراتيجي يدرس نجاحاتك السابقة، ويرصد الاتجاهات، ويساعدك على صياغة منشورات مؤثرة تعبّر عن صوتك الحقيقي.',
        },
        {
          id: 2,
          q: "كيف يضمن Bombon أن يبقى محتواي أصيلاً؟",
          a: "على عكس الأدوات العامة، Bombon مبني ليبقى غير مرئي. لا يكتب عنك، بل يفكّر معك. من خلال تحليل أسلوبك الفريد، يعمل كمرآة استراتيجية تعكس صوتك الحقيقي، لضمان أن كل منشور يبدو 100% إنسانياً وشخصياً.",
        },
        {
          id: 3,
          q: "هل يمكنني استخدام منشوراتي السابقة لتدريب النظام؟",
          a: 'بالتأكيد. Bombon مصمم لاستيعاب تاريخك الناجح لمطابقة "بصمة صوتك" الفريدة بشكل مثالي.',
        },
        {
          id: 4,
          q: "كيف تعمل ميزة مزامنة الاتجاهات؟",
          a: "يرصد محركنا التحولات الفورية في مجالك ويقترح زوايا محتوى تربط خبرتك بما هو ذو صلة حالياً.",
        },
        {
          id: 5,
          q: "ما هي المنصات التي يدعمها Bombon؟",
          a: "ندعم حالياً LinkedIn وX (تويتر) وInstagram، مع إضافة المزيد من المنصات بناءً على ملاحظات المستخدمين.",
        },
      ],
    },
    footer: "المنطقة المثالية للمحتوى.",
  },
};

// ── Logo ──────────────────────────────────────────────────────────────────────
function BombonLogo() {
  return (
    <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_bombon)">
        <path d="M7.97294 43.7651C7.50446 45.0224 7.18834 46.6897 7.91785 48.2654C8.76367 50.0932 10.6342 51.1603 13.4559 51.4133L31.4154 53.0543L50.4217 60.4904C50.6302 60.5744 52.472 61.2685 54.3854 61.0409C55.7983 60.8729 56.9618 60.2338 57.7459 59.2066C58.4762 58.2341 58.8386 56.9704 58.8101 55.4391C58.9779 55.4277 59.1427 55.4202 59.3062 55.4008C62.0128 55.0788 63.2653 53.7801 63.8398 52.7467C64.7422 51.146 64.6334 49.1426 63.5449 46.7843L54.5719 27.4149L51.8644 10.0244C51.3974 7.01221 49.3284 3.94369 45.9068 4.3507C45.26 4.42764 44.5942 4.63631 43.9163 4.96037C42.939 3.68171 41.2737 2.17761 38.928 2.45665C37.2802 2.65266 35.7421 3.72815 34.3833 5.6714L23.3827 21.3296L7.81299 33.9594C7.47474 34.2361 4.50653 36.742 5.00224 39.9079C5.23754 41.4941 6.25711 42.7798 7.97614 43.763L7.97294 43.7651ZM42.3556 11.708L50.2429 28.7275L53.6302 50.5999L32.4408 48.6561L14.565 41.6672L26.6854 24.4222L42.3556 11.708ZM13.8588 46.9493C12.4772 46.8288 12.0203 46.4706 11.9793 46.3874C11.9147 46.2363 11.9727 45.8962 12.0938 45.5071L16.3842 47.1789L13.8588 46.9493ZM53.8507 56.5901C53.1817 56.6696 52.2947 56.4109 52.0492 56.321L47.4578 54.5279L54.3205 55.1548C54.3759 55.9544 54.2596 56.3843 54.1758 56.4927C54.1501 56.5234 54.0244 56.5694 53.8507 56.5901ZM59.4764 48.6615C60.1382 50.0882 59.9385 50.5573 59.931 50.5668C59.8868 50.6308 59.5508 50.8538 58.7745 50.9461C58.5703 50.9704 58.3871 50.9836 58.23 50.9833L57.0567 43.4422L59.4764 48.6615ZM47.4411 10.718L47.7443 12.6863L46.0112 8.92871C46.1475 8.87155 46.2893 8.82864 46.4344 8.80067C46.8055 8.75653 47.3108 9.95667 47.4411 10.718ZM38.052 8.25614C38.9429 6.97969 39.4456 6.90954 39.4558 6.90833C39.5988 6.89132 39.9496 7.1845 40.2945 7.60268L36.1143 10.9933L38.052 8.25614ZM10.6218 37.4423L13.9403 34.7463L10.2903 39.9383C9.62854 39.5855 9.42807 39.2934 9.41895 39.2168C9.36946 38.8877 9.99541 37.9674 10.6218 37.4423Z" fill="url(#paint0_bombon)"/>
      </g>
      <defs>
        <linearGradient id="paint0_bombon" x1="64.9651" y1="59.7824" x2="21.5001" y2="20.9303" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7333FF"/>
          <stop offset="0.4" stopColor="#8478F0"/>
          <stop offset="1" stopColor="#C6E332"/>
        </linearGradient>
        <clipPath id="clip0_bombon">
          <rect width="60" height="60" fill="white" transform="translate(66.6672 59.5799) rotate(173.216)"/>
        </clipPath>
      </defs>
    </svg>
  );
}

// ── Language toggle button ────────────────────────────────────────────────────
function LangToggle({ lang, onToggle }) {
  const c = CONTENT[lang];
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Switch language"
      style={{
        position: "fixed",
        top: "16px",
        right: "16px",
        zIndex: 200,
        background: "#141414",
        border: "1px solid #ffffff20",
        borderRadius: "9999px",
        padding: "7px 14px",
        display: "flex",
        alignItems: "center",
        gap: "7px",
        cursor: "pointer",
        color: "#fff",
        fontSize: "13px",
        fontFamily: c.font,
        fontWeight: 600,
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = PURPLE + "88";
        e.currentTarget.style.boxShadow = `0 0 12px ${PURPLE}44`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "#ffffff20";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.4)";
      }}
    >
      {/* Globe icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      {c.toggleLabel}
    </button>
  );
}

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

function Countdown({ countdown, font }) {
  const [t, setT] = useState(getTimeLeft());
  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const vals = [t.days, t.hours, t.minutes, t.seconds];

  return (
    <div className="flex flex-col items-center gap-2 mt-6">
      <div className="flex items-start gap-4">
        {vals.map((val, i) => (
          <div key={i} className="flex items-start gap-4">
            {i > 0 && (
              <span style={{ color: "#7e7e7e", fontSize: "11px", lineHeight: "21px" }}>:</span>
            )}
            <div className="flex flex-col items-center">
              <span style={{
                color: "#fff", fontSize: "18px", lineHeight: "21px",
                fontFamily: font, fontWeight: 400,
                minWidth: "22px", textAlign: "center",
              }}>
                {pad(val)}
              </span>
              <span style={{
                color: "#7e7e7e", fontSize: "11px", lineHeight: "11px",
                marginTop: "8px", fontFamily: font,
              }}>
                {countdown.labels[i]}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="#7e7e7e" strokeWidth="1.2"/>
          <path d="M4 1v2M8 1v2" stroke="#7e7e7e" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M1 5h10" stroke="#7e7e7e" strokeWidth="1.2"/>
        </svg>
        <span style={{
          color: "#fff", fontSize: "12px", letterSpacing: "0.48px",
          fontFamily: font, fontWeight: 600,
        }}>
          {countdown.until}
        </span>
      </div>
    </div>
  );
}

// ── Social proof ──────────────────────────────────────────────────────────────
function SocialProof({ social, font }) {
  return (
    <div className="flex items-center gap-3 justify-center mt-5">
      <div className="flex">
        {social.initials.map((init, i) => (
          <div key={i} style={{
            width: 30, height: 30, borderRadius: "50%",
            background: PURPLE,
            border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "8px", fontWeight: 700, color: "#fff",
            fontFamily: font,
            marginLeft: i === 0 ? 0 : -9,
            position: "relative", zIndex: 10 - i,
          }}>
            {init}
          </div>
        ))}
      </div>
      <p style={{
        color: "#FFFFFF", fontSize: "15px",
        fontFamily: font, fontWeight: 400,
      }}>
        {social.prefix}{" "}
        <span style={{ fontWeight: 700, color: "#FFFFFF" }}>{social.count}</span>
        {" "}{social.suffix}
      </p>
    </div>
  );
}

// ── Waitlist form ─────────────────────────────────────────────────────────────
function WaitlistForm({ form, dir, font }) {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState("idle");
  const [msg, setMsg]       = useState("");
  const formRef = useRef(null);

  // Reset form if language changes after success/error
  useEffect(() => {
    setStatus("idle");
    setMsg("");
    setEmail("");
  }, [form]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    const fd = new FormData(formRef.current);
    const res = await joinWaitlist(fd);
    if (res.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
      setMsg(form.errorMsg);
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
          boxShadow: "inset 0 1px 0 #ffffff12",
          padding: "18px 20px", textAlign: "center",
        }}>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px", fontFamily: font }}>
            🎉 {form.successNote}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="w-full mt-7">
      <div style={{ position: "relative" }}>
        <div style={{
          position: "relative",
          background: "#141414",
          borderRadius: "12px",
          border: "1px solid #1a1a1a",
          boxShadow: "inset 0 1px 0 #ffffff12, 0 0 0 1px #ffffff08",
          display: "flex",
          flexDirection: dir === "rtl" ? "row-reverse" : "row",
          alignItems: "center",
          overflow: "hidden",
        }}>
          <label htmlFor="email-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>
            {form.placeholder}
          </label>
          <input
            id="email-input"
            name="email"
            type="email"
            required
            placeholder={form.placeholder}
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              padding: "12px 16px",
              color: "#fff", fontSize: "15px",
              fontFamily: font,
              textAlign: dir === "rtl" ? "right" : "left",
              direction: "ltr",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              margin: "6px",
              padding: "8px 18px",
              borderRadius: "9px",
              background: PURPLE,
              border: "none",
              color: "#fff",
              fontFamily: font,
              fontWeight: 700, fontSize: "13px",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              opacity: status === "loading" ? 0.6 : 1,
              whiteSpace: "nowrap",
              transition: "opacity 0.2s",
              flexShrink: 0,
            }}
          >
            {status === "loading" ? form.loading : form.button}
          </button>
        </div>
      </div>

      {status === "error" && (
        <p style={{ color: "#f87171", fontSize: "12px", textAlign: "center", marginTop: "8px", fontFamily: font }}>{msg}</p>
      )}
      <p style={{ color: "#fff", fontSize: "12px", textAlign: "center", marginTop: "8px", fontFamily: font, opacity: 0.5 }}>
        {form.noSpam}
      </p>
    </form>
  );
}

// ── FAQ item ──────────────────────────────────────────────────────────────────
function FAQItem({ q, a, dir, font }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      style={{
        width: "100%",
        textAlign: dir === "rtl" ? "right" : "left",
        cursor: "pointer",
        background: "#141414",
        borderRadius: "12px",
        border: "none",
        boxShadow: "inset 0 1px 0 #ffffff12",
        overflow: "hidden",
        direction: dir,
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px",
      }}>
        <span style={{
          color: "#fff", fontSize: "15px",
          fontFamily: font,
          lineHeight: "24px",
          fontWeight: 600,
          textAlign: dir === "rtl" ? "right" : "left",
        }}>
          {q}
        </span>
        <span style={{
          flexShrink: 0, width: 20, height: 20,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid ${open ? NEON : "rgba(255,255,255,0.15)"}`,
          borderRadius: "50%",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "all 0.25s",
          boxShadow: open ? `0 0 8px ${NEON}44` : "none",
          marginLeft: dir === "rtl" ? "0" : "8px",
          marginRight: dir === "rtl" ? "8px" : "0",
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke={open ? NEON : "#fff"} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </div>
      <div style={{
        maxHeight: open ? "300px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.3s ease-in-out",
      }}>
        <p style={{
          padding: "0 16px 14px",
          color: "#fff", fontSize: "14px", opacity: 0.75,
          lineHeight: "1.8", fontFamily: font,
          textAlign: dir === "rtl" ? "right" : "left",
        }}>
          {a}
        </p>
      </div>
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState("en");
  const c = CONTENT[lang];

  const toggleLang = () => setLang(l => l === "en" ? "ar" : "en");

  return (
    <>
      {/* ── Language toggle (fixed) ── */}
      <LangToggle lang={lang} onToggle={toggleLang} />

      <div
        style={{
          width: "100%", minHeight: "100vh",
          background: "#0d0d0d",
          backgroundImage: `
            radial-gradient(ellipse 90% 70% at 50% 10%, rgba(115,51,255,0.42) 0%, rgba(115,51,255,0.15) 40%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(132,120,240,0.12) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 50% 100%, rgba(115,51,255,0.12) 0%, transparent 70%)
          `,
          display: "flex", flexDirection: "column",
          alignItems: "center",
          padding: "64px 16px 56px",
          direction: c.dir,
          fontFamily: c.font,
          transition: "direction 0.2s",
        }}
      >

        {/* ── Hero ── */}
        <section
          className="animate-fade-up"
          style={{
            width: "100%", maxWidth: "540px",
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
            <span style={{ position: "relative", width: 9, height: 9, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ position: "absolute", width: 9,  height: 9,  borderRadius: "50%", background: NEON, opacity: 0.5, filter: "blur(1px)" }} />
              <span style={{ position: "absolute", width: 5,  height: 5,  borderRadius: "50%", background: NEON }} />
            </span>
            <span style={{
              color: "#fff", fontSize: "13px",
              fontFamily: c.font, fontWeight: 600,
            }}>
              {c.badge}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up delay-100"
            style={{
              fontFamily: c.font,
              fontWeight: 800, fontSize: "52px",
              letterSpacing: "-1px", lineHeight: "68px",
              color: "#fff", marginBottom: "14px",
              direction: c.dir,
            }}
          >
            {c.headlinePre}
            <span style={{ color: NEON }}>Bombon</span>
            {c.headlinePost}
          </h1>

          {/* Subhead */}
          <p
            className="animate-fade-up delay-200"
            style={{
              color: "#FFFFFF", fontSize: "18px",
              lineHeight: "32px",
              fontFamily: c.font, fontWeight: 400,
              marginBottom: "4px",
              direction: c.dir,
            }}
          >
            {c.subhead}
          </p>

          {/* Form */}
          <div className="w-full animate-fade-up delay-200">
            <WaitlistForm form={c.form} dir={c.dir} font={c.font} />
          </div>

          {/* Social proof */}
          <div className="animate-fade-up delay-300">
            <SocialProof social={c.social} font={c.font} />
          </div>

          {/* Countdown */}
          <div className="animate-fade-up delay-400">
            <Countdown countdown={c.countdown} font={c.font} />
          </div>
        </section>

        {/* ── Divider ── */}
        <div style={{
          width: "100%", maxWidth: "540px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          margin: "52px 0",
        }} />

        {/* ── FAQ ── */}
        <section
          className="animate-fade-up delay-300"
          style={{ width: "100%", maxWidth: "540px" }}
        >
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h2 style={{
              fontFamily: c.font, fontWeight: 800,
              fontSize: "28px", letterSpacing: "-0.5px", lineHeight: "42px",
              color: "#fff", marginBottom: "8px",
            }}>
              {c.faq.title}
            </h2>
            <p style={{
              color: "#fff", fontSize: "16px", lineHeight: "26px",
              fontFamily: c.font, opacity: 0.6,
            }}>
              {c.faq.subtitle}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {c.faq.items.map(f => (
              <FAQItem key={f.id} q={f.q} a={f.a} dir={c.dir} font={c.font} />
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{
          marginTop: "52px", color: "#555",
          fontSize: "12px", textAlign: "center",
          fontFamily: c.font,
        }}>
          © {new Date().getFullYear()} Bombon.{" "}
          <span style={{ color: NEON }}>{c.footer}</span>
        </footer>

      </div>
    </>
  );
}
