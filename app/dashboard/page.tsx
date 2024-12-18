"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Progress } from "@/app/components/ui/progress"
import { useTheme } from 'next-themes'
import MainLayout from '@/app/components/layout/main-layout'
import { Overview } from '@/app/components/dashboard/overview'
import { RecentActivity } from '@/app/components/dashboard/recent-activity'
import { QuickActions } from '@/app/components/dashboard/quick-actions'
import {
  ChurchIcon,
  UsersIcon,
  HeartHandshakeIcon,
  TrendingUpIcon,
} from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend?: 'up' | 'down'
  trendValue?: string
  showProgress?: boolean
  isDarkMode: boolean
}

function StatsCard({ title, value, icon, trend, trendValue, showProgress, isDarkMode }: StatsCardProps) {
  return (
    <Card className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
            {icon}
          </div>
          {trend && (
            <div className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </div>
          )}
        </div>
        <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {value}
        </div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {title}
        </p>
        {showProgress && (
          <div className="mt-4">
            <Progress value={72} className="h-1" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <MainLayout>
      <ScrollArea className="flex-1">
        <div className="p-8 space-y-8">
          {/* Welcome Section */}
          <div className="text-3xl font-bold flex justify-between items-center">
            <span>Welcome to <span className="text-blue-600">Grace Church</span></span>
            <div className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} italic`}>
              &ldquo;Serving God, Serving People&rdquo;
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Members"
              value="450"
              icon={<UsersIcon className="w-6 h-6 text-blue-600" />}
              trend="up"
              trendValue="5%"
              isDarkMode={isDarkMode}
            />
            <StatsCard
              title="Weekly Attendance"
              value="380"
              icon={<ChurchIcon className="w-6 h-6 text-green-600" />}
              trend="up"
              trendValue="3%"
              isDarkMode={isDarkMode}
            />
            <StatsCard
              title="Active Ministries"
              value="8"
              icon={<HeartHandshakeIcon className="w-6 h-6 text-purple-600" />}
              trend="up"
              trendValue="1"
              isDarkMode={isDarkMode}
            />
            <StatsCard
              title="Monthly Giving"
              value="$12,450"
              icon={<TrendingUpIcon className="w-6 h-6 text-yellow-600" />}
              showProgress
              trend="up"
              trendValue="10%"
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Overview Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Overview />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <QuickActions />
            </div>
            <div>
              {/* Additional widget can go here */}
            </div>
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  )
} 