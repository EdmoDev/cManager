"use client"

import React from 'react'
import { Button } from "@/app/components/ui/button"
import { useTheme } from 'next-themes'
import {
  FilterIcon,
  CheckIcon
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"

const eventTypes = [
  { id: 'service', label: 'Services' },
  { id: 'youth', label: 'Youth Events' },
  { id: 'prayer', label: 'Prayer Meetings' },
  { id: 'music', label: 'Music Practice' },
  { id: 'study', label: 'Bible Study' }
]

export function CalendarFilters() {
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>(['service', 'youth', 'prayer', 'music', 'study'])
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const toggleType = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={`rounded-full ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}`}>
          <FilterIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Event Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {eventTypes.map(type => (
            <DropdownMenuItem
              key={type.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleType(type.id)}
            >
              {type.label}
              {selectedTypes.includes(type.id) && (
                <CheckIcon className="w-4 h-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 