// Data kehadiran, jadwal, catatan BK, achievement, notifikasi & pengumuman

export const kehadiran = {
  persentase: 96,
  ringkasan: { hadir: 142, izin: 3, sakit: 2, alpa: 1 },
  bulan: "Maret 2026",
  kalender: [
    { date: 1, status: "hadir" },
    { date: 2, status: "hadir" },
    { date: 3, status: "hadir" },
    { date: 4, status: "hadir" },
    { date: 5, status: "hadir" },
    { date: 6, status: "izin" },
    { date: 7, status: "hadir" },
    { date: 8, status: "hadir" },
    { date: 9, status: "hadir" },
    { date: 10, status: "sakit" },
    { date: 11, status: "hadir" },
    { date: 12, status: "hadir" },
    { date: 13, status: "hadir" },
    { date: 14, status: "hadir" },
    { date: 15, status: "hadir" },
    { date: 16, status: "hadir" },
    { date: 17, status: "hadir" },
    { date: 18, status: "hadir" },
    { date: 19, status: "alpa" },
    { date: 20, status: "hadir" },
    { date: 21, status: "hadir" },
    { date: 22, status: "hadir" },
    { date: 23, status: "hadir" },
  ],
};

export const jadwalPelajaran = {
  hariIni: "Senin",
  hari: [
    {
      day: "Senin",
      kelas: [
        { time: "07:00-08:30", mapel: "Matematika", guru: "Pak Dede", ruang: "R1" },
        { time: "08:30-10:00", mapel: "Bahasa Indonesia", guru: "Ibu Maya", ruang: "R2" },
        { time: "10:15-11:45", mapel: "IPA", guru: "Bu Ratna", ruang: "Lab 1" },
      ],
    },
    {
      day: "Selasa",
      kelas: [
        { time: "07:00-08:30", mapel: "Bahasa Inggris", guru: "Pak Rio", ruang: "R3" },
        { time: "08:30-10:00", mapel: "PPKN", guru: "Bu Ani", ruang: "R1" },
        { time: "10:15-11:45", mapel: "Olahraga", guru: "Pak Joko", ruang: "Lap" },
      ],
    },
    {
      day: "Rabu",
      kelas: [
        { time: "07:00-08:30", mapel: "IPS", guru: "Bu Fitri", ruang: "R2" },
        { time: "08:30-10:00", mapel: "Seni Budaya", guru: "Pak Doni", ruang: "R4" },
        { time: "10:15-11:45", mapel: "Matematika", guru: "Pak Dede", ruang: "R1" },
      ],
    },
    {
      day: "Kamis",
      kelas: [
        { time: "07:00-08:30", mapel: "Informatika", guru: "Bu Sari", ruang: "Lab 2" },
        { time: "08:30-10:00", mapel: "Bahasa Indonesia", guru: "Ibu Maya", ruang: "R2" },
        { time: "10:15-11:45", mapel: "Agama", guru: "Pak Umar", ruang: "R5" },
      ],
    },
    {
      day: "Jumat",
      kelas: [
        { time: "07:00-08:00", mapel: "Pramuka", guru: "Pak Joko", ruang: "Lap" },
        { time: "08:00-09:00", mapel: "BK", guru: "Pak Harto", ruang: "BK" },
      ],
    },
  ],
};

export const catatanBK = [
  {
    id: "bk-1",
    tanggal: "12 Maret 2026",
    kategori: "prestasi",
    kategoriLabel: "Prestasi",
    title: "Juara 2 Olimpiade Matematika",
    deskripsi:
      "Raka meraih juara 2 dalam olimpiade matematika tingkat kota. Catatan positif dan sangat membanggakan.",
    tone: "green",
  },
  {
    id: "bk-2",
    tanggal: "25 Februari 2026",
    kategori: "konseling",
    kategoriLabel: "Konseling",
    title: "Sesi Konseling Akademik",
    deskripsi:
      "Konseling intensif membantu Raka meningkatkan fokus belajar pada mata pelajaran IPA. Perkembangan menunjukkan peningkatan.",
    tone: "indigo",
  },
  {
    id: "bk-3",
    tanggal: "3 Februari 2026",
    kategori: "pelanggaran",
    kategoriLabel: "Pelanggaran",
    title: "Terlambat Masuk 3 Kali",
    deskripsi:
      "Tercatat terlambat masuk sekolah sebanyak 3 kali dalam satu bulan. Sudah diberikan pembinaan oleh BK.",
    tone: "rose",
  },
];

export const achievements = [
  { id: "a1", title: "Juara 2 Olimpiade Mat", category: "Akademik", icon: "🏆", tone: "amber" },
  { id: "a2", title: "Nilai Sempurna UH Mat", category: "Akademik", icon: "🎯", tone: "indigo" },
  { id: "a3", title: "Kehadiran 100%", category: "Non-akademik", icon: "📅", tone: "teal" },
  { id: "a4", title: "Anggota OSIS", category: "Non-akademik", icon: "🎖️", tone: "violet" },
  { id: "a5", title: "Juara Futsal Sekolah", category: "Non-akademik", icon: "⚽", tone: "green" },
  { id: "a6", title: "Paskibra", category: "Non-akademik", icon: "🚩", tone: "rose" },
];

export const notifikasi = [
  {
    id: "n1",
    type: "nilai",
    title: "Nilai UAS IPA telah diinput",
    desc: "Nilai UAS IPA Raka sudah tersedia. Lihat perubahan.",
    time: "5 menit lalu",
    unread: true,
  },
  {
    id: "n2",
    type: "pengumuman",
    title: "Libur Semester",
    desc: "Libur akhir semester dimulai 22 Maret 2026.",
    time: "2 jam lalu",
    unread: true,
  },
  {
    id: "n3",
    type: "bk",
    title: "Catatan BK baru",
    desc: "Catatan prestasi dari guru BK telah ditambahkan.",
    time: "Kemarin",
    unread: false,
  },
  {
    id: "n4",
    type: "system",
    title: "Rapor dapat diunduh",
    desc: "Rapor semester tersedia untuk diunduh.",
    time: "3 hari lalu",
    unread: false,
  },
];

export const pengumuman = [
  {
    id: "p1",
    title: "Jadwal Ujian Semester Genap",
    date: "15 Maret 2026",
    kategori: "Akademik",
    ringkasan:
      "Ujian semester genap akan dilaksanakan pada 20-25 Maret. Mohon siswa mempersiapkan diri dengan baik.",
  },
  {
    id: "p2",
    title: "Pembagian Rapor",
    date: "28 Maret 2026",
    kategori: "Umum",
    ringkasan: "Pembagian rapor akan dilakukan secara online melalui platform SIAS.",
  },
  {
    id: "p3",
    title: "Lomba Peringatan Hari Pendidikan",
    date: "2 April 2026",
    kategori: "Kegiatan",
    ringkasan: "Akan diadakan berbagai lomba untuk merayakan Hari Pendidikan Nasional.",
  },
];
