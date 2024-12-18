"use client"

import React from 'react'
import { cn } from "@/lib/utils"
import { useTheme } from 'next-themes'
import { ProfileAvatar } from "@/app/components/ui/profile-avatar"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Building2,
  Users,
  Settings,
  ShieldCheck,
  Activity,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronRight
} from "lucide-react"

const sidebarItems = [
  { 
    icon: Building2, 
    label: 'Organizations', 
    path: '/admin/organizations',
    description: 'Manage church organizations'
  },
  { 
    icon: Users, 
    label: 'Users', 
    path: '/admin/users',
    description: 'Manage system users'
  },
  { 
    icon: ShieldCheck, 
    label: 'Roles', 
    path: '/admin/roles',
    description: 'Configure access permissions'
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    path: '/admin/settings',
    description: 'System configuration'
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const isDarkMode = theme === 'dark'

  return (
    <div className={cn(
      "flex min-h-screen",
      isDarkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"
    )}>
      {/* Sidebar */}
      <nav className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r",
        isDarkMode ? "bg-[#111111] border-white/10" : "bg-white border-gray-200"
      )}>
        {/* Logo */}
        <div className={cn(
          "flex h-16 items-center gap-2 px-4 border-b",
          isDarkMode ? "border-white/10" : "border-gray-200"
        )}>
          <Activity className="h-6 w-6 text-blue-500" />
          <span className="font-semibold">Admin Dashboard</span>
        </div>

        {/* Navigation Items */}
        <ScrollArea className="flex-1 py-4">
          <div className="space-y-1 px-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? isDarkMode 
                        ? "bg-white/10 text-white" 
                        : "bg-gray-100 text-gray-900"
                      : isDarkMode
                        ? "text-gray-400 hover:bg-white/5 hover:text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className={cn(
                      "text-xs",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>
                      {item.description}
                    </div>
                  </div>
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    isActive && "rotate-90"
                  )} />
                </Link>
              )
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className={cn(
          "p-4 border-t",
          isDarkMode ? "border-white/10" : "border-gray-200"
        )}>
          <ProfileAvatar />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 pl-64">
        {/* Header */}
        <header className={cn(
          "sticky top-0 z-40 flex h-16 items-center justify-between border-b px-6",
          isDarkMode 
            ? "bg-black/80 border-white/10 backdrop-blur supports-[backdrop-filter]:bg-black/40" 
            : "bg-white/80 border-gray-200 backdrop-blur supports-[backdrop-filter]:bg-white/40"
        )}>
          <div className="relative">
            <Search className={cn(
              "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )} />
            <Input
              type="search"
              placeholder="Search..."
              className={cn(
                "h-9 w-64 rounded-full border-none pl-9 pr-4",
                isDarkMode 
                  ? "bg-[#111111] text-white placeholder-gray-500 focus-visible:ring-white/20" 
                  : "bg-gray-100 text-gray-900 placeholder-gray-500 focus-visible:ring-gray-200"
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative rounded-full"
              onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative rounded-full"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 