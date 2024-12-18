"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { useTheme } from 'next-themes'

const data = [
  { name: "Jan", attendance: 400, giving: 2400 },
  { name: "Feb", attendance: 450, giving: 2800 },
  { name: "Mar", attendance: 420, giving: 2600 },
  { name: "Apr", attendance: 480, giving: 3000 },
  { name: "May", attendance: 460, giving: 2900 },
  { name: "Jun", attendance: 500, giving: 3200 },
]

export function Overview() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <Card className={`${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="name" 
                stroke={isDarkMode ? "#888888" : "#666666"} 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke={isDarkMode ? "#888888" : "#666666"} 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value}`} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '0.5rem',
                  color: isDarkMode ? '#f3f4f6' : '#1f2937'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="giving" 
                stroke="#82ca9d" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center space-x-8">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#8884d8] mr-2" />
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Attendance</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#82ca9d] mr-2" />
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Giving</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 