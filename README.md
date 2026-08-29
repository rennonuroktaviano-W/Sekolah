<div align="center">

<img src="https://img.shields.io/badge/status-LIVE%20%E2%9C%94-22c55e?style=for-the-badge&labelColor=0a0f0a" alt="status"/>
<img src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&labelColor=0a0f0a&logo=vercel&logoColor=white" alt="build"/>
<img src="https://img.shields.io/badge/next.js-14-black?style=for-the-badge&logo=nextdotjs&logoColor=white&labelColor=0a0f0a" alt="next"/>
<img src="https://img.shields.io/badge/tailwind-css-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=0a0f0a" alt="tailwind"/>

<br/>

```
  ███████╗██╗ █████╗ ███████╗
  ██╔════╝██║██╔══██╗██╔════╝
  ███████╗██║███████║███████╗
  ╚════██║██║██╔══██║╚════██║
  ███████║██║██║  ██║███████║
  ╚══════╝╚═╝╚═╝  ╚═╝╚══════╝
```

### `SISTEM INFORMASI AKADEMIK SEKOLAH`

**v0.1.0 · FASE 1 — UI/UX ONLY · NEXT.JS 14 + TAILWIND + MOTION**

> `[ OK ]` Memuat modul akademik... `done`
> `[ OK ]` Inisialisasi antarmuka... `done`
> `[ ! ]` Backend belum terpasang — semua data adalah **dummy/mock**

---

</div>

## ⚡ TL;DR

SMK Bakti Idhata adalah website portal akademik digital — **"command center" web** untuk ekosistem sekolah — menghubungkan **Guru/BK, Siswa & Orang Tua, dan Admin** dalam satu sistem terpadu untuk input nilai, pemantauan akademik, dan pengelolaan data sekolah.

Bukan dashboard template pasaran. Ini **product-grade UI** penuh animasi, glassmorphism, dark-mode native, dan micro-interaction di setiap sudut — dibangun dengan **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, dan **Recharts**.

---

## 🎯 Spesifikasi Misi

| Emblem | Tujuan |
|--------|--------|
| 🔓 Transparansi akademik | Ortu & siswa pantau nilai, kehadiran, dan perkembangan secara real-time |
| ⚡ Efisiensi guru | Input nilai & catatan BK cepat, minim friction |
| 🛡️ Kontrol terpusat | Admin kendali penuh atas user, kelas, mapel, dan konten |
| 🌌 Diferensiasi visual | UI premium — bukan CRUD generik |

---

## 🧰 Techstack & Arsenal

```text
╭─────────────────────────────────────────────────────╮
│  FRAMEWORK   ▸ Next.js 14 (App Router)             │
│  STYLING     ▸ Tailwind CSS                        │
│  BAHASA      ▸ JavaScript / React (JSX)            │
│  ANIMASI     ▸ Framer Motion                       │
│  CHART       ▸ Recharts                            │
│  ICON        ▸ Lucide React                        │
│  STATE       ▸ React Context / useState (dummy)    │
│  FONT        ▸ Font display + sans (system)        │
╰─────────────────────────────────────────────────────╯
```

---

## 🗺️ Peta Wilayah (Sitemap)

```
/                       ▸ Landing Page (hero, stats, fitur, testimonials, CTA)
/login                  ▸ Login + role selector (Siswa/Guru/BK/Admin)

/dashboard/ortu         ▸ Dashboard Siswa & Orang Tua
    ├─ /nilai           ▸ Ringkasan & rincian nilai per mapel
    ├─ /kehadiran       ▸ Kalender kehadiran + progress ring
    ├─ /catatan-bk      ▸ Timeline catatan konseling
    └─ /jadwal          ▸ Jadwal pelajaran mingguan

/dashboard/guru         ▸ Dashboard Guru Mapel
    ├─ /kelas           ▸ Manajemen kelas yang diampu
    ├─ /input-nilai     ▸ Inline editing + auto-save + drag-drop import
    ├─ /rekap           ▸ Analitik & tren nilai
    └─ /presensi        ▸ Absensi harian toggle cepat

/dashboard/bk           ▸ Dashboard Guru BP/BK
    ├─ /kasus           ▸ Kanban board kasus (drag & drop)
    ├─ /input-catatan   ▸ Form catatan + timeline split-view
    ├─ /jadwal-konseling▸ Booking sesi konseling
    └─ /laporan         ▸ Generate laporan export

/admin                  ▸ Admin CMS
    ├─ /users           ▸ CRUD user + wizard + konfirmasi
    ├─ /kelas-mapel     ▸ Struktur kelas & assign guru
    ├─ /tahun-ajaran    ▸ Timeline switcher tahun ajaran
    ├─ /pengaturan      ▸ Branding + bobot penilaian slider
    ├─ /log-aktivitas   ▸ Audit trail + infinite scroll
    ├─ /pengumuman      ▸ Rich text editor + live preview
    └─ /backup          ▸ Export dengan progress bar + sukses modal
```

