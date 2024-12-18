"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { useTheme } from 'next-themes'
import {
  CalendarIcon,
  PlusIcon,
  UsersIcon,
  MusicIcon,
  ClockIcon
} from "lucide-react"

interface TeamMember {
  id: number
  name: string
  role: string
  avatar?: string
}

interface TeamSchedule {
  id: number
  date: string
  time: string
  service: string
  team: string
  members: TeamMember[]
}

const schedules: TeamSchedule[] = [
  {
    id: 1,
    date: "2024-03-10",
    time: "8:00 AM",
    service: "Sunday Morning Service",
    team: "Team A",
    members: [
      { id: 1, name: "John Doe", role: "Worship Leader" },
      { id: 2, name: "Sarah Smith", role: "Vocals" },
      { id: 3, name: "Mike Johnson", role: "Guitar" },
      { id: 4, name: "Emily Brown", role: "Keys" }
    ]
  },
  {
    id: 2,
    date: "2024-03-10",
    time: "11:00 AM",
    service: "Youth Service",
    team: "Youth Team",
    members: [
      { id: 5, name: "Alex Wilson", role: "Worship Leader" },
      { id: 6, name: "Rachel Lee", role: "Vocals" },
      { id: 7, name: "David Kim", role: "Drums" }
    ]
  }
]

export function TeamSchedule() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Schedule</h2>
        <Button className={`rounded-full ${isDarkMode ? 'bg-white/90 hover:bg-white text-black' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Schedule Team
        </Button>
      </div>

      <div className="space-y-6">
        {schedules.map(schedule => (
          <Card key={schedule.id} className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{schedule.service}</CardTitle>
                  <div className={`flex items-center mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {schedule.date}
                    <ClockIcon className="w-4 h-4 ml-4 mr-2" />
                    {schedule.time}
                  </div>
                </div>
                <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <UsersIcon className="w-4 h-4 mr-2" />
                  {schedule.team}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Team Members</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {schedule.members.map(member => (
                      <div key={member.id} className={`flex items-center p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                        <Avatar className="w-8 h-8 mr-3">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{member.name}</p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 