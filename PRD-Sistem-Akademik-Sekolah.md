# PRD — Portal Akademik Digital SMK Bakti Idhata
### Product Requirement Document · Fase 1: UI/UX Only

---

## 1. Ringkasan Produk

**Nama Produk (sementara):** Portal Akademik Digital SMK Bakti Idhata
*(boleh diganti sesuai branding sekolah, misal "EduTrack", "Cendekia", dll)*

**Deskripsi Singkat:**
Platform web berbasis Next.js yang menghubungkan tiga pihak utama dalam ekosistem sekolah — **Guru/BK**, **Siswa & Orang Tua**, dan **Admin** — dalam satu sistem terpadu untuk input nilai, pemantauan perkembangan akademik, dan pengelolaan data sekolah.

**Fokus Fase 1:** Membangun **UI/UX lengkap** (tanpa backend/logic asli, gunakan dummy data / mock state) dengan tampilan modern, tidak pasaran, dan kaya animasi/micro-interaction agar terasa premium dan "product-grade", bukan template CRUD biasa.

---

## 2. Tujuan Produk

| Tujuan | Deskripsi |
|---|---|
| Transparansi akademik | Ortu & siswa bisa memantau nilai, kehadiran, dan perkembangan secara real-time |
| Efisiensi guru | Guru bisa input nilai & catatan BK dengan cepat, minim friction |
| Kontrol terpusat | Admin punya kendali penuh atas data user, kelas, mapel, dan konten sistem |
| Diferensiasi visual | UI harus terasa premium — animasi halus, tidak generik seperti template admin dashboard pasaran |

---

## 3. Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Bahasa:** JavaScript / React (JSX)
- **Animasi:** Framer Motion (transisi halaman, hover, reveal on scroll), Lottie (opsional untuk ilustrasi animasi ringan)
- **Icon:** Lucide React / Phosphor Icons
- **Chart (untuk grafik nilai):** Recharts / Chart.js
- **Font:** Kombinasi display font (untuk heading, karakter kuat) + font sans netral (body) — hindari font default sistem
- **State (dummy):** React Context / useState — tanpa integrasi backend nyata di fase ini

---

## 4. Role & Pengguna

| Role | Akses Halaman | Tujuan Utama |
|---|---|---|
| **Siswa** | Landing, Login, Dashboard Siswa | Melihat nilai, jadwal, catatan BK milik sendiri |
| **Orang Tua** | Landing, Login, Dashboard Ortu | Memantau perkembangan anak (bisa multi-anak) |
| **Guru Mapel** | Landing, Login, Dashboard Guru | Input & kelola nilai siswa per mapel/kelas |
| **Guru BP/BK** | Landing, Login, Dashboard BK | Catat pelanggaran, konseling, laporan psikososial siswa |
| **Admin** | Landing, Login, Admin CMS | Kelola seluruh user, kelas, mapel, tahun ajaran, konten |

---

## 5. Prinsip Desain UI/UX

Supaya tidak terasa "template pasaran", pegang prinsip berikut:

1. **Bukan flat admin dashboard generik** — hindari layout sidebar-putih-kotak-kotak khas template gratisan.
2. **Depth & layering** — gunakan glassmorphism tipis, soft shadow bertingkat, subtle gradient mesh di background.
3. **Motion sebagai identitas** — setiap transisi halaman, hover card, dan loading state punya animasi khas (bukan cuma fade biasa).
4. **Personalisasi per role** — palet warna aksen berbeda tipis per role (misal: Guru = biru kehijauan, Ortu/Siswa = ungu hangat, Admin = navy gelap) supaya user langsung sadar sedang di area mana.
5. **Data storytelling** — nilai & progres ditampilkan sebagai visual (grafik tren, progress ring, badge pencapaian), bukan cuma tabel angka.
6. **Dark mode native** — desain dari awal mendukung light/dark, bukan tempelan.
7. **Micro-interaction di semua elemen interaktif** — tombol, input, toggle, checkbox custom dengan feedback animasi.

---

