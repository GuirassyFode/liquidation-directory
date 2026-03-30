import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | LiquidationLots.com",
    default: "LiquidationLots.com - Find Liquidation Lots Near You",
  },
  description:
    "The #1 directory for liquidation lots. Browse liquidation stores, find deals on pallets, and discover the best liquidation merchandise near you.",
  openGraph: {
    title: "LiquidationLots.com - Find Liquidation Lots Near You",
    description:
      "The #1 directory for liquidation lots. Browse liquidation stores, find deals on pallets, and discover the best liquidation merchandise near you.",
    type: "website",
    siteName: "LiquidationLots.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="min-h-screen bg-dark text-text-body font-montserrat flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
