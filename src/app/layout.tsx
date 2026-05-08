import type { Metadata } from "next";
import { DM_Sans, Inter, Noto_Nastaliq_Urdu, Playfair_Display } from "next/font/google";
import { AppChrome } from "@/components/app-chrome";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const urdu = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: {
    default: "Hazara Global Consultancy",
    template: "%s | Hazara Global Consultancy",
  },
  description:
    "Public-facing platform for Hazara Global Consultancy in Abbottabad, offering CSS/PMS mentorship, admissions guidance, writing support, events, and academic programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${dmSans.variable} ${urdu.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-ink">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
