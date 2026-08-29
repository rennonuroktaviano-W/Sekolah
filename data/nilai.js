// Data nilai untuk dashboard ortu/siswa

export const nilaiSemester = {
  current: {
    semester: "Ganjil 2025/2026",
    rataRata: 86.4,
    trend: [
      { name: "Tugas 1", value: 82 },
      { name: "UH 1", value: 85 },
      { name: "Tugas 2", value: 88 },
      { name: "UH 2", value: 90 },
      { name: "UTS", value: 87 },
      { name: "UAS", value: 89 },
    ],
    mapel: [
      {
        id: "mtk",
        name: "Matematika",
        icon: "🔢",
        nilaiAkhir: 87,
        status: "naik",
        statusLabel: "Naik",
        komponen: { tugas: 88, uh: 85, uts: 87, uas: 89 },
        detail: [
          { nama: "Tugas 1", nilai: 90, tanggal: "12 Jan" },
          { nama: "UH 1", nilai: 82, tanggal: "28 Jan" },
          { nama: "Tugas 2", nilai: 86, tanggal: "9 Feb" },
          { nama: "UTS", nilai: 87, tanggal: "2 Mar" },
          { nama: "UAS", nilai: 89, tanggal: "20 Mar" },
        ],
      },
      {
        id: "bindo",
        name: "Bahasa Indonesia",
        icon: "📖",
        nilaiAkhir: 91,
        status: "stabil",
        statusLabel: "Stabil",
        komponen: { tugas: 92, uh: 90, uts: 91, uas: 92 },
        detail: [
          { nama: "Tugas 1", nilai: 95, tanggal: "15 Jan" },
          { nama: "UH 1", nilai: 90, tanggal: "30 Jan" },
          { nama: "UTS", nilai: 91, tanggal: "2 Mar" },
          { nama: "UAS", nilai: 92, tanggal: "20 Mar" },
        ],
      },
      {
        id: "informatika",
        name: "Informatika",
        icon: "💻",
        nilaiAkhir: 80,
        status: "turun",
        statusLabel: "Turun",
        komponen: { tugas: 84, uh: 78, uts: 82, uas: 76 },
        detail: [
          { nama: "Tugas 1", nilai: 88, tanggal: "18 Jan" },
          { nama: "UH 1", nilai: 82, tanggal: "3 Feb" },
          { nama: "UTS", nilai: 82, tanggal: "2 Mar" },
          { nama: "UAS", nilai: 76, tanggal: "20 Mar" },
        ],
      },
      {
        id: "bing",
        name: "Bahasa Inggris",
        icon: "🌍",
        nilaiAkhir: 88,
        status: "naik",
        statusLabel: "Naik",
        komponen: { tugas: 90, uh: 86, uts: 88, uas: 88 },
        detail: [
          { nama: "Tugas 1", nilai: 92, tanggal: "20 Jan" },
          { nama: "UH 1", nilai: 85, tanggal: "5 Feb" },
          { nama: "UTS", nilai: 88, tanggal: "2 Mar" },
          { nama: "UAS", nilai: 88, tanggal: "20 Mar" },
        ],
      },
      {
        id: "ppkn",
        name: "PPKn",
        icon: "🇮🇩",
        nilaiAkhir: 84,
        status: "stabil",
        statusLabel: "Stabil",
        komponen: { tugas: 85, uh: 83, uts: 84, uas: 84 },
        detail: [
          { nama: "Tugas 1", nilai: 86, tanggal: "22 Jan" },
          { nama: "UH 1", nilai: 83, tanggal: "7 Feb" },
          { nama: "UTS", nilai: 84, tanggal: "2 Mar" },
          { nama: "UAS", nilai: 84, tanggal: "20 Mar" },
        ],
      },
    ],
  },
  previous: {
    semester: "Genap 2024/2025",
    rataRata: 82.1,
    trend: [
      { name: "Tugas 1", value: 80 },
      { name: "UH 1", value: 81 },
      { name: "Tugas 2", value: 83 },
      { name: "UH 2", value: 82 },
      { name: "UTS", value: 84 },
      { name: "UAS", value: 85 },
    ],
  },
};

export const perbandinganSemester = [
  { semester: "Ganjil 24/25", nilai: 79 },
  { semester: "Genap 24/25", nilai: 82 },
  { semester: "Ganjil 25/26", nilai: 86 },
];
