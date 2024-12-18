"use client"

import React from 'react'
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { Calendar } from "@/app/components/ui/calendar"
import { useTheme } from 'next-themes'
import {
  Filter,
  X,
  Calendar as CalendarIcon,
  ChevronDown,
  Check
} from 'lucide-react'
import { format } from 'date-fns'

interface FilterOption {
  id: string
  label: string
  type: 'select' | 'date' | 'dateRange' | 'text'
  options?: Array<{
    value: string
    label: string
  }>
  value?: any
}

interface FilterBarProps {
  filters: FilterOption[]
  onFilterChange: (filters: FilterOption[]) => void
  searchPlaceholder?: string
}

export function FilterBar({
  filters,
  onFilterChange,
  searchPlaceholder = "Search..."
}: FilterBarProps) {
  const [activeFilters, setActiveFilters] = React.useState<FilterOption[]>(filters)
  const [searchQuery, setSearchQuery] = React.useState('')
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const handleFilterChange = (id: string, value: any) => {
    const updatedFilters = activeFilters.map(filter =>
      filter.id === id ? { ...filter, value } : filter
    )
    setActiveFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleClearFilter = (id: string) => {
    const updatedFilters = activeFilters.map(filter =>
      filter.id === id ? { ...filter, value: undefined } : filter
    )
    setActiveFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleClearAll = () => {
    const clearedFilters = activeFilters.map(filter => ({
      ...filter,
      value: undefined
    }))
    setActiveFilters(clearedFilters)
    onFilterChange(clearedFilters)
    setSearchQuery('')
  }

  const activeFilterCount = activeFilters.filter(f => f.value !== undefined).length

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`rounded-lg ${
                activeFilterCount > 0
                  ? isDarkMode
                    ? 'bg-blue-900/20 border-blue-800'
                    : 'bg-blue-50 border-blue-200'
                  : ''
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              {activeFilters.map(filter => (
                <div key={filter.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">{filter.label}</label>
                    {filter.value !== undefined && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                        onClick={() => handleClearFilter(filter.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>

                  {filter.type === 'select' && (
                    <Select
                      value={filter.value}
                      onValueChange={(value) => handleFilterChange(filter.id, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {filter.options?.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {filter.type === 'date' && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !filter.value && 'text-muted-foreground'
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filter.value ? format(filter.value, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filter.value}
                          onSelect={(date) => handleFilterChange(filter.id, date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}

                  {filter.type === 'text' && (
                    <Input
                      value={filter.value || ''}
                      onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                      className="w-full"
                    />
                  )}
                </div>
              ))}

              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  className="w-full mt-2"
                  onClick={handleClearAll}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters
            .filter(f => f.value !== undefined)
            .map(filter => (
              <div
                key={filter.id}
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${
                  isDarkMode
                    ? 'bg-gray-800 text-gray-200'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <span>{filter.label}:</span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {filter.type === 'date'
                    ? format(filter.value, 'PP')
                    : filter.type === 'select'
                    ? filter.options?.find(o => o.value === filter.value)?.label
                    : filter.value}
                </span>
                <button
                  onClick={() => handleClearFilter(filter.id)}
                  className="ml-1 p-0.5 rounded-full hover:bg-gray-700"
                  title={`Remove ${filter.label} filter`}
                  aria-label={`Remove ${filter.label} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  )
} 