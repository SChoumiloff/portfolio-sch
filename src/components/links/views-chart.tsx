"use client"

import { View } from "@prisma/client"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { subMonths, subDays, subHours, startOfDay, format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface ViewsChartProps {
  views: View[]
}

type TimeRange = "24h" | "3d" | "7d" | "30d" | "3m" | "1y"

export function ViewsChart({ views }: ViewsChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d")

  const getChartData = () => {
    const now = new Date()
    let data: { date: string; views: number }[] = []

    switch (timeRange) {
      case "24h":
        // Données par heure sur 24h
        data = Array.from({ length: 24 }, (_, i) => {
          const date = subHours(now, 23 - i)
          const hourViews = views.filter(view => {
            const viewDate = new Date(view.date)
            return viewDate >= startOfDay(date) &&
                   viewDate < subHours(date, -1)
          })
          return {
            date: format(date, "yyyy-MM-dd HH:00"),
            views: hourViews.length
          }
        })
        break

      case "3d":
        // Données par 4 heures sur 3 jours
        data = Array.from({ length: 18 }, (_, i) => {
          const date = subHours(now, (17 - i) * 4)
          const hourViews = views.filter(view => {
            const viewDate = new Date(view.date)
            return viewDate >= date && viewDate < subHours(date, -4)
          })
          return {
            date: format(date, "yyyy-MM-dd HH:00"),
            views: hourViews.length
          }
        })
        break

      case "7d":
        // Données journalières sur 7 jours
        data = Array.from({ length: 7 }, (_, i) => {
          const date = subDays(now, 6 - i)
          const dayViews = views.filter(view => 
            format(new Date(view.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          )
          return {
            date: format(date, "yyyy-MM-dd"),
            views: dayViews.length
          }
        })
        break

      case "30d":
        // Données journalières sur 30 jours
        data = Array.from({ length: 30 }, (_, i) => {
          const date = subDays(now, 29 - i)
          const dayViews = views.filter(view => 
            format(new Date(view.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          )
          return {
            date: format(date, "yyyy-MM-dd"),
            views: dayViews.length
          }
        })
        break

      case "3m":
        // Données par 3 jours sur 3 mois
        data = Array.from({ length: 30 }, (_, i) => {
          const date = subDays(now, (29 - i) * 3)
          const periodViews = views.filter(view => {
            const viewDate = new Date(view.date)
            return viewDate >= date && viewDate < subDays(date, -3)
          })
          return {
            date: format(date, "yyyy-MM-dd"),
            views: periodViews.length
          }
        })
        break

      case "1y":
        // Données par semaine sur 1 an
        data = Array.from({ length: 52 }, (_, i) => {
          const date = subDays(now, (51 - i) * 7)
          const weekViews = views.filter(view => {
            const viewDate = new Date(view.date)
            return viewDate >= date && viewDate < subDays(date, -7)
          })
          return {
            date: format(date, "yyyy-MM-dd"),
            views: weekViews.length
          }
        })
        break
    }

    return data
  }

  const formatXAxisTick = (date: string) => {
    const parsedDate = parseISO(date)
    switch (timeRange) {
      case "24h":
        return format(parsedDate, "HH'h'")
      case "3d":
        return format(parsedDate, "dd MMM HH'h'", { locale: fr })
      case "7d":
      case "30d":
        return format(parsedDate, "dd MMM", { locale: fr })
      case "3m":
      case "1y":
        return format(parsedDate, "MMM", { locale: fr })
    }
  }

  const chartData = getChartData()

  return (
    <div className="h-full w-full rounded-lg border p-4">
      <div className="mb-4 flex justify-end">
        <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">24 heures</SelectItem>
            <SelectItem value="3d">3 jours</SelectItem>
            <SelectItem value="7d">7 jours</SelectItem>
            <SelectItem value="30d">30 jours</SelectItem>
            <SelectItem value="3m">3 mois</SelectItem>
            <SelectItem value="1y">1 an</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxisTick}
            tickLine={false}
            axisLine={false}
            interval={timeRange === "24h" ? 3 : "preserveStartEnd"}
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <ChartTooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="text-sm font-medium">
                      {format(parseISO(label), 
                        timeRange === "24h" ? "dd MMMM à HH'h'" : 
                        timeRange === "3d" ? "dd MMMM à HH'h'" : 
                        "dd MMMM yyyy",
                        { locale: fr }
                      )}
                    </div>
                    <div className="text-sm">
                      {payload[0].value} vues
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="views"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorViews)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
} 