---

## 🚀 Cara Menjalankan

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan dev server
npm run dev

# 3. Build produksi
npm run build

# 4. Lint
npm run lint
```

Buka **`http://localhost:3000`** dan mulai eksplorasi.

> 💡 **Akses halaman**: semua data dummy — pilih role apa saja dari `/login` untuk masuk ke dashboard masing-masing (contoh: Siswa → `/dashboard/ortu`, Admin → `/admin`).

---

## 🎨 Identitas Desain

```
┌─────────────────────────────────────────────┐
│  ROLE      ▸ Siswa/Ortu  = violet/warm      │
│            ▸ Guru        = teal             │
│            ▸ BK          = amber            │
│            ▸ Admin       = navy/dark green  │
│                                             │
│  BRAND     ▸ Hijau natural (forest/leaf)    │
│  THEME     ▸ Dark mode native (bukan tempel)│
│  SURFACE   ▸ Glassmorphism + soft shadow    │
│  MOTION    ▸ Page transition + scroll reveal│
│             count-up + progress ring        │
│             skeleton loading + toasts       │
└─────────────────────────────────────────────┘
```

**Fitur utama yang wajib dicoba:**
- 🧊 **Glassmorphism** navbar & form login
- 🎬 **Page transition** hijau menyapu antar halaman
- 🎯 **Inline editing** nilai guru dengan auto-save checkmark
- 🧩 **Kanban drag & drop** kasus BK
- 📊 **Chart animasi** Recharts (bar, line, pie, radial, composed)
- 🌗 **Dark/Light toggle** dengan animasi flip
- ⚠️ Threshold **`prefers-reduced-motion`** didukung

---

## 🧩 Arsitektur Folder

```
.
├── app/                # Halaman & route (App Router)
│   ├── admin/          # CMS admin
│   ├── dashboard/      # Dashboard ortu/guru/bk
│   ├── login/          # Halaman login
│   ├── layout.js       # Root layout + providers
│   └── globals.css     # Tailwind + utility custom
├── components/         # Komponen reusable
│   ├── landing/        # Bagian landing page
│   ├── login/          # Halaman login
│   └── ui/             # Design system primitives
├── data/               # Dummy/mock data terstruktur
├── lib/                # Utilitas (cn())
└── tailwind.config.js  # Tema, warna, shadow, keyframes
```

---

## 🗒️ Catatan Misi / Roadmap

**FASE 1 (sekarang) — UI/UX only:**
- [x] Seluruh halaman & komponen dengan mock data
- [x] State lokal (React Context/useState)
- [x] Animasi & micro-interaction penuh
- [x] Dark/light mode
- [x] Responsive (mobile → desktop)

**FASE 2 (nantinya):**
- [ ] Integrasi backend & auth asli
- [ ] Database nilai & role-based access control sungguhan
- [ ] Notifikasi real-time (push/email)
- [ ] API & validasi server-side

---

## 📄 Lisensi

Proyek ini adalah proyek pendidikan. Dibuat dengan ❤️ untuk ekosistem pendidikan Indonesia.

---

<div align="center">

```
▓▒░ ░▒▓  SMK Bakti Idhata ▓▒░ ░▒▓
```

**"Semua kebutuhan akademik, dalam satu command center."**

</div>
