"use client";

import { ResponsiveContainer, Tooltip, RadialBarChart, RadialBar } from "recharts";

// Radial chart distribusi nilai — dimuat lazy agar recharts tidak ikut
// dalam first-load JS halaman dashboard.
export default function RadialDistChart({
  data,
  colors = ["#2dd4bf", "#14b8a6", "#fbbf24", "#f87171"],
  height = 200,
}) {
  const radialData = data.map((d, i) => ({ ...d, fill: colors[i] }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadialBarChart
        innerRadius="30%"
        outerRadius="100%"
        data={radialData}
        startAngle={90}
        endAngle={-270}
      >
        <RadialBar background dataKey="jumlah" />
        <Tooltip />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}