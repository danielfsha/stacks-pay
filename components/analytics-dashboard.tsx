"use client";

import Image from "next/image";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button, buttonVariants } from "./ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORTED_CURRENCIES } from "@/lib/constants";
import { useState } from "react";

export const description = "A linear area chart";

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 120 },
//   { month: "July", desktop: 124 },
//   { month: "Augest", desktop: 34 },
//   { month: "September", desktop: 92 },
// ];

const chartData = [
  { month: "January", desktop: 0 },
  { month: "February", desktop: 0 },
  { month: "March", desktop: 0 },
  { month: "April", desktop: 0 },
  { month: "May", desktop: 0 },
  { month: "June", desktop: 0 },
  { month: "July", desktop: 0 },
  { month: "Augest", desktop: 0 },
  { month: "September", desktop: 0 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function AnalyticsDashboard() {
  const [activeCurrency, setActiveCurrency] = useState(SUPPORTED_CURRENCIES[0]);
  return (
    <div className="flex flex-col space-y-4">
      {/* header */}
      <header className="flex items-center justify-between py-4">
        <h1>Today</h1>
        <div className="flex items-center justify-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-2">
                <Image
                  width={20}
                  height={20}
                  alt={activeCurrency.symbol}
                  src={activeCurrency.image}
                />
                {activeCurrency.symbol}
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
              <DropdownMenuGroup>
                {SUPPORTED_CURRENCIES.map((currency, index) => (
                  <div
                    onClick={() => setActiveCurrency(currency)}
                    key={`${currency.name}-${currency.symbol}`}
                  >
                    <DropdownMenuItem>
                      <Image
                        width={20}
                        height={20}
                        alt={currency.symbol}
                        src={currency.image}
                      />
                      {currency.symbol}
                    </DropdownMenuItem>
                  </div>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href={"/products"}
            className={cn(
              buttonVariants({
                variant: "default",
              })
            )}
          >
            New product
          </Link>
        </div>
      </header>
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Gross volume</CardDescription>
          <CardTitle>$0.00</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <ChartContainer className="h-[180px] w-full" config={chartConfig}>
            <AreaChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              {/* <YAxis
                orientation="right"
                dataKey={"desktop"}
                tickLine={false}
                axisLine={false}
              /> */}
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="desktop"
                type="linear"
                fill="#FFDDD0"
                fillOpacity={0.4}
                stroke="#FF5512"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="w-full grid gap-2 md:grid-cols-2">
        {/* card 1 */}
        <Card className="w-full">
          <CardHeader>
            <CardDescription>Gross volume</CardDescription>
            <CardTitle>$0.00</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[250px] w-full" config={chartConfig}>
              <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" hideLabel />}
                />
                <Area
                  dataKey="desktop"
                  type="linear"
                  fill="#FFDDD0"
                  fillOpacity={0.4}
                  stroke="#FF5512"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* card 2 */}
        <Card className="w-full">
          <CardHeader>
            <CardDescription>Net volume from sales</CardDescription>
            <CardTitle>$0.00</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[250px] w-full" config={chartConfig}>
              <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" hideLabel />}
                />
                <Area
                  dataKey="desktop"
                  type="linear"
                  fill="#FFDDD0"
                  fillOpacity={0.4}
                  stroke="#FF5512"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* card 3 */}
        <Card className="w-full">
          <CardHeader>
            <CardDescription>New customers</CardDescription>
            <CardTitle>0</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[250px] w-full" config={chartConfig}>
              <AreaChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" hideLabel />}
                />
                <Area
                  dataKey="desktop"
                  type="linear"
                  fill="#FFDDD0"
                  fillOpacity={0.4}
                  stroke="#FF5512"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* card 4 */}
      </div>
    </div>
  );
}
