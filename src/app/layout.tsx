import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solaris Bildungsorganisation | منظمة زولاريس للتعليم والتدريب",
  description:
    "منظمة دولية غير حكومية غير ربحية تتمتع بصفة استشارية ومسجلة في سويسرا. نؤمن بأن الجميع يستحقون التعليم والدعم للوصول إلى كامل إمكاناتهم. An international non-profit NGO registered in Switzerland, dedicated to education and training.",
  keywords: [
    "Solaris",
    "Zolaris",
    "Bildungsorganisation",
    "تعليم",
    "تدريب",
    "منظمة غير ربحية",
    "Education",
    "Training",
    "NGO",
    "Switzerland",
  ],
  authors: [{ name: "Solaris Bildungsorganisation" }],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "Solaris Bildungsorganisation",
    description:
      "Empowering learners through tailored educational programs. تمكين المتعلمين من خلال برامج تعليمية مصممة خصيصاً",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cairo.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
