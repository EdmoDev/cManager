"use client"

import React from 'react'
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { useTheme } from 'next-themes'
import MainLayout from '@/app/components/layout/main-layout'
import { Overview } from '@/app/components/dashboard/overview'
import { RecentActivity } from '@/app/components/dashboard/recent-activity'
import { QuickActions } from '@/app/components/dashboard/quick-actions'
import {
  Users,
  CalendarDays,
  Heart,
  TrendingUp,
  Plus,
  ChevronRight,
  ArrowRight
} from "lucide-react"
import Link from 'next/link'

interface StatsCardProps {
  title: string
  value: string
  icon: React.ElementType
  trend?: {
    value: string
    isPositive: boolean
  }
  description?: string
  color?: string
}

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  description,
  color = "blue" 
}: StatsCardProps) => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-500/10`}>
            <Icon className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`} />
          </div>
          {trend && (
            <div className={cn(
              "flex items-center text-sm font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-bold">{value}</h3>
          <p className="text-sm text-muted-foreground mt-1">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface MinistryCardProps {
  name: string
  leader: string
  members: number
  nextMeeting: string
  description: string
  engagement: number
}

const MinistryCard = ({
  name,
  leader,
  members,
  nextMeeting,
  description,
  engagement
}: MinistryCardProps) => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <Card className="group relative overflow-hidden hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">Led by {leader}</p>
          </div>
          <div className="h-16 w-16 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
            <div 
              className="h-12 w-12 rounded-full bg-blue-500/20 dark:bg-blue-500/30" 
              style={{
                clipPath: `inset(0 ${100 - engagement}% 0 0)`
              }}
            />
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {members} members
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            {nextMeeting}
          </div>
        </div>
        <Link 
          href={`/ministries/${name.toLowerCase().replace(/\s+/g, '-')}`}
          className="absolute inset-0 flex items-center justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const stats = [
    {
      title: "Total Members",
      value: "95",
      icon: Users,
      trend: { value: "12%", isPositive: true },
      description: "Active church members",
      color: "blue"
    },
    {
      title: "Active Ministries",
      value: "6",
      icon: Heart,
      trend: { value: "8%", isPositive: true },
      description: "Growing ministry teams",
      color: "purple"
    },
    {
      title: "Weekly Services",
      value: "12",
      icon: CalendarDays,
      trend: { value: "2", isPositive: true },
      description: "Regular gatherings",
      color: "green"
    },
    {
      title: "Engagement",
      value: "75%",
      icon: TrendingUp,
      trend: { value: "15%", isPositive: true },
      description: "Member participation rate",
      color: "yellow"
    }
  ]

  const ministries = [
    {
      name: "Youth Ministry",
      leader: "John Smith",
      members: 45,
      nextMeeting: "Sunday, 4:00 PM",
      description: "Engaging young people in faith and fellowship",
      engagement: 75
    },
    {
      name: "Worship Team",
      leader: "Sarah Johnson",
      members: 20,
      nextMeeting: "Saturday, 3:00 PM",
      description: "Leading the congregation in worship",
      engagement: 85
    },
    {
      name: "Prayer Warriors",
      leader: "Michael Brown",
      members: 30,
      nextMeeting: "Wednesday, 7:00 PM",
      description: "Interceding for the church and community",
      engagement: 65
    }
  ]

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-sm text-muted-foreground">
              Welcome back! Here&apos;s what&apos;s happening in your church.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/ministries/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Ministry
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatsCard key={i} {...stat} />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Active Ministries</h3>
              <Button variant="outline" asChild>
                <Link href="/ministries">
                  View all
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4">
              {ministries.map((ministry, i) => (
                <MinistryCard key={i} {...ministry} />
              ))}
            </div>
          </div>
          <div className="col-span-3">
            <QuickActions />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}