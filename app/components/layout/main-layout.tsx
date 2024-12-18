"use client"

import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { useTheme } from 'next-themes'
import { ProfileAvatar } from "@/app/components/ui/profile-avatar"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Badge } from "@/app/components/ui/badge"
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  CheckCircle2,
  Zap,
  LayoutGrid,
  Users,
  CalendarDays,
  Clock,
  Search,
  Bell,
  Settings,
  Plus,
  Filter,
  ChevronDown,
  MoreVertical,
  ChevronRight,
  Command,
  Menu,
  Home,
  BarChart3,
  Box,
  UserPlus,
  Heart,
  Inbox,
  HelpCircle,
  Music,
  Gift,
  BookOpen
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuContent,
  SidebarMenuItem,
  SidebarMenuTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator
} from "@/app/components/ui/sidebar"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/app/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"

const mainNavItems = [
  {
    icon: Home,
    label: 'Overview',
    path: '/',
    description: 'Church activity dashboard',
    badge: 'New'
  },
  {
    icon: CalendarDays,
    label: 'Calendar',
    path: '/calendar',
    description: 'Event scheduling',
    badge: 'Today'
  },
  {
    icon: UserPlus,
    label: 'Check-ins',
    path: '/checkins',
    description: 'Attendance tracking'
  },
  {
    icon: Users,
    label: 'People',
    path: '/people',
    description: 'Member directory',
    badge: '+5'
  }
]

