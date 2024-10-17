"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  totalSpent: {
    label: "Total Gasto",
    color: "hsl(var(--chart-1))",
  },
  amount: {
    label: "Limite",
    color: "hsl(var(--chart-2))",
  },
};

function ExpensesChart({ allCategories }) {
  return (
    <div className="text-center px-4 py-3 border border-softGray rounded-md w-full flex flex-col items-center">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
        Atividades
      </h3>

      <ChartContainer
        config={chartConfig}
        className="p-4 bg-white border border-softGray rounded-md h-36 lg:h-64 xl:h-80 transition ease-in-out"
      >
        <BarChart accessibilityLayer data={allCategories}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="totalSpent"
            stackId="a"
            fill="#0381FF"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="amount"
            stackId="a"
            fill="#C1DFFE"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default ExpensesChart;
