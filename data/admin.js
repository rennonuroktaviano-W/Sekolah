// Data untuk Admin CMS

export const adminKpi = [
  { id: "k1", label: "Total User", value: 1850, icon: "users", tone: "indigo", spark: [40, 45, 42, 48, 52, 58, 60] },
  { id: "k2", label: "Siswa Aktif", value: 1450, icon: "graduation", tone: "teal", spark: [30, 35, 34, 38, 40, 44, 47] },
  { id: "k3", label: "Total Guru", value: 128, icon: "user-check", tone: "amber", spark: [20, 21, 22, 24, 23, 25, 26] },
  { id: "k4", label: "Tahun Ajaran", value: 2025, icon: "calendar", tone: "violet", spark: [10, 11, 10, 12, 12, 13, 14] },
];

export const aktivitasTerbaru = [
  { id: "a1", user: "Pak Dede", aksi: "menginput nilai Matematika X RPL", time: "2 menit lalu", role: "Guru" },
  { id: "a2", user: "Pak Harto", aksi: "menambahkan kasus BK untuk Raka", time: "10 menit lalu", role: "BK" },
  { id: "a3", user: "Admin", aksi: "mengubah pengaturan bobot nilai", time: "25 menit lalu", role: "Admin" },
  { id: "a4", user: "Bu Maya", aksi: "menandai presensi kelas X RPL", time: "1 jam lalu", role: "Guru" },
  { id: "a5", user: "Sistem", aksi: "melakukan backup data harian", time: "3 jam lalu", role: "Sistem" },
  { id: "a6", user: "Admin", aksi: "membuat pengumuman libur semester", time: "5 jam lalu", role: "Admin" },
];

export const daftarUser = [
  { id: "u1", nama: "Raka Ardiansyah", role: "Siswa", nip_nis: "2023001", kelas: "X RPL", status: "aktif" },
  { id: "u2", nama: "Bu Sari", role: "Ortu", nip_nis: "-", anak: "Raka, Dinda", status: "aktif" },
  { id: "u3", nama: "Pak Dede", role: "Guru", nip_nis: "19850012", mapel: "Matematika", status: "aktif" },
  { id: "u4", nama: "Pak Harto", role: "BK", nip_nis: "19820007", status: "aktif" },
  { id: "u5", nama: "Bima Saputra", role: "Siswa", nip_nis: "2023002", kelas: "X TKJ", status: "nonaktif" },
  { id: "u6", nama: "Dewi Lestari", role: "Siswa", nip_nis: "2023004", kelas: "X RPL", status: "aktif" },
  { id: "u7", nama: "Bu Maya", role: "Guru", nip_nis: "19880021", mapel: "Bahasa Indonesia", status: "aktif" },
  { id: "u8", nama: "Citra Ayu", role: "Siswa", nip_nis: "2023003", kelas: "X RPL", status: "aktif" },
];

export const strukturKelas = [
  { tingkat: "Kelas X", kelas: [
    { id: "x-rpl", nama: "X RPL", wali: "Bu Maya" },
    { id: "x-tkj", nama: "X TKJ", wali: "Pak Budi" },
    { id: "x-dkv", nama: "X DKV", wali: "Bu Ratna" },
  ]},
  { tingkat: "Kelas XI", kelas: [
    { id: "xi-rpl", nama: "XI RPL", wali: "Pak Doni" },
    { id: "xi-tkj", nama: "XI TKJ", wali: "Bu Sari" },
    { id: "xi-dkv", nama: "XI DKV", wali: "Bu Fitri" },
  ]},
  { tingkat: "Kelas XII", kelas: [
    { id: "xii-rpl", nama: "XII RPL", wali: "Pak Joko" },
    { id: "xii-tkj", nama: "XII TKJ", wali: "Pak Rio" },
    { id: "xii-dkv", nama: "XII DKV", wali: "Bu Ani" },
  ]},
];

export const tahunAjaran = [
  { id: "ta1", tahun: "2025/2026", semester: "Ganjil", status: "aktif" },
  { id: "ta2", tahun: "2024/2025", semester: "Genap", status: "selesai" },
  { id: "ta3", tahun: "2024/2025", semester: "Ganjil", status: "selesai" },
  { id: "ta4", tahun: "2023/2024", semester: "Genap", status: "selesai" },
];

export const logAktivitas = [
  { id: "l1", user: "Pak Dede", role: "Guru", aksi: "Input nilai UAS X RPL", waktu: "14:32", tanggal: "20 Mar 2026", type: "nilai" },
  { id: "l2", user: "Admin", role: "Admin", aksi: "Reset password user", waktu: "13:45", tanggal: "20 Mar 2026", type: "auth" },
  { id: "l3", user: "Pak Harto", role: "BK", aksi: "Tambah kasus baru", waktu: "11:20", tanggal: "20 Mar 2026", type: "bk" },
  { id: "l4", user: "Sistem", role: "Sistem", aksi: "Backup database", waktu: "02:00", tanggal: "20 Mar 2026", type: "sistem" },
  { id: "l5", user: "Bu Maya", role: "Guru", aksi: "Perbarui presensi", waktu: "09:15", tanggal: "19 Mar 2026", type: "presensi" },
  { id: "l6", user: "Admin", role: "Admin", aksi: "Edit pengumuman", waktu: "16:40", tanggal: "19 Mar 2026", type: "konten" },
  { id: "l7", user: "Bu Sari", role: "Ortu", aksi: "Login ke portal", waktu: "08:05", tanggal: "19 Mar 2026", type: "auth" },
  { id: "l8", user: "Pak Dede", role: "Guru", aksi: "Import nilai bulk", waktu: "10:30", tanggal: "18 Mar 2026", type: "nilai" },
];

export const bobotPenilaian = {
  tugas: 20,
  uh: 30,
  uts: 20,
  uas: 30,
};

export const daftarMapel = [
  { id: "mp1", nama: "Matematika", guru: "Pak Dede", kelas: ["X RPL", "X TKJ", "XI RPL"] },
  { id: "mp2", nama: "Bahasa Indonesia", guru: "Bu Maya", kelas: ["X RPL", "X TKJ"] },
  { id: "mp3", nama: "Informatika", guru: "Bu Ratna", kelas: ["X DKV", "XI DKV"] },
  { id: "mp4", nama: "Bahasa Inggris", guru: "Pak Rio", kelas: ["XI RPL", "XI TKJ"] },
  { id: "mp5", nama: "PPKn", guru: "Bu Ani", kelas: ["XII RPL", "XII TKJ"] },
  { id: "mp6", nama: "Produktif RPL", guru: "Pak Doni", kelas: ["X RPL", "XI RPL", "XII RPL"] },
  { id: "mp7", nama: "Produktif TKJ", guru: "Bu Fitri", kelas: ["X TKJ", "XI TKJ", "XII TKJ"] },
];
