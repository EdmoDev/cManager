"use client"

import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { useTheme } from 'next-themes'
import {
  UserPlus,
  Calendar,
  DollarSign,
  Clock
} from "lucide-react"

const activities = [
  {
    id: 1,
    type: "member",
    action: "New member registered",
    name: "Sarah Johnson",
    time: "2 hours ago",
    icon: UserPlus
  },
  {
    id: 2,
    type: "event",
    action: "Event created",
    name: "Youth Group Meeting",
    time: "4 hours ago",
    icon: Calendar
  },
  {
    id: 3,
    type: "donation",
    action: "Donation received",
    name: "Building Fund",
    time: "5 hours ago",
    icon: DollarSign
  }
]

export function RecentActivity() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <Card className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className={`flex items-center space-x-4 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'} p-3 transition-colors duration-300`}
              >
                <div className={`p-2 rounded-full ${
                  activity.type === 'member' ? isDarkMode ? 'bg-white/20 text-white' : 'bg-black/10 text-black' :
                  activity.type === 'event' ? isDarkMode ? 'bg-white/20 text-white' : 'bg-black/10 text-black' :
                  isDarkMode ? 'bg-white/20 text-white' : 'bg-black/10 text-black'
                }`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    {activity.action}
                  </p>
                  <p className={`text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {activity.name}
                  </p>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className={`w-3 h-3 mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 