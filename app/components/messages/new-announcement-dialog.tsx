"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Badge } from "@/app/components/ui/badge"
import { useTheme } from 'next-themes'
import {
  Users,
  Search,
  AlertTriangle,
  Bell,
  Clock,
  Calendar,
  Check,
  X
} from "lucide-react"

interface Group {
  id: string
  name: string
  memberCount: number
}

interface NewAnnouncementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: {
    title: string
    content: string
    priority: 'low' | 'medium' | 'high'
    recipients: string[]
    scheduledFor?: Date
  }) => void
}

const groups: Group[] = [
  { id: '1', name: 'All Members', memberCount: 250 },
  { id: '2', name: 'Youth Ministry', memberCount: 45 },
  { id: '3', name: 'Worship Team', memberCount: 20 },
  { id: '4', name: 'Small Group Leaders', memberCount: 15 },
  { id: '5', name: 'Volunteers', memberCount: 50 }
]

export function NewAnnouncementDialog({
  open,
  onOpenChange,
  onSubmit
}: NewAnnouncementDialogProps) {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [priority, setPriority] = React.useState<'low' | 'medium' | 'high'>('low')
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isScheduled, setIsScheduled] = React.useState(false)
  const [scheduledDate, setScheduledDate] = React.useState<string>('')
  const [scheduledTime, setScheduledTime] = React.useState<string>('')
  
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleGroup = (groupId: string) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  const getTotalRecipients = () => {
    return selectedGroups.reduce((total, groupId) => {
      const group = groups.find(g => g.id === groupId)
      return total + (group?.memberCount || 0)
    }, 0)
  }

  const handleSubmit = () => {
    const scheduledFor = isScheduled && scheduledDate && scheduledTime
      ? new Date(`${scheduledDate}T${scheduledTime}`)
      : undefined

    onSubmit({
      title,
      content,
      priority,
      recipients: selectedGroups,
      scheduledFor
    })

    // Reset form
    setTitle('')
    setContent('')
    setPriority('low')
    setSelectedGroups([])
    setIsScheduled(false)
    setScheduledDate('')
    setScheduledTime('')
    onOpenChange(false)
  }

  const isValid = title.trim() && content.trim() && selectedGroups.length > 0 &&
    (!isScheduled || (scheduledDate && scheduledTime))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Announcement</DialogTitle>
          <DialogDescription>
            Create and send an announcement to selected groups
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Input
              placeholder="Announcement Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg"
            />
          </div>

          <div>
            <Textarea
              placeholder="Write your announcement..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] rounded-lg"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Select
                value={priority}
                onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className={`rounded-lg ${isScheduled ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
                onClick={() => setIsScheduled(!isScheduled)}
              >
                <Clock className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>

          {isScheduled && (
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="rounded-lg"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Recipients</label>
              {selectedGroups.length > 0 && (
                <span className="text-sm text-gray-500">
                  {getTotalRecipients()} total recipients
                </span>
              )}
            </div>

            {selectedGroups.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedGroups.map(groupId => {
                  const group = groups.find(g => g.id === groupId)
                  return group ? (
                    <Badge
                      key={group.id}
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      <span>{group.name}</span>
                      <button
                        onClick={() => toggleGroup(group.id)}
                        className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5"
                        title={`Remove ${group.name}`}
                        aria-label={`Remove ${group.name} from recipients`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ) : null
                })}
              </div>
            )}

            <div className="relative mb-2">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} w-4 h-4`} />
              <Input
                placeholder="Search groups..."
                className="pl-9 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <ScrollArea className="h-[200px] rounded-lg border">
              <div className="p-4 space-y-2">
                {filteredGroups.map(group => (
                  <div
                    key={group.id}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedGroups.includes(group.id)
                        ? isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                        : isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleGroup(group.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5" />
                      <div>
                        <h4 className="font-medium">{group.name}</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {group.memberCount} members
                        </p>
                      </div>
                    </div>
                    {selectedGroups.includes(group.id) && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isScheduled ? 'Schedule Announcement' : 'Send Announcement'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 