## 6. Struktur Halaman & Fitur Detail

### 6.1 Halaman Landing + Login

**Tujuan:** First impression — meyakinkan sekolah/ortu bahwa ini platform modern & terpercaya.

**Section Landing Page:**
- **Hero Section** — headline besar dengan animasi teks (typewriter/reveal per kata), ilustrasi/mockup dashboard melayang dengan efek parallax saat scroll/mouse-move
- **Stats bar** — angka animasi count-up (jumlah siswa terdaftar, guru aktif, tingkat kepuasan ortu, dll — dummy)
- **Fitur Unggulan** — grid 3-4 kartu fitur dengan icon animasi (hover = icon bergerak/morph), scroll-reveal staggered
- **Alur Cara Kerja** — timeline horizontal/vertical animasi (Guru input → Sistem proses → Ortu/Siswa lihat)
- **Testimoni** — carousel testimoni ortu/guru dengan auto-scroll dan drag interaction
- **CTA Section** — banner ajakan login/daftar dengan gradient animasi bergerak (animated gradient mesh)
- **Footer** — informasi sekolah, sosial media, kontak

**Section Login:**
- Form login **split-screen** (kiri: ilustrasi/branding animasi, kanan: form) atau **modal login** dari landing dengan efek blur-backdrop
- **Role selector** sebelum/saat login — tab animasi (Siswa/Ortu, Guru, BK, Admin) dengan indikator aktif yang slide smooth
- Input field dengan **floating label** dan animasi validasi real-time (border warna berubah halus, ikon check muncul dengan spring animation)
- Toggle show/hide password dengan ikon animasi (mata membuka/menutup)
- Tombol login dengan loading state (spinner/skeleton morph), microinteraction saat klik (ripple/scale)
- Opsi "Lupa Password" dengan transisi ke form reset (slide/fade, bukan reload halaman)
- Ilustrasi kontekstual per role saat role dipilih (misal ilustrasi berubah sesuai tab yang aktif)
- Error state dengan shake animation halus pada form saat kredensial salah (dummy validation)

---

### 6.2 Dashboard Ortu / Siswa

**Tujuan:** Ortu & siswa merasa "dipeluk data" — semua informasi anak tersaji jelas, hangat, dan mudah dibaca.

**Fitur:**

- **Header personalisasi** — sapaan dinamis sesuai waktu ("Selamat pagi, Bu Sari 👋"), foto profil anak dengan status badge (kelas, wali kelas)
- **Switcher anak** (untuk ortu dengan >1 anak) — dropdown/tab dengan foto & transisi konten smooth saat ganti anak
- **Ringkasan Nilai (Overview Card)**
  - Progress ring/radial chart rata-rata nilai per semester dengan animasi fill saat halaman load
  - Perbandingan tren nilai antar semester (line chart animasi draw-on-load)
- **Rincian Nilai per Mapel**
  - Accordion/expandable card per mata pelajaran — klik untuk expand detail nilai (tugas, UH, UTS, UAS) dengan animasi height transition
  - Badge indikator (naik/turun/stabil) dengan warna & ikon panah animasi
- **Kehadiran**
  - Kalender visual kehadiran (hadir/izin/sakit/alpa) dengan color-coded dot, hover tooltip animasi
  - Ringkasan persentase kehadiran dalam bentuk circular progress
- **Catatan BK/BP**
  - Timeline vertikal riwayat catatan konseling/pelanggaran (jika ada), dengan tag kategori (prestasi/pelanggaran/konseling) berwarna beda, expand untuk detail
- **Jadwal Pelajaran**
  - Tampilan jadwal mingguan interaktif (grid hari x jam), highlight jadwal hari ini dengan animasi pulse
- **Notifikasi & Pengumuman**
  - Panel notifikasi slide-in dari kanan, badge counter animasi bounce saat ada notif baru
  - List pengumuman sekolah dengan card stagger-reveal
- **Achievement/Pencapaian**
  - Grid badge prestasi siswa (akademik/non-akademik) dengan efek hover 3D tilt/shine
