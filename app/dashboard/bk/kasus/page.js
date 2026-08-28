"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { kanbanKasus } from "@/data";
import { cn } from "@/lib/utils";

const columnTone = {
  indigo: { bar: "bg-green-500", dot: "bg-green-500" },
  amber: { bar: "bg-amber-500", dot: "bg-amber-500" },
  green: { bar: "bg-emerald-500", dot: "bg-emerald-500" },
};

const keseriusanTone = {
  rendah: "bg-slate-500/10 text-slate-600 ring-slate-500/30",
  sedang: "bg-amber-500/10 text-amber-600 ring-amber-500/30",
  tinggi: "bg-rose-500/10 text-rose-600 ring-rose-500/30",
};

export default function KasusPage() {
  const [columns, setColumns] = useState(kanbanKasus);
  const [dragId, setDragId] = useState(null);

  const moveCard = (cardId, targetColId) => {
    let card = null;
    const sourceColId = columns.find((c) => {
      card = c.cards.find((x) => x.id === cardId);
      return !!card;
    })?.id;

    if (!card || sourceColId === targetColId) return;

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === sourceColId) {
          return { ...col, cards: col.cards.filter((x) => x.id !== cardId) };
        }
        if (col.id === targetColId) {
          return { ...col, cards: [...col.cards, card] };
        }
        return col;
      })
    );
    setDragId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Manajemen Kasus</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Tarik & lepas kartu untuk mengubah status kasus</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((col) => {
          const tone = columnTone[col.tone];
          return (
            <div
              key={col.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dragId && moveCard(dragId, col.id)}
              className="rounded-3xl bg-slate-100/60 p-4 dark:bg-white/[0.03]"
            >
              <div className="mb-3 flex items-center gap-2 px-1">
                <span className={cn("h-2 w-2 rounded-full", tone.dot)} />
                <h3 className="font-display font-semibold">{col.title}</h3>
                <span className="ml-auto flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold dark:bg-white/10">
                  {col.cards.length}
                </span>
              </div>

              <div className="min-h-[120px] space-y-2.5">
                {col.cards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    layout
                    draggable
                    onDragStart={() => setDragId(card.id)}
                    onDragEnd={() => setDragId(null)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, scale: dragId === card.id ? 1.03 : 1 }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                    whileHover={{ y: -2 }}
                    className={cn(
                      "cursor-grab rounded-2xl bg-white p-4 shadow-soft transition-shadow hover:shadow-md dark:bg-white/[0.06]",
                      dragId === card.id && "opacity-70 ring-2 ring-amber-400"
                    )}
                  >
                    <div className={cn("mb-3 h-1 w-10 rounded-full", tone.bar)} />
                    <p className="font-semibold">{card.siswa}</p>
                    <p className="text-xs text-slate-400">{card.kelas} · {card.kategori}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset", keseriusanTone[card.keseriusan])}>
                        {card.keseriusan}
                      </span>
                      <span className="text-[10px] text-slate-400">{card.tanggal}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-sm text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/5">
                <Plus className="h-4 w-4" /> Tambah
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
