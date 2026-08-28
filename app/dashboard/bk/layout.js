"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { users } from "@/data";
import {
  LayoutDashboard,
  KanbanSquare,
  FilePlus2,
  CalendarClock,
  FileText,
} from "lucide-react";

export const bkNav = [
  { href: "/dashboard/bk", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/dashboard/bk/kasus", label: "Kasus", icon: KanbanSquare },
  { href: "/dashboard/bk/input-catatan", label: "Input Catatan", icon: FilePlus2 },
  { href: "/dashboard/bk/jadwal-konseling", label: "Jadwal Konseling", icon: CalendarClock },
  { href: "/dashboard/bk/laporan", label: "Laporan", icon: FileText },
];

export default function BkLayout({ children }) {
  return (
    <DashboardShell
      user={{ name: users.bk.name, subtitle: "Guru BP/BK" }}
      role="Guru BP/BK"
      accent="amber"
      accentName="Dashboard BK"
      navItems={bkNav}
    >
      {children}
    </DashboardShell>
  );
}
