"use client";

import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const links = {
  Produk: ["Fitur", "Cara Kerja", "Testimoni", "Harga"],
  Sekolah: ["Tentang", "Kontak", "Karier"],
  Lainnya: ["Privasi", "Syarat", "Bantuan"],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 via-green-500 to-teal-400 text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-display text-lg font-bold">SIAS</span>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Sistem Informasi Akademik Sekolah — platform modern untuk
              ekosistem pendidikan Indonesia.
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> halo@sias.sch.id</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +62 812-3456-7890</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Jakarta, Indonesia</p>
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display font-semibold">{title}</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-400 dark:border-white/10 sm:flex-row">
          <p>© 2026 SIAS. Hak cipta dilindungi.</p>
          <p>Dibuat dengan ❤️ untuk pendidikan</p>
        </div>
      </div>
    </footer>
  );
}
