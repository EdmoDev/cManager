"use client"

import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { useTheme } from 'next-themes'
import { 
  UserPlus, 
  Calendar, 
  DollarSign, 
  PlusCircle,
  Users,
  Music,
  BookOpen,
  MessageCircle
} from "lucide-react"
import Link from 'next/link'

const actions = [
  {
    icon: UserPlus,
    label: "Add Member",
    href: "/people/new",
    color: "text-blue-500"
  },
  {
    icon: Calendar,
    label: "Schedule Event",
    href: "/calendar/new",
    color: "text-purple-500"
  },
  {
    icon: Music,
    label: "Plan Service",
    href: "/worship/new",
    color: "text-green-500"
  },
  {
    icon: MessageCircle,
    label: "Send Message",
    href: "/messages/new",
    color: "text-yellow-500"
  }
]

export function QuickActions() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <Card className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link key={action.label} href={action.href}>
              <Button
                variant="outline"
                className={`w-full h-24 flex flex-col items-center justify-center space-y-2 ${
                  isDarkMode 
                    ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <action.icon className={`h-6 w-6 ${action.color}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {action.label}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 