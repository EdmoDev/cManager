"use client"

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { useTheme } from 'next-themes'
import {
  MoreHorizontal,
  Smile,
  Reply,
  Copy,
  Edit,
  Trash,
  FileText,
  Image as ImageIcon,
  Download,
  ExternalLink
} from "lucide-react"

interface Attachment {
  id: string
  type: 'image' | 'file'
  name: string
  url: string
  size?: string
  thumbnail?: string
}

interface Reaction {
  emoji: string
  count: number
  users: string[]
}

interface MessageProps {
  id: string
  content: string
  sender: {
    id: string
    name: string
    avatar?: string
  }
  timestamp: string
  isOwn: boolean
  reactions?: Reaction[]
  attachments?: Attachment[]
  replyTo?: {
    id: string
    content: string
    sender: string
  }
  onReply?: (messageId: string) => void
  onReact?: (messageId: string, emoji: string) => void
  onEdit?: (messageId: string) => void
  onDelete?: (messageId: string) => void
}

export function MessageBubble({
  id,
  content,
  sender,
  timestamp,
  isOwn,
  reactions = [],
  attachments = [],
  replyTo,
  onReply,
  onReact,
  onEdit,
  onDelete
}: MessageProps) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const handleReaction = (emoji: string) => {
    onReact?.(id, emoji)
  }

  return (
    <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2 group mb-4`}>
      {!isOwn && (
        <Avatar className="w-8 h-8">
          <AvatarImage src={sender.avatar} />
          <AvatarFallback>{sender.name[0]}</AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
        {!isOwn && (
          <span className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {sender.name}
          </span>
        )}

        {replyTo && (
          <div 
            className={`flex items-center space-x-2 text-sm mb-1 px-3 py-1 rounded-lg ${
              isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Reply className="w-4 h-4" />
            <div className="flex-1 truncate">
              <span className="font-medium">{replyTo.sender}</span>
              <span className="mx-2">·</span>
              <span className="text-gray-500">{replyTo.content}</span>
            </div>
          </div>
        )}

        <div className={`relative group`}>
          <div
            className={`px-4 py-2 rounded-2xl ${
              isOwn
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : isDarkMode
                ? 'bg-gray-800 text-gray-100'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <p className="whitespace-pre-wrap break-words">{content}</p>

            {attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {attachments.map(attachment => (
                  <div
                    key={attachment.id}
                    className={`flex items-center space-x-2 p-2 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  >
                    {attachment.type === 'image' ? (
                      <div className="relative w-40 h-40">
                        <img
                          src={attachment.url}
                          alt={attachment.name}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 rounded-full bg-black/50 hover:bg-black/70"
                          onClick={() => window.open(attachment.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 text-white" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-5 h-5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">{attachment.name}</p>
                          {attachment.size && (
                            <p className="text-xs text-gray-500">{attachment.size}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={() => window.open(attachment.url, '_blank')}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={`absolute ${isOwn ? 'left-0' : 'right-0'} top-0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full flex items-center space-x-1`}>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              onClick={() => onReply?.(id)}
            >
              <Reply className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isOwn ? 'start' : 'end'}>
                <div className="grid grid-cols-6 gap-2 p-2">
                  {['👍', '❤️', '😂', '😮', '😢', '🙏'].map(emoji => (
                    <button
                      key={emoji}
                      className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800"
                      onClick={() => handleReaction(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isOwn ? 'start' : 'end'}>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(content)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Text
                </DropdownMenuItem>
                {isOwn && (
                  <>
                    <DropdownMenuItem onClick={() => onEdit?.(id)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Message
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete?.(id)}
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Delete Message
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {reactions.map((reaction, index) => (
              <button
                key={index}
                className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-sm ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => handleReaction(reaction.emoji)}
              >
                <span>{reaction.emoji}</span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {reaction.count}
                </span>
              </button>
            ))}
          </div>
        )}

        <span className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {timestamp}
        </span>
      </div>
    </div>
  )
} 