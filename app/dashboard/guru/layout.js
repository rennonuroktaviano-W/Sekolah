"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { users } from "@/data";
import {
  LayoutDashboard,
  School,
  FilePenLine,
  BarChart3,
  ClipboardCheck,
} from "lucide-react";

export const guruNav = [
  { href: "/dashboard/guru", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/dashboard/guru/kelas", label: "Kelas & Mapel", icon: School },
  { href: "/dashboard/guru/input-nilai", label: "Input Nilai", icon: FilePenLine },
  { href: "/dashboard/guru/rekap", label: "Rekap & Analitik", icon: BarChart3 },
  { href: "/dashboard/guru/presensi", label: "Presensi", icon: ClipboardCheck },
];

export default function GuruLayout({ children }) {
  return (
    <DashboardShell
      user={{ name: users.guru.name, subtitle: `Guru ${users.guru.mapel}` }}
      role="Guru Mapel"
      accent="teal"
      accentName="Dashboard Guru"
      navItems={guruNav}
    >
      {children}
    </DashboardShell>
  );
}
