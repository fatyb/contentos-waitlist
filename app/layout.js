import "./globals.css";

export const metadata = {
  title: "ContentOS — AI-Powered Content Orchestration",
  description:
    "Analyze your unique voice. Repurpose your media. Automate your scheduling. Join the waitlist for the AI OS that content creators have been waiting for.",
  openGraph: {
    title: "ContentOS — AI-Powered Content Orchestration",
    description:
      "Join the exclusive waitlist for ContentOS — the AI OS that content creators have been waiting for.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white antialiased">{children}</body>
    </html>
  );
}
