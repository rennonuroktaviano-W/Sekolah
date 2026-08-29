"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Bar chart perbandingan semester — dimuat lazy agar recharts tidak ikut
// dalam first-load JS halaman dashboard.
export default function BarCompareChart({ data, color = "#10b981", height = 220 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" />
        <XAxis dataKey="semester" tick={{ fontSize: 11 }} stroke="currentColor" className="opacity-40" />
        <YAxis tick={{ fontSize: 11 }} stroke="currentColor" className="opacity-40" domain={[0, 100]} />
        <Tooltip
          contentStyle={{
            background: "rgba(255,255,255,0.95)",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            fontSize: 12,
          }}
        />
        <Bar dataKey="nilai" fill={color} radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}