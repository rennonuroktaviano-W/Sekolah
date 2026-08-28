/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#16a34a",
          light: "#22c55e",
          dark: "#15803d",
        },
        // Palet tema adiwiyata (alam) — hijau natural
        forest: {
          DEFAULT: "#166534",
          light: "#15803d",
          dark: "#14532d",
        },
        leaf: {
          DEFAULT: "#22c55e",
          light: "#4ade80",
          dark: "#16a34a",
        },
        // Warna aksen per role — tetap dibedakan tipis dalam nuansa alam
        role: {
          ortu: "#16a34a", // hijau daun
          siswa: "#65a30d", // lime agung
          guru: "#0d9488", // teal sungai
          bk: "#d97706", // amber/padi
          admin: "#14532d", // hijau hutan pekat
        },
        navy: {
          DEFAULT: "#14532d",
          dark: "#052e16",
        },
      },
      fontFamily: {
        display: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(0 0 0 / 0.03), 0 1px 3px 0 rgb(0 0 0 / 0.04)",
        md2: "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
        lg2: "0 10px 20px -5px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
        glow: "0 0 0 1px rgb(99 102 241 / 0.1), 0 8px 30px rgb(99 102 241 / 0.15)",
      },
      keyframes: {
        "gradient-move": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "gradient-move": "gradient-move 8s ease infinite",
      },
    },
  },
  plugins: [],
};
