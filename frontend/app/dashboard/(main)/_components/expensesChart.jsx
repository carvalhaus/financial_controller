"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
};

function ExpensesChart() {
    return (
        <div className="text-center px-4 py-3 border border-softGray rounded-md">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">Atividades</h3>

            <ChartContainer config={chartConfig} className="p-4 bg-white border border-softGray rounded-md w-96">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                        dataKey="desktop"
                        stackId="a"
                        fill="var(--color-desktop)"
                        radius={[0, 0, 4, 4]}
                    />
                    <Bar
                        dataKey="mobile"
                        stackId="a"
                        fill="var(--color-mobile)"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    );
}

export default ExpensesChart;