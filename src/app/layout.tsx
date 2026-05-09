import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CoffeeSkill — Platform Pembelajaran Teknologi Modern",
  description:
    "Platform pembelajaran teknologi modern dari Lampung Barat. Belajar web development, data science, UI/UX design, dan skill digital lainnya bersama mentor berpengalaman.",
  keywords: [
    "e-learning",
    "kursus online",
    "belajar coding",
    "web development",
    "data science",
    "Lampung Barat",
    "CoffeeSkill",
  ],
  authors: [{ name: "Ghifari Azhar" }],
  openGraph: {
    title: "CoffeeSkill — Platform Pembelajaran Teknologi Modern",
    description:
      "Belajar teknologi dari mana saja. Kursus berkualitas, mentor berpengalaman, sertifikat diakui industri.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-charcoal text-white`}>
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
