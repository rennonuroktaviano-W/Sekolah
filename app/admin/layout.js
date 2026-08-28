"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { users } from "@/data";
import {
  LayoutDashboard,
  Users,
  School,
  CalendarRange,
  Settings,
  ScrollText,
  Megaphone,
  DatabaseBackup,
} from "lucide-react";

export const adminNav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Manajemen User", icon: Users },
  { href: "/admin/kelas-mapel", label: "Kelas & Mapel", icon: School },
  { href: "/admin/tahun-ajaran", label: "Tahun Ajaran", icon: CalendarRange },
  { href: "/admin/pengaturan", label: "Pengaturan", icon: Settings },
  { href: "/admin/log-aktivitas", label: "Log Aktivitas", icon: ScrollText },
  { href: "/admin/pengumuman", label: "Pengumuman", icon: Megaphone },
  { href: "/admin/backup", label: "Backup & Export", icon: DatabaseBackup },
];

export default function AdminLayout({ children }) {
  return (
    <DashboardShell
      user={{ name: users.admin.name, subtitle: "Administrator" }}
      role="Administrator"
      accent="navy"
      accentName="Admin CMS"
      navItems={adminNav}
    >
      {children}
    </DashboardShell>
  );
}
