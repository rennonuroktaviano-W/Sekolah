// Data untuk dashboard guru mapel

export const guruStatistik = [
  { id: "s1", label: "Siswa Diampu", value: 126, icon: "users", tone: "indigo", change: "+3% bulan ini" },
  { id: "s2", label: "Rata-rata Nilai Kelas", value: 84, icon: "chart", tone: "teal", change: "+1.2 poin" },
  { id: "s3", label: "Progress Input Nilai", value: 72, icon: "progress", tone: "amber", change: "Sisa 28%" },
  { id: "s4", label: "Kelas Diampu", value: 6, icon: "school", tone: "violet", change: "2 per tingkatan" },
];

export const kelasGuru = [
  {
    id: "k1",
    nama: "Kelas 9A",
    mapel: "Matematika",
    siswa: 24,
    rataRata: 84.2,
    progressInput: 80,
  },
  {
    id: "k2",
    nama: "Kelas 9B",
    mapel: "Matematika",
    siswa: 23,
    rataRata: 81.5,
    progressInput: 65,
  },
  {
    id: "k3",
    nama: "Kelas 8A",
    mapel: "Matematika",
    siswa: 25,
    rataRata: 86.1,
    progressInput: 90,
  },
  {
    id: "k4",
    nama: "Kelas 8B",
    mapel: "Matematika",
    siswa: 22,
    rataRata: 79.8,
    progressInput: 55,
  },
  {
    id: "k5",
    nama: "Kelas 7A",
    mapel: "Matematika",
    siswa: 26,
    rataRata: 87.4,
    progressInput: 70,
  },
];

export const daftarNilaiSiswa = [
  {
    id: "m1",
    nama: "Raka Ardiansyah",
    nis: "2023001",
    tugas: 90,
    uh: 85,
    uts: 87,
    uas: 89,
    akhir: 87,
    trend: "naik",
  },
  {
    id: "m2",
    nama: "Bima Saputra",
    nis: "2023002",
    tugas: 78,
    uh: 74,
    uts: 70,
    uas: 72,
    akhir: 74,
    trend: "turun",
  },
  {
    id: "m3",
    nama: "Citra Ayu",
    nis: "2023003",
    tugas: 95,
    uh: 92,
    uts: 90,
    uas: 93,
    akhir: 92,
    trend: "naik",
  },
  {
    id: "m4",
    nama: "Dewi Lestari",
    nis: "2023004",
    tugas: 88,
    uh: 87,
    uts: 85,
    uas: 86,
    akhir: 87,
    trend: "stabil",
  },
  {
    id: "m5",
    nama: "Eko Prasetyo",
    nis: "2023005",
    tugas: 70,
    uh: 68,
    uts: 65,
    uas: 66,
    akhir: 67,
    trend: "turun",
  },
  {
    id: "m6",
    nama: "Fajar Nugroho",
    nis: "2023006",
    tugas: 82,
    uh: 80,
    uts: 83,
    uas: 84,
    akhir: 82,
    trend: "stabil",
  },
  {
    id: "m7",
    nama: "Gita Pramudita",
    nis: "2023007",
    tugas: 91,
    uh: 89,
    uts: 92,
    uas: 94,
    akhir: 91,
    trend: "naik",
  },
  {
    id: "m8",
    nama: "Hendra Wijaya",
    nis: "2023008",
    tugas: 76,
    uh: 79,
    uts: 81,
    uas: 83,
    akhir: 80,
    trend: "naik",
  },
];

export const distribusiNilai = [
  { rentang: "90-100", jumlah: 4 },
  { rentang: "80-89", jumlah: 8 },
  { rentang: "70-79", jumlah: 5 },
  { rentang: "<70", jumlah: 3 },
];

export const trenNilaiKelas = [
  { bulan: "Sep", kelas9A: 80, kelas9B: 78 },
  { bulan: "Okt", kelas9A: 82, kelas9B: 79 },
  { bulan: "Nov", kelas9A: 83, kelas9B: 80 },
  { bulan: "Des", kelas9A: 84, kelas9B: 81 },
  { bulan: "Jan", kelas9A: 85, kelas9B: 82 },
  { bulan: "Feb", kelas9A: 87, kelas9B: 83 },
  { bulan: "Mar", kelas9A: 86, kelas9B: 82 },
];

export const siswaMenurun = [
  {
    id: "drop1",
    nama: "Bima Saputra",
    kelas: "9B",
    penurunan: "🔻 -12 poin dalam 3 bulan",
    nilaiSekarang: 72,
  },
  {
    id: "drop2",
    nama: "Eko Prasetyo",
    kelas: "9B",
    penurunan: "🔻 -8 poin dalam 2 bulan",
    nilaiSekarang: 67,
  },
];

export const daftarPresensi = [
  { id: "m1", nama: "Raka Ardiansyah", status: "h" },
  { id: "m2", nama: "Bima Saputra", status: "h" },
  { id: "m3", nama: "Citra Ayu", status: "s" },
  { id: "m4", nama: "Dewi Lestari", status: "h" },
  { id: "m5", nama: "Eko Prasetyo", status: "i" },
  { id: "m6", nama: "Fajar Nugroho", status: "h" },
  { id: "m7", nama: "Gita Pramudita", status: "a" },
  { id: "m8", nama: "Hendra Wijaya", status: "h" },
];
