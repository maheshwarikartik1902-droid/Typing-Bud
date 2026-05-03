
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"




const chartConfig = {
    wpm: {
        label: "WPM",
        color: "var(--color-primary)",
    },
    errors: {
        label: "Errors",
        color: "#ef4444",
    }
}

export default function Graph({ graphHistory }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={graphHistory}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="second"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="wpm"
                            type="monotone"
                            stroke="var(--color-wpm)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="errors"
                            type="monotone"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={false}
                        />

                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                {/*<div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                        </div>
                    </div>
                </div>*/}
            </CardFooter>
        </Card>
    )
}