- **Export Rapor** (UI saja)
  - Tombol download rapor PDF dengan preview modal animasi flip/slide

---

### 6.3 Dashboard Guru & BP/BK

**Tujuan:** Workflow input data secepat dan senyaman mungkin — minim klik, feedback jelas.

**Guru Mapel:**

- **Dashboard Ringkasan**
  - Statistik kelas yang diampu (jumlah siswa, rata-rata nilai kelas, progress input nilai) dalam card animasi count-up
  - Grafik distribusi nilai kelas (bar chart animasi) untuk melihat sebaran cepat
- **Manajemen Kelas & Mapel**
  - List/grid kelas yang diampu, klik kartu kelas dengan efek scale+shadow untuk masuk ke detail
- **Input Nilai**
  - Tabel input nilai per siswa dengan **inline editing** (klik cell → langsung edit, auto-save indicator animasi checkmark)
  - Filter by jenis nilai (Tugas, UH, UTS, UAS) dengan tab-switch animasi
  - Bulk import nilai (UI upload drag-and-drop dengan animasi file masuk)
  - Progress bar "kelengkapan input nilai kelas" di atas tabel
- **Rekap & Analitik**
  - Grafik tren nilai kelas per waktu, dan perbandingan antar kelas yang diampu
  - Highlight otomatis siswa dengan nilai menurun signifikan (card warning dengan animasi subtle glow)
- **Presensi**
  - UI absensi harian dengan toggle cepat (Hadir/Izin/Sakit/Alpa) per siswa — animasi switch/checkbox custom

**Guru BP/BK:**

- **Dashboard BK**
  - Ringkasan kasus aktif, jumlah siswa dalam pemantauan, statistik jenis pelanggaran (pie/donut chart animasi)
- **Input Catatan Konseling/Pelanggaran**
  - Form catatan dengan kategori (akademik, sikap, sosial, prestasi), tingkat keseriusan (badge warna), dan lampiran (UI upload)
  - Timeline riwayat siswa yang sedang diedit, tampil di sisi form (split view) agar guru BK punya konteks penuh
- **Manajemen Kasus**
  - Kanban board status kasus (Baru → Dalam Penanganan → Selesai) dengan drag-and-drop antar kolom, animasi smooth saat card berpindah
- **Jadwal Konseling**
  - Kalender booking sesi konseling dengan siswa/ortu, slot waktu interaktif
- **Laporan**
  - Generate laporan BK per periode (UI export dengan preview animasi)

---

### 6.4 Admin CMS

**Tujuan:** Kontrol penuh sistem — clean, powerful, terasa seperti dashboard enterprise, bukan CRUD polos.

**Fitur:**

- **Dashboard Overview**
  - KPI cards utama (total user, total siswa aktif, total guru, tahun ajaran berjalan) dengan animasi count-up & sparkline mini chart
  - Aktivitas terbaru (log real-time style feed) dengan animasi item baru slide-in dari atas
- **Manajemen User**
  - Tabel data user (Guru, Siswa, Ortu, BK) dengan search instant, filter multi-kriteria, sort animasi
  - Modal tambah/edit user dengan form multi-step (wizard) bertransisi slide antar step
  - Aksi cepat (aktifkan/nonaktifkan/reset password) dengan konfirmasi modal blur-backdrop
- **Manajemen Kelas & Mapel**
  - Drag-and-drop untuk assign wali kelas / guru mapel ke kelas
  - Visualisasi struktur kelas per tingkat (tree/grid interaktif expandable)
- **Manajemen Tahun Ajaran & Semester**
  - Timeline switcher tahun ajaran dengan animasi transisi data
- **Pengaturan Sistem**
  - Kustomisasi branding (logo, warna tema sekolah) dengan live preview realtime saat mengubah warna
  - Pengaturan bobot penilaian (UI slider interaktif dengan animasi angka berubah)
- **Log Aktivitas / Audit Trail**
  - List log dengan infinite scroll, filter per role/aksi, badge warna per jenis aktivitas
