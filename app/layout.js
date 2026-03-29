import "./globals.css";

export const metadata = {
  title: "Bombon — The Sweet Spot for Content",
  description:
    "Turn past insights and current trends into high-impact growth. Bombon manages your content strategy intelligently.",
  openGraph: {
    title: "Bombon — The Sweet Spot for Content",
    description:
      "Turn past insights and current trends into high-impact growth. Bombon manages your content strategy intelligently.",
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
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;800&family=Urbanist:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-[#0d0d0d] text-white antialiased"
        style={{ fontFamily: "'Alexandria', 'Urbanist', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
