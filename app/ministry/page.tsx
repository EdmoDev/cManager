"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Progress } from "@/app/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { useTheme } from 'next-themes'
import MainLayout from '@/app/components/layout/main-layout'
import {
  HeartHandshakeIcon,
  UsersIcon,
  CalendarIcon,
  PlusIcon,
  TrendingUpIcon,
  ClockIcon,
  CheckCircleIcon
} from "lucide-react"

interface Ministry {
  id: number
  name: string
  leader: string
  members: number
  nextMeeting: string
  description: string
  progress: number
  avatar?: string
}

const ministries: Ministry[] = [
  {
    id: 1,
    name: "Youth Ministry",
    leader: "John Smith",
    members: 45,
    nextMeeting: "Sunday, 4:00 PM",
    description: "Engaging young people in faith and fellowship",
    progress: 75
  },
  {
    id: 2,
    name: "Worship Team",
    leader: "Sarah Johnson",
    members: 20,
    nextMeeting: "Saturday, 3:00 PM",
    description: "Leading the congregation in worship",
    progress: 85
  },
  {
    id: 3,
    name: "Prayer Warriors",
    leader: "Michael Brown",
    members: 30,
    nextMeeting: "Wednesday, 7:00 PM",
    description: "Interceding for the church and community",
    progress: 65
  }
]

export default function MinistryPage() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <MainLayout>
      <ScrollArea className="flex-1">
        <div className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Ministries</h1>
            <Button className={`rounded-full text-white ${isDarkMode ? 'bg-white/90 hover:bg-white text-black' : 'bg-blue-500 hover:bg-blue-600'}`}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Ministry
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <UsersIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-sm text-green-600 flex items-center">
                    ↑ 12%
                  </div>
                </div>
                <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>95</div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Members</p>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-full ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                    <HeartHandshakeIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-sm text-green-600 flex items-center">
                    ↑ 8%
                  </div>
                </div>
                <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>6</div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Ministries</p>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-full ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                    <TrendingUpIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-sm text-green-600 flex items-center">
                    ↑ 15%
                  </div>
                </div>
                <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>75%</div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Average Engagement</p>
              </CardContent>
            </Card>
          </div>

          {/* Ministry Cards */}
          <div className="grid grid-cols-1 gap-6">
            {ministries.map(ministry => (
              <Card key={ministry.id} className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={ministry.avatar} />
                          <AvatarFallback>{ministry.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{ministry.name}</h3>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Led by {ministry.leader}</p>
                        </div>
                      </div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                        {ministry.description}
                      </p>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <UsersIcon className="w-4 h-4 text-blue-500" />
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {ministry.members} members
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-4 h-4 text-purple-500" />
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Next: {ministry.nextMeeting}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 min-w-[120px]">
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {ministry.progress}%
                          </span>
                        </div>
                        <Progress value={ministry.progress} className="h-20 w-20 rounded-full" />
                      </div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Engagement
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  )
} 