import "./globals.css";

export const metadata = {
  title: "BOMBON — The Sweet Spot for Content",
  description:
    "The content orchestration OS that creator-founders have been begging for. Stop managing chaos. Start dominating your niche.",
  openGraph: {
    title: "BOMBON — The Sweet Spot for Content",
    description:
      "Analyze your voice, repurpose everything, and schedule with precision. Join the exclusive waitlist.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-[#0d0d0d] text-white antialiased"
        style={{ fontFamily: "'Urbanist', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
