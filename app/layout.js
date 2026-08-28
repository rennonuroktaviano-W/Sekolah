import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { PageTransitionProvider } from "@/components/ui/page-transition";

export const metadata = {
  title: "SIAS — Sistem Informasi Akademik Sekolah",
  description:
    "Platform modern untuk memantau nilai, kehadiran, dan perkembangan akademik siswa secara real-time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <PageTransitionProvider>
            <ToastProvider>{children}</ToastProvider>
          </PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
