"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Line chart tren kasus — dimuat lazy agar recharts tidak ikut dalam
// first-load JS halaman dashboard.
export default function LineTrendChart({ data, color = "#f59e0b", dataKey = "kasus", height = 240 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" />
        <XAxis dataKey="bulan" tick={{ fontSize: 11 }} stroke="currentColor" className="opacity-40" />
        <YAxis tick={{ fontSize: 11 }} stroke="currentColor" className="opacity-40" />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}