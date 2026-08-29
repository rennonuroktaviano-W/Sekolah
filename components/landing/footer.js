"use client";

import { Mail, Phone, MapPin, Globe, Instagram, Youtube } from "lucide-react";
import { SCHOOL } from "@/data/school";

const links = {
  Produk: ["Fitur", "#cara-kerja", "Testimoni"],
  Sekolah: ["Tentang", "#tentang", "Website Resmi"],
  Lainnya: ["Privasi", "Syarat", "Bantuan"],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/50 dark:border-white/10 dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 ring-1 ring-slate-200/70 dark:ring-white/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SCHOOL.logo}
                  alt={SCHOOL.logoAlt}
                  className="h-full w-full object-contain"
                  draggable={false}
                />
              </div>
              <div className="min-w-0">
                <span className="block truncate font-display text-lg font-bold">
                  {SCHOOL.name}
                </span>
                <span className="block text-[11px] text-emerald-700 dark:text-emerald-300">
                  {SCHOOL.slogan}
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              SMK swasta berbasis digital — NPSN {SCHOOL.npsn}, terakreditasi {SCHOOL.akreditasi}{" "}
              dengan program keahlian {SCHOOL.programKeahlian.map((p) => p.split(" (")[0]).join(", ")}.
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" /> {SCHOOL.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" /> {SCHOOL.phone}
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {SCHOOL.addressShort}
              </p>
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display font-semibold">{title}</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                {items.map((item) => (
                  <li key={item}>
                    {item.startsWith("#") ? (
                      <a href={item} className="transition-colors hover:text-slate-900 dark:hover:text-white">
                        {title === "Produk" ? "Cara Kerja" : "Tentang"}
                      </a>
                    ) : item === "Website Resmi" ? (
                      <a
                        href={SCHOOL.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white"
                      >
                        <Globe className="h-3.5 w-3.5" /> smkbaktiidhata.sch.id
                      </a>
                    ) : (
                      <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                        {item}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-400 dark:border-white/10 sm:flex-row">
          <p>© 2026 {SCHOOL.name}. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-2">
            <a
              href={SCHOOL.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram SMK Bakti Idhata"
              className="rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={SCHOOL.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube SMK Bakti Idhata"
              className="rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}