const sidebarItems = [
  {
    label: 'COMMUNITY',
    items: [
      {
        icon: Users,
        label: 'People',
        path: '/people',
        description: 'Member directory',
        subItems: [
          { label: 'Directory', path: '/people/directory' },
          { label: 'Groups', path: '/people/groups' },
          { label: 'Attendance', path: '/people/attendance' }
        ]
      },
      {
        icon: Heart,
        label: 'Groups',
        path: '/groups',
        description: 'Small groups & ministries',
        badge: '2 active',
        subItems: [
          { label: 'Small Groups', path: '/groups/small-groups' },
          { label: 'Ministry Teams', path: '/groups/ministries' },
          { label: 'Leadership', path: '/groups/leadership' }
        ]
      }
    ]
  },
  {
    label: 'WORSHIP',
    items: [
      {
        icon: Music,
        label: 'Music Stand',
        path: '/music',
        description: 'Worship resources',
        subItems: [
          { label: 'Songs', path: '/music/songs' },
          { label: 'Set Lists', path: '/music/setlists' },
          { label: 'Teams', path: '/music/teams' }
        ]
      },
      {
        icon: CalendarDays,
        label: 'Services',
        path: '/services',
        description: 'Service planning',
        subItems: [
          { label: 'Plans', path: '/services/plans' },
          { label: 'Teams', path: '/services/teams' },
          { label: 'Songs', path: '/services/songs' }
        ]
      }
    ]
  },
  {
    label: 'RESOURCES',
    items: [
      {
        icon: Gift,
        label: 'Giving',
        path: '/giving',
        description: 'Online donations',
        subItems: [
          { label: 'Overview', path: '/giving/overview' },
          { label: 'Donations', path: '/giving/donations' },
          { label: 'Reports', path: '/giving/reports' }
        ]
      },
      {
        icon: BookOpen,
        label: 'Publishing',
        path: '/publishing',
        description: 'Content management',
        subItems: [
          { label: 'Articles', path: '/publishing/articles' },
          { label: 'Media', path: '/publishing/media' },
          { label: 'Events', path: '/publishing/events' }
        ]
      },
      {
        icon: BarChart3,
        label: 'Reports',
        path: '/reports',
        description: 'Analytics and insights',
        subItems: [
          { label: 'Attendance', path: '/reports/attendance' },
          { label: 'Growth', path: '/reports/growth' },
          { label: 'Engagement', path: '/reports/engagement' }
        ]
      }
    ]
  },
  {
    label: 'ADMIN',
    adminOnly: true,
    items: [
      {
        icon: Settings,
        label: 'Settings',
        path: '/settings',
        description: 'Church settings',
        adminOnly: true,
        subItems: [
          { label: 'General', path: '/settings/general' },
          { label: 'Users', path: '/settings/users' },
          { label: 'Roles', path: '/settings/roles' }
        ]
      },
      {
        icon: HelpCircle,
        label: 'Support',
        path: '/support',
        description: 'Get help',
        adminOnly: true
      }
    ]
  }
]

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [openSections, setOpenSections] = useState<string[]>([])
  const { theme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const isDarkMode = theme === 'dark'
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  // Mock user data - replace with actual auth
  const user = {
    name: 'Brooklyn Simmons',
    email: 'simmons@gamil.com',
    role: 'admin'
  }

  const toggleSection = (path: string) => {
    setOpenSections(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    )
  }

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Check if the user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      // Command/Control + K for search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // Add debounced search logic here
  }

  return (
    <SidebarProvider defaultOpen>
      <div className={cn(
        "flex min-h-screen",
        isDarkMode 
          ? "bg-black text-white" 
          : "bg-[#fafbfc] text-gray-900"
      )}>
        <Sidebar className="border-r border-border">
          <SidebarHeader className="border-b border-border p-4">
            <div className="flex items-center gap-2">
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center",
                isDarkMode
                  ? "bg-white/5"
                  : "bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-indigo-500/10"
              )}>
                <LayoutGrid className={cn(
                  "h-5 w-5",
                  isDarkMode
                    ? "text-white"
                    : "text-violet-600"
                )} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Church Manager</span>
                <span className="text-xs text-muted-foreground">Welcome, {user.name}</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {/* Quick Actions */}
            <SidebarGroup>
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all group relative",
                    pathname === item.path
                      ? isDarkMode 
                        ? "bg-white/10 text-white" 
                        : "bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-indigo-500/10 text-violet-900"
                      : isDarkMode
                        ? "text-gray-400 hover:bg-white/5 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100/50 hover:text-gray-900",
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors",
                    pathname === item.path
                      ? isDarkMode
                        ? "text-white"
                        : "text-violet-600"
                      : "text-gray-400 group-hover:text-violet-600"
                  )} />
                  <div className="flex flex-col flex-1">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </div>
                  {item.badge && (
                    <Badge variant={item.badge === 'New' ? "default" : "secondary"} className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                  {pathname === item.path && (
                    <div className="absolute inset-y-0 left-0 w-1 bg-violet-500 rounded-full" />
                  )}
                </Link>
              ))}
            </SidebarGroup>

            <SidebarSeparator />

            {/* Main Navigation */}
            <ScrollArea className="flex-1">
              {sidebarItems.map((section) => (
                user.role === 'admin' || !section.items.every(item => item.adminOnly) ? (
                  <SidebarGroup key={section.label}>
                    <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                    {section.items.map((item) => (
                      (!item.adminOnly || user.role === 'admin') && (
                        <div key={item.path}>
                          <Link
                            href={item.path}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all group relative",
                              pathname === item.path
                                ? isDarkMode 
                                  ? "bg-white/10 text-white" 
                                  : "bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-indigo-500/10 text-violet-900"
                                : isDarkMode
                                  ? "text-gray-400 hover:bg-white/5 hover:text-white"
                                  : "text-gray-600 hover:bg-gray-100/50 hover:text-gray-900",
                            )}
                            onClick={(e) => {
                              if (item.subItems) {
                                e.preventDefault()
                                toggleSection(item.path)
                              }
                            }}
                          >
                            <item.icon className={cn(
                              "h-5 w-5 transition-colors",
                              pathname === item.path
                                ? isDarkMode
                                  ? "text-white"
                                  : "text-violet-600"
                                : "text-gray-400 group-hover:text-violet-600"
                            )} />
                            <div className="flex flex-col flex-1">
                              <span className="font-medium">{item.label}</span>
                              <span className="text-xs text-muted-foreground">{item.description}</span>
                            </div>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto">
                                {item.badge}
                              </Badge>
                            )}
                            {item.subItems && (
                              <ChevronDown className={cn(
                                "h-4 w-4 transition-transform",
                                openSections.includes(item.path) && "rotate-180"
                              )} />
                            )}
                            {pathname === item.path && (
                              <div className="absolute inset-y-0 left-0 w-1 bg-violet-500 rounded-full" />
                            )}
                          </Link>
                          {item.subItems && openSections.includes(item.path) && (
                            <div className="ml-4 pl-4 border-l border-border">
                              {item.subItems.map((subItem) => (
                                <Link
                                  key={subItem.path}
                                  href={subItem.path}
                                  className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all group relative",
                                    pathname === subItem.path
                                      ? isDarkMode 
                                        ? "bg-white/10 text-white" 
                                        : "bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-indigo-500/10 text-violet-900"
                                      : isDarkMode
                                        ? "text-gray-400 hover:bg-white/5 hover:text-white"
                                        : "text-gray-600 hover:bg-gray-100/50 hover:text-gray-900",
                                  )}
                                >
                                  <span className="font-medium">{subItem.label}</span>
                                  {pathname === subItem.path && (
                                    <div className="absolute inset-y-0 left-0 w-1 bg-violet-500 rounded-full" />
                                  )}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    ))}
                  </SidebarGroup>
                ) : null
              ))}
            </ScrollArea>
          </SidebarContent>

          <SidebarFooter className="border-t border-border p-4">
            <ProfileAvatar 
              user={{
                name: user.name,
                email: user.email,
                image: undefined
              }}
              showStatus={true}
            />
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className={cn(
            "sticky top-0 z-40 h-16 flex items-center justify-between px-6 border-b",
            isDarkMode 
              ? "bg-black/80 border-white/10 backdrop-blur" 
              : "bg-white/80 border-gray-100/50 shadow-sm backdrop-blur-xl"
          )}>
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="relative">
                <Search className={cn(
                  "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
                  isDarkMode ? "text-gray-400" : "text-gray-400 group-hover:text-violet-600"
                )} />
                <Input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search anything... (⌘K)"
                  data-search-input
                  className={cn(
                    "h-9 w-[300px] rounded-lg pl-9 pr-4 transition-all",
                    isDarkMode 
                      ? "bg-white/5 text-white placeholder-gray-500 border-white/10" 
                      : "bg-gray-50/50 text-gray-900 placeholder-gray-500 border-gray-100 focus:border-violet-500 focus:ring-violet-500/20"
                  )}
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={cn(
                        "rounded-lg gap-2",
                        isDarkMode
                          ? "border-white/10 hover:bg-white/5"
                          : "border-gray-200 hover:bg-gray-100/50"
                      )}
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Filter results
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="default"
                      size="sm" 
                      className={cn(
                        "rounded-lg gap-2",
                        isDarkMode
                          ? "bg-violet-600 hover:bg-violet-700"
                          : "bg-violet-600 hover:bg-violet-700"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                      Create task
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Create new task
                    <kbd className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs">⌘N</kbd>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}