- **Manajemen Pengumuman**
  - Rich text editor (UI) untuk broadcast pengumuman ke role tertentu, preview kartu pengumuman real-time di samping editor
- **Backup & Export Data** (UI saja)
  - Tombol export dengan progress bar animasi dan modal sukses dengan ikon checkmark animasi (spring/draw effect)

---

## 7. Design System

| Elemen | Ketentuan |
|---|---|
| **Warna Utama** | 1 warna brand utama + aksen berbeda tipis per role (lihat poin 5.4) |
| **Tipografi** | Font display untuk heading (bold, karakter), font sans netral untuk body/tabel |
| **Radius** | Konsisten (misal `rounded-2xl` untuk card, `rounded-full` untuk badge/avatar) |
| **Shadow** | Soft, berlapis (elevation system: sm/md/lg), bukan shadow tajam default |
| **Spacing** | Grid 8pt system, konsisten di semua halaman |
| **Komponen reusable** | Button (primary/secondary/ghost + loading state), Input, Select, Modal, Toast, Card, Badge, Avatar, Tabs, Accordion, Skeleton loader |
| **Ilustrasi** | Custom/konsisten satu gaya (bukan campur stock icon berbagai style) |

---

## 8. Animasi & Micro-interaction (Wajib Diimplementasi)

- Transisi antar halaman: fade + slight slide/scale (page transition Framer Motion), bukan hard reload
- Scroll-reveal (staggered) untuk semua section di landing page
- Skeleton loading (bukan spinner polos) saat data dummy "dimuat"
- Hover state pada setiap card/button: scale halus + shadow lift
- Toast notification dengan animasi slide-in & auto-dismiss progress bar
- Modal dengan backdrop blur + scale-in animation
- Chart dengan animasi draw-on-view (muncul saat elemen masuk viewport)
- Custom cursor/hover effect di area landing page (opsional, nilai plus)
- Dark/Light mode toggle dengan animasi transisi warna smooth (bukan langsung berubah)

---

## 9. Responsive & Aksesibilitas

- Mobile-first, breakpoint standar Tailwind (`sm`, `md`, `lg`, `xl`)
- Sidebar dashboard collapse jadi bottom-nav atau drawer di mobile dengan animasi slide
- Kontras warna memenuhi standar keterbacaan (khususnya dark mode)
- Semua elemen interaktif accessible via keyboard (focus state jelas dan estetik, bukan default browser)

---

## 10. Scope Fase 1 vs Fase 2

| Fase 1 (UI Only — saat ini) | Fase 2 (Nanti) |
|---|---|
| Seluruh halaman & komponen di atas, dengan dummy/mock data | Integrasi backend (auth asli, database nilai, dsb) |
| State lokal (React state/Context) | API real-time, validasi server-side |
| Animasi & interaksi penuh | Role-based access control sungguhan |
| Tanpa autentikasi nyata (role selector = simulasi) | Notifikasi real-time (push/email) |

---

## 11. Struktur Halaman (Ringkas Sitemap)

```
/                       → Landing Page
/login                  → Login (role selector: Siswa/Ortu, Guru, BK, Admin)

/dashboard/ortu         → Dashboard Ortu/Siswa
  /nilai
  /kehadiran
  /catatan-bk
  /jadwal

/dashboard/guru         → Dashboard Guru Mapel
  /kelas
  /input-nilai
  /rekap
  /presensi

/dashboard/bk           → Dashboard Guru BP/BK
  /kasus
  /input-catatan
  /jadwal-konseling
  /laporan

/admin                  → Admin CMS
  /users
  /kelas-mapel
  /tahun-ajaran
  /pengaturan
  /log-aktivitas
  /pengumuman
```

---

## 12. Deliverable Fase 1

- Seluruh halaman di atas dalam bentuk komponen Next.js + Tailwind, fully responsive
- Dummy data ter-struktur rapi (mock JSON) agar mudah dipetakan ke backend nanti
- Design system/komponen reusable terdokumentasi (bisa jadi cikal bakal component library)
- Animasi berjalan smooth di semua breakpoint
