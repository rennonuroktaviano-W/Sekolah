import "./globals.css";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { PageTransitionProvider } from "@/components/ui/page-transition";
import { SCHOOL } from "@/data/school";

const siteUrl = "https://smkbaktiidhata.sch.id";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SCHOOL.name} — Portal Akademik Digital`,
    template: `%s · ${SCHOOL.name}`,
  },
  description:
    `${SCHOOL.name} (${SCHOOL.shortName}) — ${SCHOOL.slogan}. ` +
    `Portal akademik digital untuk memantau nilai, kehadiran, dan perkembangan akademik siswa secara real-time. ` +
    `${SCHOOL.jenis} dengan NPSN ${SCHOOL.npsn}, program keahlian RPL, TKJ, dan DKV.`,
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    siteName: SCHOOL.name,
    title: `${SCHOOL.name} — Portal Akademik Digital`,
    description: `${SCHOOL.name} · ${SCHOOL.slogan} — ${SCHOOL.addressShort}.`,
    url: "/",
    locale: "id_ID",
    images: [
      {
        url: "/assets/branding/og-image.png",
        width: 1200,
        height: 630,
        alt: SCHOOL.logoAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SCHOOL.name} — Portal Akademik Digital`,
    description: `${SCHOOL.name} · ${SCHOOL.slogan}`,
    images: ["/assets/branding/og-image.png"],
  },
  keywords: [
    SCHOOL.name,
    SCHOOL.npsn,
    "SMK swasta Jakarta Selatan",
    "Portal akademik sekolah",
    "RPL TKJ DKV",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <MotionConfig reducedMotion="user">
          <ThemeProvider>
            <PageTransitionProvider>
              <ToastProvider>{children}</ToastProvider>
            </PageTransitionProvider>
          </ThemeProvider>
        </MotionConfig>
      </body>
    </html>
  );
}