// Dummy data untuk semua role — terstruktur agar mudah dipetakan ke backend nanti (PRD pasal 12)

export const users = {
  ortu: {
    id: "ortu-1",
    name: "Bu Sari",
    children: [
      {
        id: "sis-1",
        name: "Raka Ardiansyah",
        class: "X RPL",
        waliKelas: "Ibu Maya Sari",
        nis: "2023001",
      },
      {
        id: "sis-2",
        name: "Dinda Putri",
        class: "XI TKJ",
        waliKelas: "Pak Budi",
        nis: "2024012",
      },
    ],
  },
  guru: {
    id: "guru-1",
    name: "Pak Dede",
    mapel: "Matematika",
    nip: "19850012",
  },
  bk: {
    id: "bk-1",
    name: "Pak Harto",
    nip: "19820007",
  },
  admin: {
    id: "admin-1",
    name: "Administrator",
  },
};


