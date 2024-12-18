"use client"

import { cn } from "@/lib/utils"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { useTheme } from 'next-themes'
import { 
  Users,
  Building2,
  ShieldCheck,
  Activity,
  Settings,
  Plus,
  ArrowRight
} from "lucide-react"
import Link from 'next/link'

const quickStats = [
  {
    label: 'Total Users',
    value: '2,543',
    change: '+12%',
    icon: Users,
  },
  {
    label: 'Organizations',
    value: '15',
    change: '+2',
    icon: Building2,
  },
  {
    label: 'Active Roles',
    value: '8',
    change: 'Stable',
    icon: ShieldCheck,
  },
  {
    label: 'System Health',
    value: '98%',
    change: 'Optimal',
    icon: Activity,
  },
]

const quickActions = [
  {
    label: 'Add Organization',
    description: 'Create a new church organization',
    icon: Building2,
    href: '/admin/organizations/new',
  },
  {
    label: 'Create User',
    description: 'Add a new system user',
    icon: Users,
    href: '/admin/users/new',
  },
  {
    label: 'Manage Roles',
    description: 'Configure access permissions',
    icon: ShieldCheck,
    href: '/admin/roles',
  },
  {
    label: 'System Settings',
    description: 'Update system configuration',
    icon: Settings,
    href: '/admin/settings',
  },
]

const recentActivity = [
  {
    action: 'New organization added',
    details: 'Grace Community Church',
    time: '2 hours ago',
  },
  {
    action: 'Role permissions updated',
    details: 'Admin role modified',
    time: '4 hours ago',
  },
  {
    action: 'User account created',
    details: 'John Smith (Admin)',
    time: '5 hours ago',
  },
]

export default function AdminPage() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className={cn(
              "mt-1 text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}>
              Manage your system settings and organizations
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Organization
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat) => (
            <Card key={stat.label} className={cn(
              "shadow-md",
              isDarkMode ? "bg-[#111111] border-white/10" : "bg-white border-gray-200"
            )}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <stat.icon className={cn(
                    "h-8 w-8",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )} />
                  <span className={cn(
                    "text-sm font-medium",
                    stat.change.includes('+') ? "text-green-500" : "text-gray-500"
                  )}>
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className={cn(
                    "text-3xl font-bold",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    {stat.value}
                  </p>
                  <p className={cn(
                    "text-sm",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card className={cn(
            "shadow-md",
            isDarkMode ? "bg-[#111111] border-white/10" : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {quickActions.map((action) => (
                  <Link 
                    key={action.label} 
                    href={action.href}
                    className={cn(
                      "group flex items-center gap-4 rounded-lg border p-4 transition-colors",
                      isDarkMode 
                        ? "border-white/10 hover:border-white/20" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className={cn(
                      "rounded-full p-2",
                      isDarkMode ? "bg-white/5" : "bg-gray-100"
                    )}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        {action.label}
                      </h3>
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className={cn(
                      "h-5 w-5 transition-transform group-hover:translate-x-1",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )} />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className={cn(
            "shadow-md",
            isDarkMode ? "bg-[#111111] border-white/10" : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "flex items-start gap-4 rounded-lg p-3",
                      isDarkMode ? "bg-white/5" : "bg-gray-50"
                    )}
                  >
                    <Activity className={cn(
                      "mt-0.5 h-5 w-5",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )} />
                    <div className="flex-1">
                      <p className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        {item.action}
                      </p>
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>
                        {item.details}
                      </p>
                    </div>
                    <time className={cn(
                      "text-sm tabular-nums",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>
                      {item.time}
                    </time>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  )
} 