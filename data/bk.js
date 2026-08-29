// Data untuk dashboard BK

export const bkRingkasan = {
  kasusAktif: 14,
  siswaPemantauan: 27,
  totalKasus: 86,
  selesaiBulanIni: 9,
};

export const statistikPelanggaran = [
  { name: "Keterlambatan", value: 35, color: "#22c55e" },
  { name: "Sikap", value: 20, color: "#34d399" },
  { name: "Sosial", value: 14, color: "#fbbf24" },
  { name: "Akademik", value: 12, color: "#f472b6" },
  { name: "Lainnya", value: 5, color: "#94a3b8" },
];

export const kanbanKasus = [
  {
    id: "col-baru",
    title: "Baru",
    tone: "indigo",
    cards: [
      { id: "c1", siswa: "Raka Ardiansyah", kelas: "X RPL", kategori: "Sikap", keseriusan: "rendah", tanggal: "20 Mar" },
      { id: "c2", siswa: "Dewi Lestari", kelas: "X RPL", kategori: "Sosial", keseriusan: "tinggi", tanggal: "19 Mar" },
      { id: "c3", siswa: "Bima Saputra", kelas: "X TKJ", kategori: "Akademik", keseriusan: "sedang", tanggal: "18 Mar" },
    ],
  },
  {
    id: "col-proses",
    title: "Dalam Penanganan",
    tone: "amber",
    cards: [
      { id: "c4", siswa: "Eko Prasetyo", kelas: "X TKJ", kategori: "Keterlambatan", keseriusan: "sedang", tanggal: "16 Mar" },
      { id: "c5", siswa: "Citra Ayu", kelas: "X RPL", kategori: "Sikap", keseriusan: "rendah", tanggal: "15 Mar" },
    ],
  },
  {
    id: "col-selesai",
    title: "Selesai",
    tone: "green",
    cards: [
      { id: "c6", siswa: "Hendra Wijaya", kelas: "XI RPL", kategori: "Konseling", keseriusan: "rendah", tanggal: "12 Mar" },
      { id: "c7", siswa: "Gita Pramudita", kelas: "XI RPL", kategori: "Konseling", keseriusan: "rendah", tanggal: "10 Mar" },
      { id: "c8", siswa: "Fajar Nugroho", kelas: "XI TKJ", kategori: "Sosial", keseriusan: "sedang", tanggal: "8 Mar" },
    ],
  },
];

export const riwayatSiswaEdit = [
  {
    id: "r1",
    tanggal: "12 Mar 2026",
    tipe: "prestasi",
    title: "Juara 2 Olimpiade",
    detail: "Pencapaian membanggakan dalam olimpiade matematika.",
    tone: "green",
  },
  {
    id: "r2",
    tanggal: "25 Feb 2026",
    tipe: "konseling",
    title: "Konseling akademik",
    detail: "Sesi konseling perbaikan fokus belajar Informatika.",
    tone: "indigo",
  },
  {
    id: "r3",
    tanggal: "3 Feb 2026",
    tipe: "pelanggaran",
    title: "Terlambat 3x",
    detail: "Pembinaan keterlambatan masuk sekolah.",
    tone: "rose",
  },
];

export const jadwalKonseling = [
  {
    id: "jk1",
    tanggal: "Senin, 23 Maret 2026",
    siswa: "Raka Ardiansyah",
    ortu: "Bu Sari",
    waktu: "13:00-14:00",
    status: "terjadwal",
  },
  {
    id: "jk2",
    tanggal: "Rabu, 25 Maret 2026",
    siswa: "Dewi Lestari",
    ortu: "Pak Adi",
    waktu: "14:30-15:30",
    status: "terjadwal",
  },
  {
    id: "jk3",
    tanggal: "Kamis, 26 Maret 2026",
    siswa: "Bima Saputra",
    ortu: "Bu Wilis",
    waktu: "13:00-14:00",
    status: "menunggu",
  },
  {
    id: "jk4",
    tanggal: "Jumat, 20 Maret 2026",
    siswa: "Hendra Wijaya",
    ortu: "Pak Wawan",
    waktu: "10:00-11:00",
    status: "selesai",
  },
];

export const kasusTren = [
  { bulan: "Okt", kasus: 10 },
  { bulan: "Nov", kasus: 14 },
  { bulan: "Des", kasus: 11 },
  { bulan: "Jan", kasus: 16 },
  { bulan: "Feb", kasus: 13 },
  { bulan: "Mar", kasus: 14 },
];
