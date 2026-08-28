"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { users } from "@/data";
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  MessageSquareHeart,
  CalendarDays,
} from "lucide-react";

export const ortuNav = [
  { href: "/dashboard/ortu", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/dashboard/ortu/nilai", label: "Nilai", icon: BookOpen },
  { href: "/dashboard/ortu/kehadiran", label: "Kehadiran", icon: CalendarCheck },
  { href: "/dashboard/ortu/catatan-bk", label: "Catatan BK", icon: MessageSquareHeart },
  { href: "/dashboard/ortu/jadwal", label: "Jadwal", icon: CalendarDays },
];

export default function OrtuLayout({ children }) {
  return (
    <DashboardShell
      user={{ name: users.ortu.name, subtitle: "Orang Tua" }}
      role="Orang Tua / Siswa"
      accent="violet"
      accentName="Portal Ortu & Siswa"
      navItems={ortuNav}
    >
      {children}
    </DashboardShell>
  );
}
