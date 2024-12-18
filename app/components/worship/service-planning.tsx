"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { useTheme } from 'next-themes'
import {
  MusicIcon,
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon
} from "lucide-react"

interface ServiceEvent {
  id: number
  title: string
  date: string
  time: string
  team: string
  songs: string[]
}

const upcomingServices: ServiceEvent[] = [
  {
    id: 1,
    title: "Sunday Morning Service",
    date: "2024-03-10",
    time: "9:00 AM",
    team: "Team A",
    songs: ["Amazing Grace", "How Great is Our God", "10,000 Reasons"]
  },
  {
    id: 2,
    title: "Youth Service",
    date: "2024-03-10",
    time: "11:00 AM",
    team: "Youth Team",
    songs: ["Build My Life", "What a Beautiful Name", "King of Kings"]
  }
]

export function ServicePlanning() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Upcoming Services</h2>
        <Button className={`rounded-full ${isDarkMode ? 'bg-white/90 hover:bg-white text-black' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Plan Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upcomingServices.map(service => (
          <Card key={service.id} className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{service.title}</CardTitle>
                  <div className={`flex items-center mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {service.date}
                    <ClockIcon className="w-4 h-4 ml-4 mr-2" />
                    {service.time}
                  </div>
                </div>
                <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <UsersIcon className="w-4 h-4 mr-2" />
                  {service.team}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Song List</h3>
                  <div className="space-y-2">
                    {service.songs.map((song, index) => (
                      <div key={index} className={`flex items-center p-2 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                        <MusicIcon className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{song}</span>
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