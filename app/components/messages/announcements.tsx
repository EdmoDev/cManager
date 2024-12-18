"use client"

import React from 'react'
import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { useTheme } from 'next-themes'
import {
  Megaphone,
  MoreVertical,
  Pin,
  Bell,
  Edit,
  Trash,
  Eye,
  Users,
  ThumbsUp,
  MessageSquare,
  Plus
} from "lucide-react"

interface Announcement {
  id: string
  title: string
  content: string
  sender: {
    id: string
    name: string
    role: string
    avatar?: string
  }
  timestamp: string
  priority: 'low' | 'medium' | 'high'
  isPinned?: boolean
  likes: number
  comments: number
  readBy: number
  totalRecipients: number
}

interface AnnouncementsProps {
  announcements: Announcement[]
  onNewAnnouncement?: () => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onPin?: (id: string) => void
  onLike?: (id: string) => void
  onComment?: (id: string) => void
}

const priorityColors = {
  low: 'bg-blue-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500'
}

export function Announcements({
  announcements,
  onNewAnnouncement,
  onEdit,
  onDelete,
  onPin,
  onLike,
  onComment
}: AnnouncementsProps) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Megaphone className="w-5 h-5" />
          <h2 className="text-xl font-bold">Announcements</h2>
        </div>
        <Button
          onClick={onNewAnnouncement}
          className={`rounded-lg ${isDarkMode ? 'bg-white/90 hover:bg-white text-black' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {announcements.map(announcement => (
            <Card
              key={announcement.id}
              className={`p-4 ${announcement.isPinned ? (isDarkMode ? 'border-gray-600' : 'border-gray-300') : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Avatar>
                    <AvatarImage src={announcement.sender.avatar} />
                    <AvatarFallback>{announcement.sender.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{announcement.title}</h3>
                      {announcement.isPinned && (
                        <Pin className="w-4 h-4 text-gray-500" />
                      )}
                      <Badge
                        variant="secondary"
                        className={`${priorityColors[announcement.priority]} text-white`}
                      >
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <span>{announcement.sender.name}</span>
                      <span>·</span>
                      <span>{announcement.sender.role}</span>
                      <span>·</span>
                      <span>{announcement.timestamp}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onPin?.(announcement.id)}>
                      <Pin className="w-4 h-4 mr-2" />
                      {announcement.isPinned ? 'Unpin' : 'Pin'} Announcement
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(announcement.id)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Announcement
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => onDelete?.(announcement.id)}>
                      <Trash className="w-4 h-4 mr-2" />
                      Delete Announcement
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className={`mt-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {announcement.content}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="space-x-2"
                    onClick={() => onLike?.(announcement.id)}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{announcement.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="space-x-2"
                    onClick={() => onComment?.(announcement.id)}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{announcement.comments}</span>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{announcement.readBy} of {announcement.totalRecipients}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{announcement.totalRecipients} recipients</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 